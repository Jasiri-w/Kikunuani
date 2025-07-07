import { useEffect, useRef, useState } from "react";
import { useRouter, usePathname } from "expo-router";
import { useAuth } from "@/contexts/AuthContext";
import { View, ActivityIndicator } from "react-native";

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, isLoading, refreshUser } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const hasRefreshed = useRef(false);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const runAuthChecks = async () => {
      if (isLoading || hasRefreshed.current) return;

      hasRefreshed.current = true;
      await refreshUser();
      setChecking(false);
    };

    runAuthChecks();
  }, [isLoading]);

  useEffect(() => {
    if (isLoading) return;

    if (!user) {
      // Not logged in? Go to login.
      router.replace("/auth/login");
    } else if (!user.onboarding_complete) {
      // Not onboarded? Force onboarding.
      console.log("Onboarding Incomplete | User: ", user);
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
