import { Text } from "react-native";
import { router } from "expo-router";
import { Screen } from "@/src/components/layout/Screen";
import { AppCard } from "@/src/components/ui/AppCard";
import { AppButton } from "@/src/components/ui/AppButton";
import { NavBar } from "@/src/components/navigation/NavBar";
import { Theme } from "@/src/theme/theme";
import { useAuth } from "@/src/hooks/useAuth";
import { useUserProfile } from "@/src/hooks/useUserProfile";
import { authService } from "@/src/services/authService";
import { goalLabel, levelLabel, sexLabel } from "@/src/utils/formatters";

export default function ProfileScreen() {
  const { session, loading: authLoading } = useAuth();
  const { profile } = useUserProfile();
  if (authLoading) return <Screen><Text style={Theme.text.h2}>Cargando...</Text></Screen>;
  if (!session) {
    router.replace("/login");
    return <Screen><Text style={Theme.text.h2}>Redirigiendo al inicio de sesión...</Text></Screen>;
  }
  const logout = async () => {
    await authService.signOut();
    router.replace("/login");
  };
  return (
    <Screen>
      <Text style={Theme.text.h1}>Perfil</Text>
      <Text style={Theme.text.subtitle}>Administra tus datos y preferencias.</Text>
      <NavBar />
      {!profile ? (
        <AppButton title="Configurar mi perfil" onPress={() => router.push("/profile-setup")} />
      ) : (
        <AppCard title={profile.name} subtitle={`${goalLabel(profile.goal)} | ${levelLabel(profile.fitness_level)}`}>
          <Text style={Theme.text.body}>Edad: {profile.age}</Text>
          <Text style={Theme.text.body}>Peso: {profile.weight_kg} kg</Text>
          <Text style={Theme.text.body}>Estatura: {profile.height_cm} cm</Text>
          <Text style={Theme.text.body}>Sexo: {sexLabel(profile.sex)}</Text>
          <Text style={Theme.text.body}>Días disponibles: {profile.available_days}</Text>
          <AppButton title="Editar perfil" onPress={() => router.push("/profile-setup")} />
        </AppCard>
      )}
      <AppButton title="Cerrar sesión" onPress={logout} variant="secondary" />
    </Screen>
  );
}
