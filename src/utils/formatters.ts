import { FitnessGoal, FitnessLevel, Sex } from "@/src/models/user";

export function goalLabel(goal?: FitnessGoal) {
  const labels: Record<FitnessGoal, string> = {
    gain_muscle: "Ganar músculo",
    lose_fat: "Perder grasa",
    maintain: "Mantener",
    strength: "Fuerza",
    endurance: "Resistencia"
  };
  return goal ? labels[goal] : "Sin objetivo";
}

export function levelLabel(level?: FitnessLevel) {
  const labels: Record<FitnessLevel, string> = {
    beginner: "Principiante",
    intermediate: "Intermedio",
    advanced: "Avanzado"
  };
  return level ? labels[level] : "Sin nivel";
}

export function sexLabel(sex?: Sex) {
  const labels: Record<Sex, string> = {
    male: "Masculino",
    female: "Femenino",
    other: "Otro"
  };
  return sex ? labels[sex] : "No definido";
}
