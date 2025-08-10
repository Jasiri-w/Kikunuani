import { useState } from "react";
import { View, Text, TouchableOpacity, Alert } from "react-native";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/lib/supabase";
import { useRouter } from "expo-router";

export default function AccountTypeSwitcher() {
  const { user } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const currentType = user?.account_type;

  const handleSwitch = async () => {
    if (!user) return;
    setLoading(true);

    if (currentType === "user") {
      // Switch to organization: create org record, delete profile record
      const { error: orgError } = await supabase
        .from("organizations")
        .upsert({
          id: user.id,
          name: user.first_name ?? "",
          description: "",
          email: user.email ?? "",
          onboarding_complete: false,
        });
      const { error: profileError } = await supabase
        .from("profiles")
        .delete()
        .eq("id", user.id);

      if (orgError || profileError) {
        console.log("Error switching to organization:", orgError?.message || profileError?.message);
      } else {
        console.log("Switched to organization.");
        router.replace("/settings/profile-menu");
      }
    } else if (currentType === "organization") {
      // Switch to user: create profile record, delete org record
      const { error: profileError } = await supabase
        .from("profiles")
        .upsert({
          id: user.id,
          first_name: user.first_name ?? "",
          last_name: "",
          email: user.email ?? "",
          onboarding_complete: false,
        });
      const { error: orgError } = await supabase
        .from("organizations")
        .delete()
        .eq("id", user.id);

      if (profileError || orgError) {
        console.log("Error switching to user:", profileError?.message || orgError?.message);
      } else {
        console.log("Switched to user.");
        router.replace("/settings/profile-menu");
      }
    }

    setLoading(false);
  };

  return (
    <View className="flex-1 px-6 py-10">
      <Text className="text-2xl font-bold mb-6">Account Type</Text>
      <Text className="mb-4 text-lg">
        Current type: <Text className="font-semibold">{currentType === "user" ? "User" : "Organization"}</Text>
      </Text>
      <Text className="mb-8 text-gray-600">
        Switching will convert your account and remove all previous details except your name/email.
      </Text>
      <TouchableOpacity
        onPress={handleSwitch}
        disabled={loading}
        className="bg-kiku-dark-green px-6 py-3 rounded"
      >
        <Text className="text-white font-semibold text-center">
          {loading
            ? "Switching..."
            : currentType === "user"
            ? "Switch to Organization"
            : "Switch to User"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}