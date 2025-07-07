import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { useRouter } from "expo-router";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/lib/supabase";

export default function UserProfileOnboarding() {
  const { user, refreshUser } = useAuth();
  const router = useRouter();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [error, setError] = useState("");
  

  const handleSubmit = async () => {
    if (!firstName.trim() || !lastName.trim()) {
      setError("Please enter your full name.");
      return;
    }

    const { error: dbError } = await supabase
      .from("profiles")
      .update({
        first_name: firstName.trim(),
        last_name: lastName.trim(),
        onboarding_complete: true,
      })
      .eq("id", user?.id);

    if (dbError) {
      console.error("Update failed:", dbError);
      Alert.alert("Error", "There was a problem updating your profile.");
    } else {
      await refreshUser(); // Refresh user data to get updated profile
      router.replace("/explore");
    }
  };

  const skipOnboarding = async () => {
    const userId = user?.id;
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
      const { error: insertError } = await supabase.from("profiles")
          .insert({ 
            id: userId,
            email: user?.email ?? "",
            onboarding_complete: false,
          });

      if (insertError) {
        return console.log("Error", insertError.message);
      }
    } else {
      const { error: updateError } = await supabase
        .from("profiles")
        .update({ onboarding_complete: false })
        .eq("id", userId);

      if (updateError) {
        return console.log("Error", updateError.message);
      }
    }

    router.replace("/explore");
  };

  return (
    <View className="flex-1 justify-center items-center px-6">
      <Text className="text-sm font-medium mb-1">First Name</Text>
      <TextInput
        placeholder="First Name"
        value={firstName}
        onChangeText={(text) => {
          setFirstName(text);
          setError("");
        }}
        className={`w-full p-3 border rounded mb-2 ${error ? "border-red-500" : "border-gray-300"}`}
      />

      <Text className="text-sm font-medium mb-1">Last Name</Text>
      <TextInput
        placeholder="Last Name"
        value={lastName}
        onChangeText={(text) => {
          setLastName(text);
          setError("");
        }}
        className={`w-full p-3 border rounded mb-4 ${error ? "border-red-500" : "border-gray-300"}`}
      />

      {error ? <Text className="text-red-500 mb-2">{error}</Text> : null}
      <TouchableOpacity
        onPress={handleSubmit}
        className={`bg-kiku-light-green px-6 py-3 rounded w-full ${!(firstName.trim() && lastName.trim()) ? "opacity-50" : ""}`}
        disabled={!(firstName.trim() && lastName.trim() )}
      >
        <Text className="text-white font-semibold text-center">Continue</Text>
      </TouchableOpacity>
    </View>
  );
}
