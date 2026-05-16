import { Text } from "react-native";
import { router } from "expo-router";
import { Screen } from "@/src/components/layout/Screen";
import { AppCard } from "@/src/components/ui/AppCard";
import { AppButton } from "@/src/components/ui/AppButton";
import { NavBar } from "@/src/components/navigation/NavBar";
import { Theme } from "@/src/theme/theme";
import { useAuth } from "@/src/hooks/useAuth";
import { useUserProfile } from "@/src/hooks/useUserProfile";
import { generateWeeklyWorkoutPlan } from "@/src/utils/workoutGenerator";

export default function WorkoutsScreen() {
  const { session, loading: authLoading } = useAuth();
  const { profile } = useUserProfile();
  if (authLoading) return <Screen><Text style={Theme.text.h2}>Cargando...</Text></Screen>;
  if (!session) {
    router.replace("/login");
    return <Screen><Text style={Theme.text.h2}>Redirigiendo al inicio de sesión...</Text></Screen>;
  }
  if (!profile) return <Screen><Text style={Theme.text.h1}>Entrenamiento</Text><AppButton title="Configurar mi perfil" onPress={() => router.push("/profile-setup")} /></Screen>;
  const plan = generateWeeklyWorkoutPlan(profile);
  return (
    <Screen>
      <Text style={Theme.text.h1}>Plan semanal</Text>
      <Text style={Theme.text.subtitle}>Rutina generada según tus datos reales.</Text>
      <NavBar />
      {plan.map((day) => (
        <AppCard key={day.day} title={day.title} subtitle={`${day.muscleGroup} | Dificultad: ${day.difficulty}`}>
          <Text style={Theme.text.body}>Calentamiento: {day.warmup}</Text>
          {day.exercises.map((ex) => (
            <Text key={ex.name} style={{ ...Theme.text.body, marginTop: 10 }}>
              • {ex.name}: {ex.sets} series x {ex.reps}, descanso {ex.rest}. Técnica: {ex.technique}
            </Text>
          ))}
          <Text style={{ ...Theme.text.body, marginTop: 10 }}>Estiramiento: {day.stretching}</Text>
        </AppCard>
      ))}
    </Screen>
  );
}
