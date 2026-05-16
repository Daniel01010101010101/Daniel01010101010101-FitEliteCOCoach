import { UserProfile } from "@/src/models/user";
import { supabase, isSupabaseConfigured } from "@/src/services/supabase";

const KEY = "fiteliteco_profile";

export const profileService = {
  async getLocalProfile(): Promise<UserProfile | null> {
    try {
      const raw = globalThis.localStorage?.getItem(KEY);
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  },

  async saveLocalProfile(profile: UserProfile) {
    globalThis.localStorage?.setItem(KEY, JSON.stringify(profile));
  },

  async getProfile(userId?: string): Promise<UserProfile | null> {
    const local = await this.getLocalProfile();
    if (local) return local;

    if (!isSupabaseConfigured || !userId) return null;

    const { data } = await supabase.from("profiles").select("*").eq("id", userId).maybeSingle();
    return data as UserProfile | null;
  },

  async upsertProfile(profile: UserProfile, userId?: string) {
    await this.saveLocalProfile(profile);

    if (!isSupabaseConfigured || !userId) return { data: profile, error: null };

    const payload = { ...profile, id: userId, updated_at: new Date().toISOString() };
    return supabase.from("profiles").upsert(payload).select().single();
  }
};
