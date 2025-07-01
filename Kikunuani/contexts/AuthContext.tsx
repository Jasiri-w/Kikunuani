import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type UserType = {
  id: string;
  email: string;
  account_type: "user" | "organization" | null;
};

type AuthContextType = {
  user: UserType | null;
  isLoading: boolean;
};

const AuthContext = createContext<AuthContextType>({ user: null, isLoading: true });

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<UserType | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchUserProfile = async () => {
    const { data: sessionData } = await supabase.auth.getSession();
    const session = sessionData.session;
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
        });
      } else {
        setUser({
          id: session.user.id,
          email: session.user.email ?? "",
          account_type: null,
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

  return (
    <AuthContext.Provider value={{ user, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
