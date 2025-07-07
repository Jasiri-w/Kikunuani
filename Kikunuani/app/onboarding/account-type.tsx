import { View, Text, TouchableOpacity, Alert } from "react-native";
import { useRouter } from "expo-router";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/contexts/AuthContext";
import { useEffect } from "react";

export default function AccountTypeScreen() {
  const router = useRouter();
  const { session, refreshUser } = useAuth();

  const userId = session?.user.id;
  const email = session?.user.email ?? "";

  useEffect(() => {
    const checkIfAlreadyOnboarded = async () => {
      if (!userId) return;

      const [{ data: profile }, { data: organization }] = await Promise.all([
        supabase.from("profiles").select("id").eq("id", userId).maybeSingle(),
        supabase.from("organizations").select("id").eq("id", userId).maybeSingle(),
      ]);

      if (profile || organization) {
        console.log("User already onboarded. Refreshing and redirecting...");
        await refreshUser();

        setTimeout(() => {
          router.replace("/");
        }, 1500); // ⏳ Small delay so refreshUser has time to complete
      }
    };

    checkIfAlreadyOnboarded();
  }, [userId]);

  const selectAccountType = async (type: "user" | "organization") => {
    console.log("Selecting account type:", type);
    const userId = session?.user.id;
    if (!userId){
      console.log("Error", "No user session found");
      router.replace("/auth/login");
    }
    if (type === "user") {
      // Handle profile creation/update for individual users
      const { data: profileExists, error: checkError } = await supabase
        .from("profiles")
        .select("id")
        .eq("id", userId)
        .maybeSingle();

      if (checkError) {
        return console.log("Error checking profile:", checkError.message);
      }

      if (!profileExists) {
        const { error: insertError } = await supabase.from("profiles").insert({
          id: userId,
          email: session?.user.email ?? "",
        });

        if (insertError) {
          return console.log("Error inserting profile:", insertError.message);
        }
      } else {
        const { error: updateError } = await supabase
          .from("profiles")
          .update({ account_type: "user" })
          .eq("id", userId);

        if (updateError) {
          return console.log("Error updating profile:", updateError.message);
        }
      }

      router.push("/onboarding/user-profile");
    }

    if (type === "organization") {
      // Handle organization record creation
      const { data: orgExists, error: orgCheckError } = await supabase
        .from("organizations")
        .select("id")
        .eq("id", userId)
        .maybeSingle();

      if (orgCheckError) {
        return console.log("Error checking organization:", orgCheckError.message);
      }

      if (!orgExists) {
        const { error: orgInsertError } = await supabase
          .from("organizations")
          .insert({ 
            id: userId,
            email: session?.user.email ?? "",
          });

        if (orgInsertError) {
          return console.log("Error creating organization:", orgInsertError.message);
        }
      }

      router.push("/onboarding/org-profile");
    }
  };


  return (
    <View className="flex-1 justify-center items-center bg-white px-6">
      <Text className="text-xl font-bold mb-6">Who are you joining as?</Text>

      <TouchableOpacity
        className="bg-kiku-light-green px-6 py-3 rounded-full mb-4 w-full"
        onPress={() => selectAccountType("user")}
      >
        <Text className="text-white text-center font-semibold">Individual</Text>
      </TouchableOpacity>

      <TouchableOpacity
        className="bg-kiku-muted-green px-6 py-3 rounded-full mb-4 w-full"
        onPress={() => selectAccountType("organization")}
      >
        <Text className="text-white text-center font-semibold">Organization</Text>
      </TouchableOpacity>

    </View>
  );
}
