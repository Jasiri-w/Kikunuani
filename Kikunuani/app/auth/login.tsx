import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "expo-router";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async () => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) return Alert.alert("Login error", error.message);
    router.replace("/"); // Redirect to main app
  };

  return (
    <View className="flex-1 px-6 py-12 justify-center">
      <Text className="text-2xl font-bold mb-6">Log In</Text>
      <TextInput
        placeholder="Email"
        className="border p-3 rounded mb-3"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
      />
      <TextInput
        placeholder="Password"
        secureTextEntry
        className="border p-3 rounded mb-6"
        value={password}
        onChangeText={setPassword}
      />
      <TouchableOpacity className="bg-kiku-dark-green py-3 rounded" onPress={handleLogin}>
        <Text className="text-white text-center font-semibold">Log In</Text>
      </TouchableOpacity>
    </View>
  );
}
