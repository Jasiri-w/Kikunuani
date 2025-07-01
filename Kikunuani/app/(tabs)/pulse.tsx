import { View, Text, TextInput, ScrollView, Image, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const router = useRouter();

export default function PulseScreen() {
  return (
    <ScrollView className="flex-1 bg-white px-4 pt-6">
      {/* Header Greeting */}
      <View className="flex-row items-center justify-between mb-2">
        <View className="flex-row items-center gap-2">
          <Image
            source={{ uri: 'https://i.pravatar.cc/100' }} // replace with actual user image
            className="w-10 h-10 rounded-full"
          />
          <Text className="text-lg font-semibold text-gray-800">Hey Manuel</Text>
        </View>
        <Ionicons name="notifications-outline" size={24} color="#4B5563" />
      </View>

      {/* Subheading */}
      <Text className="text-sm text-gray-500 mb-4">
        Stay up to date with the latest news below.
      </Text>

      {/* Search Bar */}
      <View className="flex-row items-center bg-gray-100 rounded-full px-4 py-2 mb-4">
        <Ionicons name="search-outline" size={18} color="#6B7280" />
        <TextInput
          placeholder="Search all articles..."
          className="ml-2 flex-1 text-sm text-gray-700"
          placeholderTextColor="#9CA3AF"
        />
      </View>

      {/* Horizontal Article Cards */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-4">
        {[1, 2].map((_, idx) => (
          <TouchableOpacity onPress={() => router.push("/article/1")}
            key={idx}
            className="w-60 mr-4 bg-white border border-kiku-light-green rounded-xl overflow-hidden shadow-md my-4"
          >
            <View className="relative">
              <Image
                source={{
                  uri: 'https://images.unsplash.com/photo-1687461312374-46e4799052c8?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                }}
                className="w-full h-32"
                resizeMode="cover"
              />
              <View className="absolute top-2 left-2 bg-orange-100 px-2 py-1 rounded">
                <Text className="text-orange-700 text-xs font-semibold">Image</Text>
              </View>
            </View>
            <View className="p-2">
              <Text className="text-sm font-semibold text-gray-800 leading-tight">
                The Development boom of Kenya - What we can all learn...
              </Text>
              <View className="flex-row items-center mt-2 space-x-2">
                <Text className="text-xs text-gray-500">Jackson Hewitt</Text>
                <Ionicons name="chatbubble-ellipses-outline" size={12} color="#9CA3AF" />
                <Text className="text-xs text-gray-500">24</Text>
                <Ionicons name="time-outline" size={12} color="#9CA3AF" />
                <Text className="text-xs text-gray-500">12h</Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Filter Pills */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-4">
        {['For You', 'How-to', 'Kenya', 'Technology', 'Food Security'].map((pill, i) => (
          <TouchableOpacity
            key={pill}
            className={`px-4 py-2 mr-2 rounded-full ${
              i === 0
                ? 'bg-kiku-light-green'
                : 'bg-gray-100'
            }`}
          >
            <Text
              className={`text-sm ${
                i === 0 ? 'text-white font-semibold' : 'text-gray-600'
              }`}
            >
              {pill}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Popular Today Section */}
      <Text className="text-base font-semibold text-gray-800 mb-4">Popular Today</Text>

      {[1, 2].map((_, idx) => (
        <TouchableOpacity onPress={() => router.push("/article/1")}
          key={idx}
          className="flex-row bg-white mb-4 rounded-xl shadow-md overflow-hidden"
        >
          <Image
            source={{
              uri: 'https://images.unsplash.com/photo-1495573596931-cbcec230bfd0?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            }}
            className="w-24 h-24"
            resizeMode="cover"
          />
          <View className="flex-1 p-3 justify-center">
            <Text className="text-sm font-bold text-gray-800 mb-1">
              How projects in agriculture are reshaping small communities
            </Text>
            <View className="flex-row items-center flex-wrap space-x-2">
              <Text className="text-xs text-gray-500">Jackson Hewitt</Text>
              <Ionicons name="chatbubble-ellipses-outline" size={12} color="#9CA3AF" />
              <Text className="text-xs text-gray-500">24</Text>
              <Ionicons name="time-outline" size={12} color="#9CA3AF" />
              <Text className="text-xs text-gray-500">12h</Text>
            </View>
            <Text className="text-xs text-kiku-dark-green font-semibold mt-1">Read Now</Text>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}
