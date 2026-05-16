import { useCallback, useEffect, useState } from "react";
import { UserProfile } from "@/src/models/user";
import { profileService } from "@/src/services/profileService";
import { useAuth } from "@/src/hooks/useAuth";

export function useUserProfile() {
  const { session } = useAuth();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    setLoading(true);
    const userId = session?.user?.id;
    const data = await profileService.getProfile(userId);
    setProfile(data);
    setLoading(false);
  }, [session?.user?.id]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const save = async (nextProfile: UserProfile) => {
    const userId = session?.user?.id;
    await profileService.upsertProfile(nextProfile, userId);
    setProfile(nextProfile);
  };

  return { profile, loading, refresh, save };
}
