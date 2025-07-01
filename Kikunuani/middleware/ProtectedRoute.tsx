import { useEffect } from "react";
import { useRouter } from "expo-router";
import { useAuth } from "@/contexts/AuthContext";
import { View, ActivityIndicator } from "react-native";

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading) {
      if (!user) {
        router.replace("/auth/login");
      } else if (!user.account_type) {
        router.replace("/onboarding/account-type");
      }
    }
  }, [user, isLoading]);

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator size="large" color="#154403" />
      </View>
    );
  }

  return <>{children}</>;
}
