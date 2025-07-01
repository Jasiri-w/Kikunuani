import { Text, View, StyleSheet, ScrollView, TextInput, Image, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "@/utils/theme";
import { LinearGradient } from "expo-linear-gradient";

export default function ExploreScreen() {
  return (
    <ScrollView className="h-screen bg-white">
      {/* Hero Section */}
      <LinearGradient
        colors={[colors.kikuDarkGreen, '#93F9B9']} // your brand green gradient
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        className="w-full px-6 py-12 rounded-b-3xl"
      >
        <View className="flex-row items-center justify-center mb-4">
          <Ionicons
            name="location-outline"
            size={40}
            color={colors.kikuLightGreen}
            style={{ marginRight: 10 }}
          />
          <Text className="text-4xl font-extrabold text-white tracking-wide">
            Explore
          </Text>
        </View>

        <Text className="text-center text-white text-base font-light leading-relaxed px-2">
          Discover impactful development projects in your area — or across the globe.
        </Text>
      </LinearGradient>

      {/* Main Content */}
      <View className="px-4 pt-6 pb-12">
        {/* 🔍 Search Bar */}
        <View className="flex-row items-center bg-gray-100 rounded-full px-4 py-2 mb-4">
          <Ionicons name="search" size={18} color="#6B7280" />
          <TextInput
            placeholder="Search..."
            className="ml-2 flex-1 text-sm text-gray-700"
            placeholderTextColor="#9CA3AF"
          />
        </View>

        {/* Filter Pills */}
        <View className="flex-row flex-wrap mb-4 gap-2">
          {["In your area", "In your country", "For you"].map(
            (label, index) => (
              <TouchableOpacity
                key={index}
                className={`px-4 py-2 rounded-full border ${
                  index === 0
                    ? "bg-emerald-100 border-emerald-400"
                    : "bg-gray-100 border-gray-300"
                }`}
              >
                <Text
                  className={`text-sm font-medium ${
                    index === 0 ? "text-emerald-700" : "text-gray-600"
                  }`}
                >
                  {label}
                </Text>
              </TouchableOpacity>
            )
          )}
        </View>

        {/* Image Cards */}
        <View className="flex-row justify-between mb-4">
          <View className="w-[48%] bg-white rounded-xl shadow-sm overflow-hidden">
            <Image
              source={{
                uri: "https://images.unsplash.com/photo-1569239591652-6cc3025b07fa?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
              }}
              className="w-full h-28"
              resizeMode="cover"
            />
            <View className="p-2">
              <Text className="text-xs text-gray-500">Barry, Ontario</Text>
              <Text className="text-sm font-semibold text-gray-800">Farm Development</Text>
            </View>
          </View>

          <View className="w-[48%] bg-white rounded-xl shadow-sm overflow-hidden">
            <Image
              source={{
                uri: "https://plus.unsplash.com/premium_photo-1664300347812-00e2b09646c5?q=80&w=1216&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
              }}
              className="w-full h-28"
              resizeMode="cover"
            />
            <View className="p-2">
              <Text className="text-xs text-gray-500">Hamilon, Ontario</Text>
              <Text className="text-sm font-semibold text-gray-800">Downtown Food Bank</Text>
            </View>
          </View>
        </View>

        {/* Highlight Card */}
        <View className="flex-row bg-emerald-100 border border-emerald-400 rounded-xl overflow-hidden mb-6">
          <View className="flex-1 p-4 justify-center">
            <Text className="text-xs text-emerald-600 font-semibold mb-1">Top Regions</Text>
            <Text className="text-lg font-bold text-emerald-800">South America</Text>
            <Text className="text-sm text-emerald-700 mt-1">
              This region is known for its high altitude growing, fruitful environment and robust farms.
            </Text>
          </View>
          <Image
            source={{
              uri: "https://images.unsplash.com/photo-1632913582790-d0ec5882095a?q=80&w=1172&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            }}
            className="w-24 h-full"
            resizeMode="cover"
          />
        </View>

        {/* Follow-up Section Title */}
        <Text className="text-gray-700 font-medium text-base">Development Map</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  text: {
    color: "white",
    fontSize: 100,
  },
});
