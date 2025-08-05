import { View, Text, Image, ScrollView, TouchableOpacity, ActivityIndicator } from "react-native";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function ProjectDetails() {
  const { id } = useLocalSearchParams();
  const navigation = useNavigation();
  const [project, setProject] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProject() {
      setLoading(true);
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .eq("id", id)
        .single();
      if (data) {
        setProject(data);
        navigation.setOptions({ title: data.name });
      } else {
        setProject(null);
        navigation.setOptions({ title: `Project ${id} Details` });
      }
      setLoading(false);
    }
    if (id) fetchProject();
  }, [id]);

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <ActivityIndicator size="large" color="#4ADE80" />
      </View>
    );
  }

  if (!project) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <Text className="text-gray-700">Project not found.</Text>
      </View>
    );
  }

  return (
    <ScrollView className="flex-1 bg-white px-4 pt-8">
      <Text className="text-2xl font-bold text-gray-900 text-center">Project Details</Text>

      {/* Image */}
      <View className="rounded-xl overflow-hidden mt-6">
        <Image
          source={{
            uri:
              project.image?.trim()
                ? project.image
                : "https://images.unsplash.com/flagged/photo-1574097656146-0b43b7660cb6?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          }}
          className="w-full h-52"
          resizeMode="cover"
        />
      </View>

      {/* Time */}
      <Text className="mt-4 text-gray-500 text-sm">
        {project.created_at ? new Date(project.created_at).toLocaleString() : ""}
      </Text>

      {/* Title + Description */}
      <Text className="text-xl font-bold text-black mt-1">{project.name}</Text>
      <Text className="text-gray-700 mt-2">
        {project.description || "No description provided."}
      </Text>

      {/* Participants (placeholder) */}
      <Text className="mt-6 mb-2 font-semibold text-gray-800">Project Participants</Text>
      <View className="flex-row space-x-2">
        {/*
          Ideally, you would map through actual participant data here.
          For now, we're using static images as placeholders.
        */}
        { [
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