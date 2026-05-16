import { useEffect, useState } from "react";
import { supabase, isSupabaseConfigured } from "@/src/services/supabase";

export function useAuth() {
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let subscription: any;

    async function init() {
      if (!isSupabaseConfigured) {
        setLoading(false);
        return;
      }

      const { data } = await supabase.auth.getSession();
      setSession(data.session);

      const listener = supabase.auth.onAuthStateChange((_event, newSession) => {
        setSession(newSession);
      });

      subscription = listener.data.subscription;
      setLoading(false);
    }

    init();

    return () => {
      subscription?.unsubscribe?.();
    };
  }, []);

  return { session, loading };
}
