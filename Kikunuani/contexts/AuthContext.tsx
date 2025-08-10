import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Session } from '@supabase/supabase-js'
import { router } from "expo-router";

type UserType = {
  id: string;
  email: string;
  account_type: "user" | "organization" | null;
  first_name: string | null;
  last_name: string | null;
  onboarding_complete: boolean | null;
};

type AuthContextType = {
  user: UserType | null;
  setUser: React.Dispatch<React.SetStateAction<UserType | null>>;
  refreshUser: () => Promise<void>;
  isLoading: boolean;
  session: Session | null;
};

const AuthContext = createContext<AuthContextType>({ user: null, setUser: () => {}, refreshUser: async () => {},isLoading: true, session: null});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<UserType | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchUserProfile = async () => {
    const { data: sessionData } = await supabase.auth.getSession();
    const session = sessionData.session;
    setSession(session);
    if (session?.user) {
      const { data: profile, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", session.user.id)
        .single();

      if (!error && profile) {
        setUser({
          id: session.user.id,
          email: session.user.email ?? "",
          account_type: profile.account_type,
          first_name: profile.first_name ?? null,
          last_name: profile.last_name ?? null,
          onboarding_complete: profile.onboarding_complete ?? null,
        });
      } else {
        setUser({
          id: session.user.id,
          email: session.user.email ?? "",
          account_type: null,
          first_name: null,
          last_name: null,
          onboarding_complete: null,
        });
      }
    }
    setIsLoading(false);
  };

  useEffect(() => {
    const init = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        setSession(session);
        await refreshUser(); // fetch from profiles/orgs
      }
      setIsLoading(false);
    };

    init();

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) {
        console.log("User signed out");
        setUser(null);
      } else {
        setSession(session);
        refreshUser();
      }
    });

    return () => {
      listener?.subscription.unsubscribe();
    };
  }, []);

  const refreshUser = async () => {
    const { data: sessionData } = await supabase.auth.getSession();
    const session = sessionData.session;
    setSession(session);
    console.log("Refreshing user session:", session);

    if (!session?.user) {
      router.replace("/auth/login");
      return;
    }

    const userId = session.user.id;
    const email = session.user.email ?? "";

    // Try fetching from `profiles` first (individual)
    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", userId)
      .single();

    if (!profileError && profile) {
      console.log("Loaded profile for user.");
      setUser({
        id: userId,
        email,
        account_type: "user",
        first_name: profile.first_name ?? null,
        last_name: profile.last_name ?? null,
        onboarding_complete: profile.onboarding_complete ?? null,
      });
      return;
    }

    // Try fetching from `organizations` if no profile was found
    const { data: org, error: orgError } = await supabase
      .from("organizations")
      .select("*")
      .eq("id", userId)
      .single();

    if (!orgError && org) {
      console.log("Loaded organization for user: ", org.name);
      console.log("Org: ", org);
      setUser({
        id: userId,
        email,
        account_type: "organization",
        first_name: org.name ?? null,
        last_name: org.description ?? null,
        onboarding_complete: org.onboarding_complete, // or use a new `onboarding_complete` field if you add it to orgs
      });
      console.log("User set with organization data:", {
        id: userId,
        email,
        account_type: "organization",
        first_name: org.name ?? null,
        last_name: org.description ?? null,
        onboarding_complete: org.onboarding_complete,
      });
      return;
    }

    // If neither found, fallback
    console.log("No profile or organization found for user.");
    setUser((prev) => {
      if (!prev) {
        // No previous user state — fallback to null defaults
        return {
          id: userId,
          email,
          account_type: null,
          first_name: null,
          last_name: null,
          onboarding_complete: null,
        };
      }

      // Use previous state, only update id/email
      return {
        ...prev,
        id: userId,
        email,
      };
    });
  };


  return (
    <AuthContext.Provider value={{ user, refreshUser, isLoading, session, setUser}}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
