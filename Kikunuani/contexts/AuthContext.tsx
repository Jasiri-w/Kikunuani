import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Session } from '@supabase/supabase-js'

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
    fetchUserProfile();

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) {
        setUser(null);
      } else {
        fetchUserProfile();
      }
    });

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  const refreshUser = async () => {
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
      }
    }
  };


  return (
    <AuthContext.Provider value={{ user, refreshUser, isLoading, session, setUser}}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
