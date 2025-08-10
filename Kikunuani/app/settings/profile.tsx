import { useEffect, useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/lib/supabase";
import { useRouter } from "expo-router";

export default function ProfileSettings() {
  const { user } = useAuth();
  const router = useRouter();

  // Profile fields
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  // Organization fields
  const [orgName, setOrgName] = useState("");
  const [orgDescription, setOrgDescription] = useState("");

  const [loading, setLoading] = useState(false);
  const [accountType, setAccountType] = useState<"user" | "organization" | null>(null);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    if (user) {
      setAccountType(user.account_type);
      if (user.account_type === "user") {
        setFirstName(user.first_name ?? "");
        setLastName(user.last_name ?? "");
      } else if (user.account_type === "organization") {
        setOrgName(user.first_name ?? "");
        setOrgDescription(user.last_name ?? "");
      }
    }
  }, [user]);

  const handleSave = async () => {
    setLoading(true);
    let error = null;

    if (accountType === "user") {
      if (!firstName.trim() || !lastName.trim()) {
        console.log("Validation Error: First and last name required.");
        setLoading(false);
        return;
      }
      const { error: updateError } = await supabase
        .from("profiles")
        .update({
          first_name: firstName.trim(),
          last_name: lastName.trim(),
        })
        .eq("id", user?.id);
      error = updateError;
    } else if (accountType === "organization") {
      if (!orgName.trim()) {
        console.log("Validation Error: Organization name required.");
        setLoading(false);
        return;
      }
      const { error: updateError } = await supabase
        .from("organizations")
        .update({
          name: orgName.trim(),
          description: orgDescription.trim(),
        })
        .eq("id", user?.id);
      error = updateError;
    }

    setLoading(false);

    if (error) {
      console.log("Error updating profile:", error.message);
    } else {
      console.log("Profile updated successfully.");
      setEditMode(false);
    }
  };

  return (
    <View className="flex-1 px-6 py-10">
      <Text className="text-2xl font-bold mb-6">Profile</Text>
      <Text className="text-sm font-semibold mb-1">Account Type</Text>
      <View className="mb-4">
        <Text className="px-4 py-2 rounded-full bg-gray-100 text-gray-700">
          {accountType === "user" ? "User" : "Organization"}
        </Text>
      </View>

      {accountType === "user" ? (
        <>
          <Text className="text-sm font-semibold mb-1">First Name</Text>
          {editMode ? (
            <TextInput
              className="border border-gray-300 rounded px-4 py-2 mb-4"
              value={firstName}
              onChangeText={setFirstName}
              placeholder="First Name"
            />
          ) : (
            <Text className="mb-4 px-4 py-2 bg-gray-100 rounded">{firstName}</Text>
          )}
          <Text className="text-sm font-semibold mb-1">Last Name</Text>
          {editMode ? (
            <TextInput
              className="border border-gray-300 rounded px-4 py-2 mb-4"
              value={lastName}
              onChangeText={setLastName}
              placeholder="Last Name"
            />
          ) : (
            <Text className="mb-4 px-4 py-2 bg-gray-100 rounded">{lastName}</Text>
          )}
        </>
      ) : (
        <>
          <Text className="text-sm font-semibold mb-1">Organization Name</Text>
          {editMode ? (
            <TextInput
              className="border border-gray-300 rounded px-4 py-2 mb-4"
              value={orgName}
              onChangeText={setOrgName}
              placeholder="Organization Name"
            />
          ) : (
            <Text className="mb-4 px-4 py-2 bg-gray-100 rounded">{orgName}</Text>
          )}
          <Text className="text-sm font-semibold mb-1">Description</Text>
          {editMode ? (
            <TextInput
              className="border border-gray-300 rounded px-4 py-2 mb-4"
              value={orgDescription}
              onChangeText={setOrgDescription}
              placeholder="Description"
              multiline
            />
          ) : (
            <Text className="mb-4 px-4 py-2 bg-gray-100 rounded">{orgDescription}</Text>
          )}
        </>
      )}

      {editMode ? (
        <TouchableOpacity
          onPress={handleSave}
          disabled={loading}
          className="bg-kiku-dark-green px-6 py-3 rounded mb-2"
        >
          <Text className="text-white font-semibold text-center">
            {loading ? "Saving..." : "Save Changes"}
          </Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          onPress={() => setEditMode(true)}
          className="bg-kiku-light-green px-6 py-3 rounded"
        >
          <Text className="text-white font-semibold text-center">Edit</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}
