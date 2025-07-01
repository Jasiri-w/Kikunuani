import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "@/utils/theme"; // adjust if needed

export default function ArticleDetailScreen() {
  const { id } = useLocalSearchParams();
  const navigation = useNavigation();

  // Simulated article data (replace with real data later)
  const article = {
    title: "How to give back and develop your Shags!",
    subtitle: "How to develop your Shags!",
    publisher: "Kiku News",
    timeAgo: "3 Days Ago",
    readTime: "5 Min Read",
    image:
      "https://images.unsplash.com/photo-1518219051733-d8d4fbbf9797?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NTYyMDF8MHwxfHNlYXJjaHw2fHx2aWxsYWdlfGVufDB8fHx8MTcyMTc0Mjg3OXww&ixlib=rb-4.0.3&q=80&w=1080",
    tags: ["#ushago", "#diaspora"],
    content: `Giving back and developing your home village can have a profound impact on the community. Start by identifying the most pressing needs, such as education, healthcare, or infrastructure. Organize fundraising events or use crowdfunding platforms to gather resources. Partner with local leaders to ensure the projects align with the community’s priorities. Volunteer your skills or time to initiatives like building schools, clinics, or clean water systems. Encourage others to contribute, creating a network of support. By focusing on sustainable development and community involvement, you can help create long-term change.`,
  };

  useEffect(() => {
    navigation.setOptions({
      title: article.subtitle,
    });
  }, []);

  return (
    <ScrollView className="bg-white px-4 pt-6 pb-12">
      {/* Publisher Info Row */}
      <View className="flex-row items-center justify-between mb-4">
        <View className="flex-row items-center">
          <View className="w-10 h-10 bg-pink-200 rounded-xl mr-3" />
          <View>
            <Text className="font-semibold text-sm text-gray-800">
              {article.publisher}
            </Text>
            <Text className="text-xs text-gray-500">
              {article.timeAgo} • {article.readTime}
            </Text>
          </View>
        </View>
        <TouchableOpacity className="bg-pink-500 px-4 py-1 rounded-full">
          <Text className="text-white font-semibold text-sm">Follow</Text>
        </TouchableOpacity>
      </View>

      {/* Article Image with Icon */}
      <View className="relative">
        <Image
          source={{ uri: article.image }}
          className="w-full h-52 rounded-xl"
          resizeMode="cover"
        />
        <Ionicons
          name="document-text-outline"
          size={36}
          color={colors.kikuDarkGreen}
          className="absolute left-3 top-3"
        />
      </View>

      {/* Title and Tags */}
      <Text className="text-xl font-bold mt-4 text-gray-900">
        {article.title}
      </Text>
      <View className="flex-row flex-wrap mt-2 space-x-2">
        {article.tags.map((tag) => (
          <Text
            key={tag}
            className="bg-pink-100 text-pink-700 px-2 py-0.5 text-xs rounded-full"
          >
            {tag}
          </Text>
        ))}
      </View>

      {/* Body */}
      <Text className="mt-6 text-gray-700 text-base leading-6">
        {article.content}
      </Text>
    </ScrollView>
  );
}
