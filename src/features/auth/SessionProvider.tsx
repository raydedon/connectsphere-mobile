import type { Session } from "@supabase/supabase-js";
import {
  createContext,
  use,
  useEffect,
  useMemo,
  useState,
  type PropsWithChildren,
} from "react";
import { supabase } from "../../lib/supabase";

type AuthResult = { error?: string; needsEmailConfirmation?: boolean };

type SessionContextValue = {
  session: Session | null;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<AuthResult>;
  signUp: (email: string, password: string) => Promise<AuthResult>;
  signOut: () => Promise<void>;
};

const SessionContext = createContext<SessionContextValue | null>(null);

export function useSession() {
  const value = use(SessionContext);
  if (!value) throw new Error("useSession must be used within SessionProvider");
  return value;
}

export function SessionProvider({ children }: PropsWithChildren) {
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    supabase.auth
      .getSession()
      .then(({ data }) => setSession(data.session))
      .finally(() => setIsLoading(false));

    const { data } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      setSession(nextSession);
    });
    return () => data.subscription.unsubscribe();
  }, []);

  const value = useMemo<SessionContextValue>(
    () => ({
      session,
      isLoading,
      async signIn(email, password) {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        return { error: error?.message };
      },
      async signUp(email, password) {
        const { data, error } = await supabase.auth.signUp({ email, password });
        if (error) return { error: error.message };
        return { needsEmailConfirmation: !data.session };
      },
      async signOut() {
        await supabase.auth.signOut();
      },
    }),
    [session, isLoading],
  );

  return <SessionContext value={value}>{children}</SessionContext>;
}
