import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter, useLocalSearchParams } from "expo-router";
import { useAuth } from "@/contexts/AuthContext";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function ProjectDashboard() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { user } = useAuth();
  const [project, setProject] = useState<any>(null);
  const [pendingRequests, setPendingRequests] = useState<any[]>([]);

  useEffect(() => {
    async function fetchProject() {
      const { data } = await supabase.from("projects").select("*").eq("id", id).single();
      setProject(data);
    }
    async function fetchPending() {
      const { data } = await supabase
        .from("project_memberships")
        .select("id, user_id, role")
        .eq("project_id", id)
        .eq("role", "pending");
      setPendingRequests(data || []);
    }
    fetchProject();
    fetchPending();
  }, [id]);

  const handleApprove = async (membershipId: string) => {
    await supabase
      .from("project_memberships")
      .update({ role: "participant" })
      .eq("id", membershipId);
    setPendingRequests(pendingRequests.filter(r => r.id !== membershipId));
  };

  const handleDecline = async (membershipId: string) => {
    await supabase
      .from("project_memberships")
      .delete()
      .eq("id", membershipId);
    setPendingRequests(pendingRequests.filter(r => r.id !== membershipId));
  };

  if (!project) return null;

  const isOwner = user?.id === project.owner;

  return (
    <View className="flex-1 bg-white px-4 pt-8">
      <View className="flex-row justify-between items-center mb-4">
        <Text className="text-2xl font-bold">Project Dashboard</Text>
        {isOwner && (
          <TouchableOpacity onPress={() => router.push(`/project/${id}/settings`)}>
            <Ionicons name="settings-outline" size={28} color="#154403" />
          </TouchableOpacity>
        )}
      </View>
      <Text className="text-lg font-semibold mb-2">{project.name}</Text>
      <Text className="text-gray-700 mb-4">{project.description}</Text>

      {/* Pending Requests Section */}
      {isOwner && (
        <View className="mt-6">
          <Text className="text-base font-semibold mb-2">Pending Requests</Text>
          {pendingRequests.length === 0 ? (
            <Text className="text-gray-400">No pending requests.</Text>
          ) : (
            pendingRequests.map(req => (
              <View key={req.id} className="flex-row items-center justify-between mb-2 bg-gray-100 px-3 py-2 rounded">
                <Text className="text-gray-800">User: {req.user_id}</Text>
                <View className="flex-row gap-2">
                  <TouchableOpacity
                    className="bg-kiku-light-green px-3 py-1 rounded"
                    onPress={() => handleApprove(req.id)}
                  >
                    <Text className="text-white">Approve</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    className="bg-red-400 px-3 py-1 rounded"
                    onPress={() => handleDecline(req.id)}
                  >
                    <Text className="text-white">Decline</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))
          )}
        </View>
      )}
      {/* Add dashboard content here: participants, updates, etc. */}
    </View>
  );
}