import { useEffect, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/lib/supabase";
import { useRouter } from "expo-router";

export default function ProfileSettings() {
    const { user } = useAuth();
    const router = useRouter();

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [accountType, setAccountType] = useState<"user" | "organization" | null>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (user) {
        setFirstName(user.first_name ?? "");
        setLastName(user.last_name ?? "");
        setAccountType(user.account_type);
        }
    }, [user]);

    const handleSave = async () => {
        if (!firstName.trim()) {
            Alert.alert("Validation Error", "First name is required.");
            return;
        }

        if (!lastName.trim()) {
            Alert.alert("Validation Error", "Last name is required.");
            return;
        }

        if (!accountType) {
            Alert.alert("Validation Error", "Please select an account type.");
            return;
        }

        setLoading(true);

        const { error } = await supabase
            .from("profiles")
            .update({
            first_name: firstName.trim(),
            last_name: lastName.trim(),
            account_type: accountType,
            })
            .eq("id", user?.id);

        setLoading(false);

        if (error) {
            console.error(error);
            Alert.alert("Error", "Failed to update profile.");
        } else {
            Alert.alert("Success", "Profile updated successfully.");
            router.back();
        }
    };

    return (
        <View className="flex-1 px-6 py-10">
        <Text className="text-2xl font-bold mb-6">Edit Profile</Text>

        <Text className="text-sm font-semibold mb-1">First Name</Text>
        <TextInput
            className="border border-gray-300 rounded px-4 py-2 mb-4"
            value={firstName}
            onChangeText={setFirstName}
            placeholder="First Name"
        />

        <Text className="text-sm font-semibold mb-1">Last Name</Text>
        <TextInput
            className="border border-gray-300 rounded px-4 py-2 mb-4"
            value={lastName}
            onChangeText={setLastName}
            placeholder="Last Name"
        />

        <Text className="text-sm font-semibold mb-1">Account Type</Text>
        <View className="flex-row space-x-4 mb-6">
            <TouchableOpacity
            className={`px-4 py-2 rounded-full border ${
                accountType === "user"
                ? "bg-kiku-light-green border-transparent"
                : "border-gray-300"
            }`}
            onPress={() => setAccountType("user")}
            >
            <Text className="text-white">User</Text>
            </TouchableOpacity>

            <TouchableOpacity
            className={`px-4 py-2 rounded-full border ${
                accountType === "organization"
                ? "bg-kiku-light-green border-transparent"
                : "border-gray-300"
            }`}
            onPress={() => setAccountType("organization")}
            >
            <Text className="text-white">Organization</Text>
            </TouchableOpacity>
        </View>

        <TouchableOpacity
            onPress={handleSave}
            disabled={loading}
            className="bg-kiku-dark-green px-6 py-3 rounded"
        >
            <Text className="text-white font-semibold text-center">
            {loading ? "Saving..." : "Save Changes"}
            </Text>
        </TouchableOpacity>
        </View>
    );
}
