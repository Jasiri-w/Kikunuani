import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "expo-router";
import { useAuth } from "@/contexts/AuthContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const { user, refreshUser } = useAuth();

  const handleLogin = async () => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) return Alert.alert("Login error", error.message);

    const userId = data?.user?.id;
    const userEmail = data?.user?.email;

    // // Check if profile exists
    // const { data: existingProfile, error: profileCheckError } = await supabase
    //   .from("profiles")
    //   .select("id")
    //   .eq("id", userId)
    //   .single();

    await refreshUser(); // Refresh user data to get updated profile
    console.log("User logged in:", {
      id: userId,
      email: userEmail,
      account_type: user?.account_type,
      first_name: user?.first_name ?? null,
      last_name: user?.last_name ?? null,
      onboarding_complete: user?.onboarding_complete ?? null,
    });
    router.replace("/"); // Proceed normally
  };
  const handleFirstTimeUser = () => {
    router.push("/auth/signup");
  };

  const skipOnboarding = async () => {
    router.replace("/explore");
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

      <Text className="text-sm text-kiku-muted-green mb-4">
        Remember to verify your email after signing up!!
      </Text>

      <TouchableOpacity className="bg-kiku-dark-green py-3 rounded" onPress={handleLogin}>
        <Text className="text-white text-center font-semibold">Log In</Text>
      </TouchableOpacity>
      <TouchableOpacity
        className="border border-gray-300 px-6 py-3 rounded-full w-full"
        onPress={skipOnboarding}
      >
        <Text className="text-center text-gray-700 font-semibold">Continue as Guest</Text>
      </TouchableOpacity>

      <View className="mt-6 items-center">
        <Text className="text-gray-600 mb-2">First time here?</Text>
        <TouchableOpacity onPress={handleFirstTimeUser}>
          <Text className="text-kiku-dark-green font-semibold underline">Create an account</Text>
        </TouchableOpacity>
      </View>

      
    </View>
  );
}
