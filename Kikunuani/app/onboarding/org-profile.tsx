import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { useRouter } from "expo-router";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/lib/supabase";

export default function OrgProfileOnboarding() {
  const { user, refreshUser } = useAuth();
  const router = useRouter();
  const [orgName, setOrgName] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    if (!orgName.trim()) {
      setError("Please enter your organization name.");
      return;
    }

    const { error: orgError } = await supabase
      .from("organizations")
      .insert({
        name: orgName.trim(),
        created_by: user?.id,
        verified: false,
      });

    if (orgError) {
      console.error("Org creation failed:", orgError);
      Alert.alert("Error", "There was a problem creating your organization.");
      return;
    }

    const { error: profileError } = await supabase
      .from("profiles")
      .update({ onboarding_complete: true })
      .eq("id", user?.id);

    if (profileError) {
      console.error("Profile update failed:", profileError);
      Alert.alert("Error", "There was a problem updating your profile.");
    } else {
      await refreshUser(); // Refresh user data to get updated profile
      router.replace("/explore");
    }
  };

  return (
    <View className="flex-1 justify-center items-center px-6">
      <Text className="text-2xl font-bold mb-4 text-center">Welcome, Organization</Text>
      
      <TextInput
        placeholder="Organization name"
        value={orgName}
        onChangeText={(text) => {
          setOrgName(text);
          setError("");
        }}
        className={`w-full p-3 border rounded mb-2 ${error ? "border-red-500" : "border-gray-300"}`}
      />
      
      {error ? <Text className="text-red-500 mb-2">{error}</Text> : null}
      
      <TouchableOpacity
        onPress={handleSubmit}
        className={`bg-kiku-light-green px-6 py-3 rounded w-full ${!orgName.trim() ? "opacity-50" : ""}`}
        disabled={!orgName.trim()}
      >
        <Text className="text-white font-semibold text-center">Continue</Text>
      </TouchableOpacity>
    </View>
  );
}
