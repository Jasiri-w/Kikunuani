import { View, Text, TouchableOpacity } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";

export default function ProjectPending() {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  return (
    <View className="flex-1 justify-center items-center bg-white px-6">
      <Text className="text-2xl font-bold mb-4 text-center">Request Pending</Text>
      <Text className="text-gray-700 mb-8 text-center">
        Your request to join this project is pending approval.
      </Text>
      <TouchableOpacity
        className="bg-kiku-light-green px-6 py-3 rounded-full"
        onPress={() => router.replace(`/project/${id}`)}
      >
        <Text className="text-white font-semibold">Back to Project</Text>
      </TouchableOpacity>
    </View>
  );
}