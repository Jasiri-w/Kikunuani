import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "expo-router";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSignup = async () => {
    const { error } = await supabase.auth.signUp({ email, password });
    if (error) return console.log("Signup error", error.message);

    Alert.alert("Success", "Please check your email to confirm your account.");
    
    setTimeout(() => {
      router.push("/auth/login");
    }, 1000);
  };

  const skipOnboarding = async () => {
    router.replace("/explore");
  };

  return (
    <View className="flex-1 px-6 py-12 justify-center">
      <Text className="text-2xl font-bold mb-6">Create Account</Text>
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
      <TouchableOpacity className="bg-kiku-dark-green py-3 rounded" onPress={handleSignup}>
        <Text className="text-white text-center font-semibold">Sign Up</Text>
      </TouchableOpacity>

      <TouchableOpacity
        className="border border-gray-300 px-6 py-3 rounded-full w-full"
        onPress={skipOnboarding}
      >
        <Text className="text-center text-gray-700 font-semibold">Continue as Guest</Text>
      </TouchableOpacity>
    </View>
  );
}
