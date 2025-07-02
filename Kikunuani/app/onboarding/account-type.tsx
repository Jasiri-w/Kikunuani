import { View, Text, TouchableOpacity, Alert } from "react-native";
import { useRouter } from "expo-router";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/contexts/AuthContext";

export default function AccountTypeScreen() {
  const router = useRouter();
  const { session } = useAuth();

  const selectAccountType = async (type: "user" | "organization") => {
    console.log("Selecting account type:", type);
    const userId = session?.user.id;
    if (!userId) return console.log("Error", "No user session found");

    // Check if profile exists
    const { data: profileExists, error: checkError } = await supabase
      .from("profiles")
      .select("id")
      .eq("id", userId)
      .maybeSingle();

    if (checkError) {
      return console.log("Error", checkError.message);
    }

    // If not found, insert a blank profile row
    if (!profileExists) {
      const { error: insertError } = await supabase.from("profiles").insert({
        id: userId,
        account_type: type,
      });

      if (insertError) {
        return console.log("Error", insertError.message);
      }
    } else {
      // If found, just update it
      const { error: updateError } = await supabase
        .from("profiles")
        .update({ account_type: type })
        .eq("id", userId);

      if (updateError) {
        return console.log("Error", updateError.message);
      }
    }

    router.push(type === "user" ? "/onboarding/user-profile" : "/onboarding/org-profile");
  };

  const skipOnboarding = async () => {
    const userId = session?.user.id;
    if (!userId) return console.log("Error", "No user session found");

    const { data: profileExists, error: checkError } = await supabase
      .from("profiles")
      .select("id")
      .eq("id", userId)
      .maybeSingle();

    if (checkError) {
      return console.log("Error", checkError.message);
    }

    if (!profileExists) {
      const { error: insertError } = await supabase.from("profiles").insert({
        id: userId,
        onboarding_complete: true,
      });

      if (insertError) {
        return console.log("Error", insertError.message);
      }
    } else {
      const { error: updateError } = await supabase
        .from("profiles")
        .update({ onboarding_complete: true })
        .eq("id", userId);

      if (updateError) {
        return console.log("Error", updateError.message);
      }
    }

    router.replace("/explore");
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

      <TouchableOpacity
        className="border border-gray-300 px-6 py-3 rounded-full w-full"
        onPress={skipOnboarding}
      >
        <Text className="text-center text-gray-700 font-semibold">Skip Onboarding For Now</Text>
      </TouchableOpacity>
    </View>
  );
}
