import { Text, View, StyleSheet, ScrollView, TextInput, Image, TouchableOpacity, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "@/utils/theme";
import { LinearGradient } from "expo-linear-gradient";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "expo-router";

export default function ExploreScreen() {
  const [featuredProjects, setFeaturedProjects] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState<any[] | null>(null);
  const [searching, setSearching] = useState(false);
  const router = useRouter();

  useEffect(() => {
    async function fetchFeaturedProjects() {
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(2);
      setFeaturedProjects(data || []);
    }
    fetchFeaturedProjects();
  }, []);

  // Search handler
  const handleSearch = async (text: string) => {
    setSearch(text);
    if (text.trim().length === 0) {
      setSearchResults(null);
      return;
    }
    setSearching(true);
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .ilike("name", `%${text}%`);
    setSearchResults(data || []);
    setSearching(false);
  };

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

        {/* Featured Projects */}
        <View className="flex-row justify-between mb-4">
          {featuredProjects.length === 0 ? (
            <>
              <View className="w-[48%] bg-white rounded-xl shadow-sm overflow-hidden justify-center items-center">
                <Text className="text-gray-400">No featured projects yet.</Text>
              </View>
              <View className="w-[48%] bg-white rounded-xl shadow-sm overflow-hidden justify-center items-center">
                <Text className="text-gray-400">No featured projects yet.</Text>
              </View>
            </>
          ) : (
            featuredProjects.map((project, idx) => (
              <TouchableOpacity
                key={project.id}
                className="w-[48%] bg-white rounded-xl shadow-sm overflow-hidden"
                onPress={() => router.push(`/project/${project.id}`)}
              >
                <Image
                  source={{
                    uri: project.image?.trim()
                      ? project.image
                      : "https://images.unsplash.com/photo-1569239591652-6cc3025b07fa?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                  }}
                  className="w-full h-28"
                  resizeMode="cover"
                />
                <View className="p-2">
                  <Text className="text-xs text-gray-500">{project.location ?? "Unknown Location"}</Text>
                  <Text className="text-sm font-semibold text-gray-800" numberOfLines={2}>
                    {project.name}
                  </Text>
                </View>
              </TouchableOpacity>
            ))
          )}
        </View>

        {/* Highlight Card */}
        <View className="flex-row bg-emerald-100 border border-kiku-light-green rounded-xl overflow-hidden mb-6">
          <View className="flex-1 p-4 justify-center">
            <Text className="text-xs text-kiku-muted-green font-semibold mb-1">Top Regions</Text>
            <Text className="text-lg font-bold text-emerald-800">Kenya</Text>
            <Text className="text-sm text-kiku-dark-green mt-1">
              Kenya is renowned for its rich volcanic soils, high-altitude landscapes, and ideal climate, making it one of the most fertile and productive agricultural regions in Africa.
            </Text>
          </View>
          <Image
            source={{
              uri: "https://images.unsplash.com/photo-1558907530-fe311178388a?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            }}
            className="w-32 h-full"
            resizeMode="cover"
          />
        </View>

        {/* Follow-up Section Title */}
        <Text className="text-gray-700 font-medium text-base">Projects</Text>
        <Text className="text-gray-500 text-xs mb-4">
          Explore projects that are making a difference in your community and beyond.
        </Text>
        {/* Search Bar */}
        <View className="flex-row items-center bg-gray-100 rounded-full px-4 py-2 mb-4">
          <Ionicons name="search" size={18} color="#6B7280" />
          <TextInput
            placeholder="Search..."
            className="ml-2 flex-1 text-sm text-gray-700"
            placeholderTextColor="#9CA3AF"
            value={search}
            onChangeText={handleSearch}
          />
        </View>

        {/* Filter Pills */}
        <View className="flex-row flex-wrap mb-4 gap-2">
          {["All", "In your area", "In your country"].map(
            (label, index) => (
              <TouchableOpacity
                key={index}
                className={`px-4 py-2 rounded-full border ${
                  index === 0
                    ? "bg-emerald-100 border-kiku-light-green"
                    : "bg-gray-100 border-gray-300"
                }`}
                onPress={() => {
                  Alert.alert("Filter Selected", `You selected: ${label}`, [
                    { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' }
                  ]);
                }}
              >
                <Text
                  className={`text-sm font-medium ${
                    index === 0 ? "text-kiku-dark-green" : "text-gray-600"
                  }`}
                >
                  {label}
                </Text>
              </TouchableOpacity>
            )
          )}
        </View>

        {/* Search Results */}
        {searchResults && (
          <View className="mt-2">
            {searching && (
              <Text className="text-gray-400 mb-2">Searching...</Text>
            )}
            {searchResults.length === 0 ? (
              <Text className="text-gray-400 mb-2">No projects found.</Text>
            ) : (
              searchResults.map((project) => (
                <TouchableOpacity
                  key={project.id}
                  className="bg-white rounded-xl shadow-sm overflow-hidden mb-4"
                  onPress={() => router.push(`/project/${project.id}`)}
                >
                  <Image
                    source={{
                      uri: project.image?.trim()
                        ? project.image
                        : "https://images.unsplash.com/photo-1569239591652-6cc3025b07fa?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                    }}
                    className="w-full h-28"
                    resizeMode="cover"
                  />
                  <View className="p-2">
                    <Text className="text-xs text-gray-500">{project.location ?? "Unknown Location"}</Text>
                    <Text className="text-sm font-semibold text-gray-800" numberOfLines={2}>
                      {project.name}
                    </Text>
                    <Text className="text-xs text-gray-600 mt-1" numberOfLines={3}>
                      {project.description ?? "No description available."}
                    </Text>
                  </View>
                </TouchableOpacity>
              ))
            )}
          </View>
        )}

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
