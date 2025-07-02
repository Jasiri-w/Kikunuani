import { useEffect } from "react";
import { useRouter, usePathname } from "expo-router";
import { useAuth } from "@/contexts/AuthContext";
import { View, ActivityIndicator } from "react-native";

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (isLoading) return;

    if (!user) {
      // Not logged in? Go to login.
      router.replace("/auth/login");
    } else if (!user.onboarding_complete) {
      // Not onboarded? Force onboarding.
      router.replace("/onboarding/account-type");
    } else if (
      pathname === "/(tabs)/index" && 
      !user.account_type
    ) {
      // Guest trying to access home? Redirect.
      router.replace("/explore");
    }
  }, [user, isLoading, pathname]);

  if (isLoading || !user) {
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator size="large" color="#154403" />
      </View>
    );
  }

  return <>{children}</>;
}
