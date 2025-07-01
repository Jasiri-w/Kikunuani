import { View, Text, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { supabase } from "@/lib/supabase";

export default function AccountTypeSelection() {
  const router = useRouter();

  const handleSelect = async (type: "user" | "organization") => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    await supabase.from("profiles").upsert({ id: user.id, account_type: type });
    router.replace("/"); // Redirect after onboarding
  };

  return (
    <View className="flex-1 justify-center items-center px-6">
      <Text className="text-2xl font-bold mb-8 text-center">
        Select Account Type
      </Text>
      <TouchableOpacity
        className="bg-kiku-light-green w-full py-4 rounded mb-4"
        onPress={() => handleSelect("user")}
      >
        <Text className="text-white text-center font-semibold">I'm an Individual</Text>
      </TouchableOpacity>
      <TouchableOpacity
        className="bg-kiku-muted-green w-full py-4 rounded"
        onPress={() => handleSelect("organization")}
      >
        <Text className="text-white text-center font-semibold">We're an Organization</Text>
      </TouchableOpacity>
    </View>
  );
}
