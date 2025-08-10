import { View, Text, Image, ScrollView, TouchableOpacity, ActivityIndicator } from "react-native";
import { useLocalSearchParams, useNavigation, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/contexts/AuthContext";

export default function ProjectDetails() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { user } = useAuth();
  const [project, setProject] = useState<any>(null);
  const [membership, setMembership] = useState<"none" | "pending" | "involved" | "owner">("none");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProjectAndMembership() {
      setLoading(true);
      const { data: projectData, error: projectError } = await supabase
        .from("projects")
        .select("*")
        .eq("id", id)
        .single();
      setProject(projectData);

      if (user && projectData) {
        if (projectData.owner === user.id) {
          setMembership("owner");
        } else {
          const { data: membershipData } = await supabase
            .from("project_memberships")
            .select("*")
            .eq("project_id", id)
            .eq("user_id", user.id)
            .single();

          if (!membershipData) {
            setMembership("none");
          } else if (membershipData.role === "pending") {
            setMembership("pending");
          } else {
            setMembership("involved");
          }
        }
      }
      setLoading(false);
    }
    fetchProjectAndMembership();
  }, [id, user]);

  useEffect(() => {
    if (membership === "pending") {
      router.replace(`/project/${id}/pending`);
    }
    // Remove dashboard redirect for involved/owner
    // Users always see the presentable version first
  }, [membership, id, router]);

  const handleGetInvolved = async () => {
    if (!user?.id || !project?.id) return;
    const { error } = await supabase
      .from("project_memberships")
      .insert({
        project_id: project.id,
        user_id: user.id,
        role: "pending",
      });
    if (!error) {
      router.replace(`/project/${project.id}/pending`);
    } else {
      console.log("Error requesting to join project:", error.message);
    }
  };

  const handleGoToDashboard = () => {
    router.push(`/project/${project.id}/dashboard`);
  };

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
        {membership === "none" ? (
          <TouchableOpacity
            className="bg-kiku-light-green rounded-xl py-3"
            onPress={handleGetInvolved}
          >
            <Text className="text-center font-bold text-white text-base">Get Involved</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            className="bg-kiku-light-green rounded-xl py-3"
            onPress={handleGoToDashboard}
          >
            <Text className="text-center font-bold text-white text-base">Project Dashboard</Text>
          </TouchableOpacity>
        )}

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