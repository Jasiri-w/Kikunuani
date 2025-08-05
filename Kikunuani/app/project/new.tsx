import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { supabase } from "@/lib/supabase";
import { colors } from "@/utils/theme";

export default function NewProject() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [coverImage, setCoverImage] = useState(""); // New state for image URL
  const [loading, setLoading] = useState(false);

  const handleCreate = async () => {
    if (!name.trim()) {
      console.log("Project name is required.");
      return;
    }
    setLoading(true);
    const { data: { user } } = await supabase.auth.getUser();
    const { error } = await supabase.from("projects").insert({
      name,
      description,
      location,
      owner: user?.id,
      image: coverImage || null, // Save image URL or null
    });
    setLoading(false);
    if (error) {
      console.log("Error", error.message);
    } else {
      console.log("Success", "Project created!");
      router.replace("/"); // Go back to home
    }
  };

  return (
    <ScrollView className="flex-1 bg-white p-6">
      <TouchableOpacity onPress={() => router.back()} className="mb-6">
        <Ionicons name="arrow-back" size={28} color={colors.kikuLightGreen} />
      </TouchableOpacity>
      <Text className="text-2xl font-bold mb-4 text-gray-800">Create New Project</Text>
      <Text className="mb-2 text-gray-700">Project Name *</Text>
      <TextInput
        className="border border-gray-300 rounded-lg px-4 py-2 mb-4"
        placeholder="Enter project name"
        value={name}
        onChangeText={setName}
      />
      <Text className="mb-2 text-gray-700">Description</Text>
      <TextInput
        className="border border-gray-300 rounded-lg px-4 py-2 mb-4"
        placeholder="Describe your project"
        value={description}
        onChangeText={setDescription}
        multiline
        numberOfLines={4}
      />
      <Text className="mb-2 text-gray-700">Location</Text>
      <TextInput
        className="border border-gray-300 rounded-lg px-4 py-2 mb-4"
        placeholder="e.g. Karen, Nairobi"
        value={location}
        onChangeText={setLocation}
      />
      <Text className="mb-2 text-gray-700">Cover Image URL</Text>
      <TextInput
        className="border border-gray-300 rounded-lg px-4 py-2 mb-6"
        placeholder="Paste an image URL (optional)"
        value={coverImage}
        onChangeText={setCoverImage}
      />
      <TouchableOpacity
        className="bg-kiku-light-green py-3 rounded-lg"
        onPress={handleCreate}
        disabled={loading}
      >
        <Text className="text-white text-center font-semibold text-lg">
          {loading ? "Creating..." : "Create Project"}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}