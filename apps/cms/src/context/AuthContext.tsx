import { createContext, ReactNode, useContext, useEffect, useMemo, useState } from "react";
import type { Session, User } from "@supabase/supabase-js";
import { supabase } from "../lib/supabaseClient";

type AuthContextValue = {
  session: Session | null;
  user: User | null;
  loading: boolean;
  adminEmail: string | null;
  isAuthorized: boolean;
  signIn: (email: string, password: string) => Promise<string | null>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

type AuthProviderProps = {
  children: ReactNode;
};

export function AuthProvider({ children }: AuthProviderProps) {
  const adminEmail = (import.meta.env.VITE_ADMIN_EMAIL as string | undefined)?.trim() || null;
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const init = async () => {
      const { data } = await supabase.auth.getSession();
      if (!isMounted) return;
      setSession(data.session ?? null);
      setUser(data.session?.user ?? null);
      setLoading(false);
    };

    init();

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      if (!isMounted) return;
      setSession(nextSession ?? null);
      setUser(nextSession?.user ?? null);
      setLoading(false);
    });

    return () => {
      isMounted = false;
      authListener.subscription.unsubscribe();
    };
  }, []);

  const isAuthorized = Boolean(
    user && adminEmail && user.email?.toLowerCase() === adminEmail.toLowerCase()
  );

  const value = useMemo<AuthContextValue>(
    () => ({
      session,
      user,
      loading,
      adminEmail,
      isAuthorized,
      signIn: async (email, password) => {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        return error?.message ?? null;
      },
      signOut: async () => {
        await supabase.auth.signOut();
      }
    }),
    [session, user, loading, adminEmail, isAuthorized]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}
