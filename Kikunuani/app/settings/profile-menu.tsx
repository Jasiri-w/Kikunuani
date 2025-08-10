import { View, Text, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function ProfileMenu() {
  const router = useRouter();

  return (
    <View className="flex-1 bg-white px-6 py-12">
      <Text className="text-2xl font-bold mb-8">Profile</Text>
      <TouchableOpacity
        className="flex-row items-center mb-6"
        onPress={() => router.push("/settings/profile")}
      >
        <Ionicons name="person-outline" size={24} color="#154403" />
        <Text className="ml-3 text-lg text-gray-800">Profile Details</Text>
      </TouchableOpacity>
      <TouchableOpacity
        className="flex-row items-center"
        onPress={() => router.push("/settings/account")}
      >
        <Ionicons name="settings-outline" size={24} color="#154403" />
        <Text className="ml-3 text-lg text-gray-800">Settings</Text>
      </TouchableOpacity>
    </View>
  );
}