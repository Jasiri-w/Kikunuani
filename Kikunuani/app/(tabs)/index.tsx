import { Text, View, StyleSheet, TouchableOpacity, ScrollView, Dimensions } from "react-native";
import { Image } from "react-native";
import ImageViewer from "@/components/imageViewer";
import { Ionicons } from '@expo/vector-icons'
import { colors } from "@/utils/theme";
import { useRouter } from "expo-router";
import ProtectedRoute from "@/middleware/ProtectedRoute";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

const router = useRouter();
const PlaceholderImage = require("../../assets/images/background-image.jpg")
const screenWidth = Dimensions.get("window").width;

export default function Index() {
  const [yourProjects, setYourProjects] = useState<any[]>([]);
  const [loadingProjects, setLoadingProjects] = useState(true);
  const [topProjects, setTopProjects] = useState<any[]>([]);
  const [loadingTop, setLoadingTop] = useState(true);

  useEffect(() => {
    let isMounted = true;
    async function fetchProjects() {
      setLoadingProjects(true);
      const { data: { user } } = await supabase.auth.getUser();
      if (!user?.id) {
        setYourProjects([]);
        setLoadingProjects(false);
        return;
      }
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .eq("owner", user.id)
        .order("created_at", { ascending: false });
      if (isMounted) {
        setYourProjects(data || []);
        setLoadingProjects(false);
      }
    }
    fetchProjects();
    return () => { isMounted = false; };
  }, []);

  useEffect(() => {
    async function fetchTopProjects() {
      setLoadingTop(true);
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(5);
      setTopProjects(data || []);
      setLoadingTop(false);
    }
    fetchTopProjects();
  }, []);

  return (
    <ProtectedRoute>
      <ScrollView className="flex-1 bg-white p-4">
        
        {/* Location Header */}
        <View className="flex-row items-center justify-between mb-4">
          <Text className="text-lg font-semibold text-kiku-muted-green ">Karen, Nairobi - Kenya</Text>
          <Ionicons name="chevron-down" size={20} color="#4B5563" />
        </View>

        {/* Discovery Card */}
        <View className="rounded-xl overflow-hidden bg-white shadow-md">
          <Image
            source={{ uri: 'https://images.unsplash.com/photo-1544928147-79a2dbc1f389?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' }}
            style={{ width: screenWidth - 32, height: 176 }} // 32 = horizontal padding (p-4)
            resizeMode="cover"
          />

          <View className="absolute inset-0 bg-black bg-opacity-40 p-4 justify-between">
            <View>
              <Text className="text-white font-bold text-lg leading-tight">
                Discover projects in your area today!
              </Text>
              <Text className="text-white mt-1">Who is looking?</Text>
              <View className="flex-row mt-2 space-x-2">
                {/* Avatars */}
                <Image
                  source={{ uri: 'https://randomuser.me/api/portraits/women/44.jpg' }}
                  className="w-8 h-8 rounded-full border-2 border-white"
                />
                <Image
                  source={{ uri: 'https://randomuser.me/api/portraits/men/32.jpg' }}
                  className="w-8 h-8 rounded-full border-2 border-white"
                />
                <Image
                  source={{ uri: 'https://randomuser.me/api/portraits/men/75.jpg' }}
                  className="w-8 h-8 rounded-full border-2 border-white"
                />
              </View>
            </View>

            {/* CTA Button */}
            <TouchableOpacity  onPress={() => router.push("/explore")} className="mt-4 bg-kiku-light-green px-4 py-2 rounded-full self-start">
              <Text className="text-white font-semibold">Explore Now</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Your Projects Carousel */}
        <Text className="mt-6 text-gray-700 text-base font-medium">
          Your Projects - Continue where you left off!
        </Text>

        <View className="mt-4 overflow-visible">
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {loadingProjects ? (
              <View className="w-48 ml-2 mr-4 mb-2 justify-center items-center">
                <Text className="text-gray-500">Loading...</Text>
              </View>
            ) : yourProjects.length === 0 ? (
              <View className="w-48 ml-2 mr-4 mb-2 justify-center items-center">
                <Text className="text-gray-500">No projects yet.</Text>
              </View>
            ) : (
              yourProjects.map((project) => (
                <View
                  key={project.id}
                  className="w-48 ml-2 mr-4 mb-2 bg-white rounded-xl shadow-md overflow-hidden"
                >
                  <Image
                    source={{
                      uri:
                        project.image?.trim()
                          ? project.image
                          : "https://images.unsplash.com/flagged/photo-1574097656146-0b43b7660cb6?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                    }}
                    className="w-full h-28"
                    resizeMode="cover"
                  />
                  <View className="p-3">
                    <Text className="text-sm font-semibold text-gray-800" numberOfLines={1}>
                      {project.name}
                    </Text>
                    <View className="flex-row items-center mt-1">
                      <Ionicons name="trending-up-outline" size={14} color={colors.kikuLightGreen} />
                      <Text className="ml-1 text-sm text-gray-700" numberOfLines={1}>
                        {project.description ? project.description.slice(0, 22) + (project.description.length > 22 ? "..." : "") : "No description"}
                      </Text>
                    </View>
                    <TouchableOpacity onPress={() => router.push(`/project/${project.id}`)}>
                      <Text className="text-xs text-kiku-muted-green font-medium mt-1">Jump back in</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ))
            )}
          </ScrollView>
        </View>


        {/* Top Projects Carousel */}
        <Text className="mt-6 text-gray-700 text-base font-medium">
          Top projects this week!
        </Text>

        <View className="mt-4 overflow-visible">
          <ScrollView horizontal showsHorizontalScrollIndicator={false} className="py-4">
            {loadingTop ? (
              <View className="w-48 ml-2 mr-4 mb-2 justify-center items-center">
                <Text className="text-gray-500">Loading...</Text>
              </View>
            ) : (
              <>
                {topProjects.map((project) => (
                  <TouchableOpacity
                    key={project.id}
                    onPress={() => router.push(`/project/${project.id}`)}
                    className="w-48 ml-2 mr-4 mb-2 bg-white rounded-xl shadow-md overflow-hidden"
                  >
                    <Image
                      source={{
                        uri:
                          project.image?.trim()
                            ? project.image
                            : "https://images.unsplash.com/flagged/photo-1574097656146-0b43b7660cb6?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                      }}
                      className="w-full h-28"
                      resizeMode="cover"
                    />
                    <View className="p-3">
                      <Text className="text-sm font-semibold text-gray-800" numberOfLines={1}>
                        {project.name}
                      </Text>
                      <View className="flex-row items-center mt-1">
                        <Ionicons name="star" size={14} color={colors.kikuLightGreen} />
                        <Text className="ml-1 text-sm text-gray-700">
                          {project.description
                            ? project.description.slice(0, 22) + (project.description.length > 22 ? "..." : "")
                            : "No description"}
                        </Text>
                      </View>
                      <Text className="text-xs text-kiku-muted-green font-medium mt-1">View</Text>
                    </View>
                  </TouchableOpacity>
                ))}
                {/* View More Arrow */}
                <TouchableOpacity
                  onPress={() => router.push("/explore")}
                  className="ml-2 mr-4 mb-2 bg-white rounded-xl shadow-md justify-center items-center"
                  style={{ alignSelf: "center", padding: 60, boxShadow: '0px 0px 15px 0px rgba(128, 204, 40, 0.8)' }}
                >
                  <Ionicons name="arrow-forward-circle" size={40} color={colors.kikuLightGreen} />
                  <Text className="text-xs text-kiku-muted-green font-medium mt-2">View More</Text>
                </TouchableOpacity>
              </>
            )}
          </ScrollView>
        </View>

        {/* Community Articles Section */}
        <View className="mt-8">
          <Text className="text-gray-700 text-base font-medium mb-4">
            Community articles
          </Text>

          {/* Article Card 1 */}
          <TouchableOpacity 
            className="bg-white rounded-xl shadow-md mb-4 p-4"
            onPress={() => router.push(`/article/1`)}>
            <Image
              source={{ uri: 'https://images.unsplash.com/photo-1518219051733-d8d4fbbf9797?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NTYyMDF8MHwxfHNlYXJjaHw2fHx2aWxsYWdlfGVufDB8fHx8MTcyMTc0Mjg3OXww&ixlib=rb-4.0.3&q=80&w=1080' }}
              className="w-full h-36 rounded-lg mb-3"
              resizeMode="cover"
            />
            <Text className="text-base font-semibold text-gray-800 mb-1">
              Develop in Ushago! (How-to)
            </Text>
            <Text className="text-sm text-gray-600">
              Learn how to develop your village home - "shags" - and give back to the culture and community that brought you all the way here.
            </Text>
          </TouchableOpacity>

          {/* Article Card 2 */}
          <TouchableOpacity 
            className="bg-white rounded-xl shadow-md mb-4 p-4"
            onPress={() => router.push(`/article/1`)}>
            <Image
              source={{ uri: 'https://images.unsplash.com/photo-1532619675605-1ede6c2ed2b0?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' }}
              className="w-full h-36 rounded-lg mb-3"
              resizeMode="cover"
            />
            <Text className="text-base font-semibold text-gray-800 mb-1">
              Development Proposal Best Tips!
            </Text>
            <Text className="text-sm text-gray-600">
              Working on a proposal for a new passion project in a developing area? Here are the best tips to get your project funded.
            </Text>
          </TouchableOpacity>
        </View>

      </ScrollView>

      {/* Floating Action Button */}
      <TouchableOpacity
        onPress={() => router.push("/project/new")}
        style={{
          position: "absolute",
          bottom: 32,
          right: 24,
          backgroundColor: colors.kikuLightGreen,
          borderRadius: 32,
          width: 56,
          height: 56,
          justifyContent: "center",
          alignItems: "center",
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.2,
          shadowRadius: 4,
          elevation: 5,
        }}
        activeOpacity={0.8}
      >
        <Ionicons name="add" size={32} color="#fff" />
      </TouchableOpacity>
    </ProtectedRoute>
  );
}
