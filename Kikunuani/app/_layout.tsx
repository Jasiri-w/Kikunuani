import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { LogBox } from "react-native";
import "../global.css";

import { AuthProvider } from "@/contexts/AuthContext";

// LogBox.ignoreAllLogs(true);

export default function RootLayout() {
  return (
    <AuthProvider>
      <StatusBar style="light" />
      <Stack>
        <Stack.Screen 
          name="(tabs)" 
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen 
          name="+not-found"
          options={{
            headerShown: false,
          }} 
        />
      </Stack>
    </AuthProvider>
  );
}
