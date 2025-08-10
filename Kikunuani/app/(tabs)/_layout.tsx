import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../../utils/theme";
import { TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";

export default function TabsLayout() {
  const router = useRouter();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.kikuDarkGreen, // Color of tab bottom bar title when tab is actively selected
        headerStyle: {
          backgroundColor: "white"
        },
        headerShadowVisible: false,
        headerTintColor: "black",
        tabBarStyle: {
          backgroundColor: "white"
        },
      }} 
    >
      <Tabs.Screen 
        name="index" 
        options={{
          headerTitle: "Kikunuani",
          tabBarLabel: "Home",
          tabBarIcon: ({focused, color}) => (
            <Ionicons 
              name={focused ? "home-sharp" : "home-outline"}
              color={color}
              size={24}
            />
          ),
          headerRight: () => (
            <TouchableOpacity
              style={{ marginRight: 16 }}
              onPress={() => router.push("/settings/profile-menu")}
            >
              <Ionicons name="person-circle-outline" size={28} color={colors.kikuDarkGreen} />
            </TouchableOpacity>
          ),
        }}
      />
      <Tabs.Screen 
        name="explore"
        options={{
          headerTitle: "Explore",
          tabBarLabel: "Explore",
          // headerStyle: {
          //   backgroundColor: colors.kikuDarkGreen,
          // },
          tabBarIcon: ({focused, color}) => (
            <Ionicons 
              name={focused ? "earth" : "earth-outline" }
              color={color}
              size={24}
            />
          )
        }} 
      />
      <Tabs.Screen 
        name="pulse"
        options={{
          headerTitle: "Pulse - Read & Learn",
          tabBarLabel: "Pulse",
          tabBarIcon: ({focused, color}) => (
            <Ionicons 
              name={focused ? "reader" : "reader-outline" }
              color={color}
              size={24}
            />
          )
        }} 
      />
    </Tabs>
  );
}
