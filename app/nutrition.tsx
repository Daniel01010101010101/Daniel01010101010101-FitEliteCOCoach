import { Text } from "react-native";
import { router } from "expo-router";
import { Screen } from "@/src/components/layout/Screen";
import { AppCard } from "@/src/components/ui/AppCard";
import { AppButton } from "@/src/components/ui/AppButton";
import { KpiCard } from "@/src/components/ui/KpiCard";
import { NavBar } from "@/src/components/navigation/NavBar";
import { Theme } from "@/src/theme/theme";
import { useUserProfile } from "@/src/hooks/useUserProfile";
import { estimateNutrition } from "@/src/utils/nutritionCalculator";

export default function NutritionScreen() {
  const { profile } = useUserProfile();

  if (!profile) {
    return <Screen><Text style={Theme.text.h1}>Nutrición</Text><AppButton title="Configurar mi perfil" onPress={() => router.push("/profile-setup")} /></Screen>;
  }

  const n = estimateNutrition(profile);

  return (
    <Screen>
      <Text style={Theme.text.h1}>Nutrición</Text>
      <Text style={Theme.text.subtitle}>Estimación general basada en tu perfil. No reemplaza médico ni nutricionista.</Text>
      <NavBar />
      <KpiCard label="Calorías estimadas" value={`${n.calories} kcal`} />
      <AppCard title="Macronutrientes">
        <Text style={Theme.text.body}>Proteína: {n.protein} g | Carbohidratos: {n.carbs} g | Grasas: {n.fats} g | Agua: {n.water} ml</Text>
      </AppCard>
      <AppCard title="Comidas sugeridas">
        {n.meals.map((meal) => <Text key={meal} style={Theme.text.body}>• {meal}</Text>)}
      </AppCard>
      <AppCard title="Lista de mercado">
        <Text style={Theme.text.body}>{n.market.join(", ")}</Text>
      </AppCard>
    </Screen>
  );
}
