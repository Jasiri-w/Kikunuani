import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "expo-router";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async () => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) return Alert.alert("Login error", error.message);

    const userId = data?.user?.id;
    const userEmail = data?.user?.email;

    // Check if profile exists
    const { data: existingProfile, error: profileCheckError } = await supabase
      .from("profiles")
      .select("id")
      .eq("id", userId)
      .single();

    if (!existingProfile && userId) {
      // Only insert if it doesn't already exist
      const { error: insertError } = await supabase
        .from("profiles")
        .insert([{ id: userId, email: userEmail }]);

      if (insertError) {
        console.error("Profile creation error:", insertError.message);
        return Alert.alert("Error", "Could not complete login. Try again.");
      }
    }

    router.replace("/"); // Proceed normally
  };
  const handleFirstTimeUser = () => {
    router.push("/auth/signup");
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

      <View className="mt-6 items-center">
        <Text className="text-gray-600 mb-2">First time here?</Text>
        <TouchableOpacity onPress={handleFirstTimeUser}>
          <Text className="text-kiku-dark-green font-semibold underline">Create an account</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
