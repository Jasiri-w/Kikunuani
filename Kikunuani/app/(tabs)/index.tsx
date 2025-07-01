import { Text, View, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { Image } from "expo-image";
import ImageViewer from "@/components/imageViewer";
import { Ionicons } from '@expo/vector-icons'
import { colors } from "@/utils/theme";
import { useRouter } from "expo-router";

const router = useRouter();
const PlaceholderImage = require("../../assets/images/background-image.jpg")

export default function Index() {
  return (
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
          className="w-full h-44"
          resizeMode="cover"
        />

        <View className="absolute top-2 left-2 bg-orange-200 px-2 py-0.5 rounded-md">
          <Text className="text-xs text-orange-700 font-semibold">Column</Text>
        </View>

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
          {/* Project Card 1 */}
          <View className="w-48 ml-2 mr-4 mb-2 bg-white rounded-xl shadow-md overflow-hidden">
            <Image
              source={{ uri: 'https://images.unsplash.com/flagged/photo-1574097656146-0b43b7660cb6?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' }}
              className="w-full h-28"
              resizeMode="cover"
            />
            <View className="p-3">
              <Text className="text-sm font-semibold text-gray-800">Moi School Plant</Text>
              <View className="flex-row items-center mt-1">
                <Ionicons name="trending-up-outline" size={14} color={colors.kikuLightGreen}/>
                <Text className="ml-1 text-sm text-gray-700">Milestone Progress 90%</Text>
              </View>
              <TouchableOpacity onPress={() => router.push("/project/1")}>
                <Text className="text-xs text-kiku-muted-green font-medium mt-1">Jump back in</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </View>


      {/* Top Projects Carousel */}
      <Text className="mt-6 text-gray-700 text-base font-medium">
        Top projects this week!
      </Text>

      <View className="mt-4 overflow-visible">
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {/* Project Card 1 */}
          <TouchableOpacity onPress={() => router.push("/project/1")} className="w-48 ml-2 mr-4 mb-2 bg-white rounded-xl shadow-md overflow-hidden">
            <Image
              source={{ uri: 'https://images.unsplash.com/photo-1699720435972-421b63a6ee57?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NTYyMDF8MHwxfHNlYXJjaHwyfHxsYXRyaW5lfGVufDB8fHx8MTcyMTc0MjUxMnww&ixlib=rb-4.0.3&q=80&w=1080' }}
              className="w-full h-28"
              resizeMode="cover"
            />
            <View className="p-3">
              <Text className="text-sm font-semibold text-gray-800">Kikunuani Pit Latrines</Text>
              <View className="flex-row items-center mt-1">
                <Ionicons name="star" size={14} color={colors.kikuLightGreen}/>
                <Text className="ml-1 text-sm text-gray-700">4.9 Stars</Text>
              </View>
              <Text className="text-xs text-kiku-muted-green font-medium mt-1">View</Text>
            </View>
          </TouchableOpacity>

          {/* Project Card 2 */}
          <TouchableOpacity onPress={() => router.push("/project/1")}className="w-48 mr-4 mb-2 bg-white rounded-xl shadow-md overflow-hidden">
            <Image
              source={{ uri: 'https://images.unsplash.com/photo-1697383904769-9a0342912c68?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NTYyMDF8MHwxfHNlYXJjaHwzfHxzbHVtc3xlbnwwfHx8fDE3MjE3NDI4NTh8MA&ixlib=rb-4.0.3&q=80&w=1080' }}
              className="w-full h-28"
              resizeMode="cover"
            />
            <View className="p-3">
              <Text className="text-sm font-semibold text-gray-800">Kibera Food Runs</Text>
              <View className="flex-row items-center mt-1">
                <Ionicons name="star" size={14} color={colors.kikuLightGreen} />
                <Text className="ml-1 text-sm text-gray-700">4.7 Stars</Text>
              </View>
              <Text className="text-xs text-kiku-muted-green font-medium mt-1">View</Text>
            </View>
          </TouchableOpacity>
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
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  imageContainer: {
    flex: 1,
  },

})