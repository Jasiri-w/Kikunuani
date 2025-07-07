import { View, Text, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function VerifyEmail() {
  const router = useRouter();

  return (
    <View className="flex-1 items-center justify-center bg-white px-6">
      <Ionicons name="mail-open-outline" size={64} color="#154403" />
      <Text className="text-2xl font-bold text-center mt-4 mb-2">Success! Now check your inbox</Text>
      <Text className="text-center text-gray-600 mb-6">
        We've sent a verification link to your email. Please confirm your account before logging in.
      </Text>

      <TouchableOpacity
        onPress={() => router.replace("/auth/login")}
        className="bg-kiku-dark-green px-6 py-3 rounded-full w-full"
      >
        <Text className="text-white text-center font-semibold">Return to Login</Text>
      </TouchableOpacity>
    </View>
  );
}
