import { supabase, isSupabaseConfigured } from "@/src/services/supabase";

const notConfigured = {
  data: null,
  error: { message: "Supabase no está configurado. Revisa las variables de entorno en Vercel." }
};

export const authService = {
  async signUp(email: string, password: string) {
    if (!isSupabaseConfigured) return notConfigured;
    return supabase.auth.signUp({ email: email.trim(), password });
  },

  async signIn(email: string, password: string) {
    if (!isSupabaseConfigured) return notConfigured;
    return supabase.auth.signInWithPassword({ email: email.trim(), password });
  },

  async signOut() {
    if (!isSupabaseConfigured) return { error: null };
    return supabase.auth.signOut();
  },

  async resetPassword(email: string) {
    if (!isSupabaseConfigured) return notConfigured;
    return supabase.auth.resetPasswordForEmail(email.trim(), {
      redirectTo: "https://fit-elite-co-coach.vercel.app/reset-password"
    });
  },

  async getSession() {
    if (!isSupabaseConfigured) return { data: { session: null }, error: null };
    return supabase.auth.getSession();
  }
};
