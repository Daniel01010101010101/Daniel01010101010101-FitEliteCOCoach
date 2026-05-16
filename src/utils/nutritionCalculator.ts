import { UserProfile } from "@/src/models/user";

export function estimateNutrition(profile: UserProfile) {
  const base =
    profile.sex === "female"
      ? 10 * profile.weight_kg + 6.25 * profile.height_cm - 5 * profile.age - 161
      : 10 * profile.weight_kg + 6.25 * profile.height_cm - 5 * profile.age + 5;

  const activity = profile.fitness_level === "advanced" ? 1.65 : profile.fitness_level === "intermediate" ? 1.5 : 1.35;
  let calories = Math.round(base * activity);

  if (profile.goal === "lose_fat") calories -= 350;
  if (profile.goal === "gain_muscle") calories += 300;
  if (profile.goal === "endurance") calories += 150;

  const protein = Math.round(profile.weight_kg * (profile.goal === "gain_muscle" || profile.goal === "strength" ? 2.0 : 1.7));
  const fats = Math.round((calories * 0.25) / 9);
  const carbs = Math.round((calories - protein * 4 - fats * 9) / 4);
  const water = Math.round(profile.weight_kg * 35);

  return {
    calories,
    protein,
    carbs,
    fats,
    water,
    meals: [
      "Desayuno: huevos o yogur griego, avena y fruta.",
      "Almuerzo: proteína magra, arroz/papa y ensalada.",
      "Pre-entreno: banano, bocadillo o pan con mermelada.",
      "Cena: pescado/pollo/tofu con verduras y carbohidrato controlado."
    ],
    market: ["Huevos", "Pollo", "Arroz", "Avena", "Frutas", "Verduras", "Yogur griego", "Aguacate", "Atún", "Frutos secos"]
  };
}
