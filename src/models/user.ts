export type FitnessGoal = "gain_muscle" | "lose_fat" | "maintain" | "strength" | "endurance";
export type FitnessLevel = "beginner" | "intermediate" | "advanced";
export type Sex = "male" | "female" | "other";

export type UserProfile = {
  id?: string;
  name: string;
  age: number;
  weight_kg: number;
  height_cm: number;
  sex: Sex;
  fitness_level: FitnessLevel;
  goal: FitnessGoal;
  available_days: number;
  injuries: string[];
  experience: string;
  equipment: string[];
  dietary_restrictions: string[];
  is_premium?: boolean;
};
