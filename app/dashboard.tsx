import { Text, View } from "react-native";
import { router } from "expo-router";
import { Screen } from "@/src/components/layout/Screen";
import { AppButton } from "@/src/components/ui/AppButton";
import { AppCard } from "@/src/components/ui/AppCard";
import { KpiCard } from "@/src/components/ui/KpiCard";
import { NavBar } from "@/src/components/navigation/NavBar";
import { Theme } from "@/src/theme/theme";
import { useUserProfile } from "@/src/hooks/useUserProfile";
import { estimateNutrition } from "@/src/utils/nutritionCalculator";
import { goalLabel, levelLabel } from "@/src/utils/formatters";

export default function DashboardScreen() {
  const { profile, loading } = useUserProfile();

  if (loading) {
    return <Screen><Text style={Theme.text.h2}>Cargando...</Text></Screen>;
  }

  if (!profile) {
    return (
      <Screen>
        <Text style={Theme.text.h1}>Bienvenido</Text>
        <Text style={Theme.text.subtitle}>Completa tus datos para generar tu plan real.</Text>
        <AppButton title="Configurar mi perfil" onPress={() => router.push("/profile-setup")} />
      </Screen>
    );
  }

  const nutrition = estimateNutrition(profile);

  return (
    <Screen>
      <Text style={Theme.text.h1}>FitEliteCO Coach</Text>
      <Text style={Theme.text.subtitle}>Plan personalizado para {profile.name}. Objetivo: {goalLabel(profile.goal)}.</Text>
      <NavBar />
      <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 12, marginTop: 18 }}>
        <KpiCard label="Calorías" value={`${nutrition.calories} kcal`} />
        <KpiCard label="Proteína" value={`${nutrition.protein} g`} />
        <KpiCard label="Días" value={`${profile.available_days}/sem`} />
        <KpiCard label="Nivel" value={levelLabel(profile.fitness_level)} />
      </View>
      <AppCard title="Resumen profesional" subtitle="Este plan se ajusta a tus datos físicos, nivel, días disponibles y objetivo.">
        <Text style={Theme.text.body}>Peso: {profile.weight_kg} kg | Estatura: {profile.height_cm} cm | Experiencia: {profile.experience || "No indicada"}</Text>
        <Text style={{ ...Theme.text.body, marginTop: 8 }}>La app no reemplaza la valoración de un médico, nutricionista o profesional de salud.</Text>
      </AppCard>
    </Screen>
  );
}
