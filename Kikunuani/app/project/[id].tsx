import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import { useEffect } from "react";

export default function ProjectDetails() {
  const { id } = useLocalSearchParams();
  const navigation = useNavigation();

  // Simulated fetch - replace with actual data fetch
  const projectData = {
        title: "Kikunuani Pit Latrines",
        description:
            "Developing 100 pit Latrines for the kids of Kikunuani public school using locally sourced workforce. Community funded.",
        image:
            "https://upload.wikimedia.org/wikipedia/commons/f/f6/Outhouse_at_Pearl_Harbor_National_Memorial.jpg",
  };

  useEffect(() => {
    if (projectData?.title) {
        navigation.setOptions({
            title: projectData.title,
        });
    }else{
        navigation.setOptions({
            title: `Project ${id} Details`
        })
    }
  }, [projectData?.title]);

  // Ideally you'd fetch project details by `id` here
  return (
    <ScrollView className="flex-1 bg-white px-4 pt-8">

      <Text className="text-2xl font-bold text-gray-900 text-center">Project Details</Text>

      {/* Image */}
      <View className="rounded-xl overflow-hidden mt-6">
        <Image
          source={{ uri: "https://images.unsplash.com/photo-1699720435972-421b63a6ee57?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NTYyMDF8MHwxfHNlYXJjaHwyfHxsYXRyaW5lfGVufDB8fHx8MTcyMTc0MjUxMnww&ixlib=rb-4.0.3&q=80&w=1080" }}
          className="w-full h-52"
          resizeMode="cover"
        />
      </View>

      {/* Time */}
      <Text className="mt-4 text-gray-500 text-sm">12:30pm</Text>

      {/* Title + Description */}
      <Text className="text-xl font-bold text-black mt-1">Kikunuani Pit Latrines</Text>
      <Text className="text-gray-700 mt-2">
        Developing 100 pit latrines for the kids of Kikunuani public school using locally sourced workforce.
        Community funded.
      </Text>

      {/* Participants */}
      <Text className="mt-6 mb-2 font-semibold text-gray-800">Project Participants</Text>
      <View className="flex-row space-x-2">
        {[
          "https://randomuser.me/api/portraits/men/32.jpg",
          "https://randomuser.me/api/portraits/women/65.jpg",
          "https://randomuser.me/api/portraits/women/44.jpg"
        ].map((uri, index) => (
          <Image
            key={index}
            source={{ uri }}
            className="w-12 h-12 rounded-full"
          />
        ))}
      </View>

      {/* Action Buttons */}
      <View className="mt-8 space-y-3">
        <TouchableOpacity className="bg-kiku-light-green rounded-xl py-3">
          <Text className="text-center font-bold text-white text-base">Get Involved</Text>
        </TouchableOpacity>

        <TouchableOpacity className="border border-kiku-light-green rounded-xl py-3">
          <Text className="text-center font-bold text-kiku-light-green text-base">Fund</Text>
        </TouchableOpacity>
      </View>

      <View className="h-10" />
    </ScrollView>
  );
}

export const options = {
  title: "Project Details",
};