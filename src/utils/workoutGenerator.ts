import { UserProfile } from "@/src/models/user";
import { WorkoutDay } from "@/src/models/workout";

const exerciseBank = {
  push: [
    ["Press de pecho", "Mantén escápulas retraídas y controla la bajada."],
    ["Press militar", "No arquees la espalda; abdomen firme."],
    ["Fondos o flexiones", "Codos a 45 grados y rango cómodo."],
    ["Elevaciones laterales", "Sube controlado sin balanceo."]
  ],
  pull: [
    ["Remo con mancuerna/banda", "Jala con el codo, no con la mano."],
    ["Jalón al pecho o dominada asistida", "Pecho arriba y hombros abajo."],
    ["Face pull", "Lleva la cuerda a la cara y abre codos."],
    ["Curl bíceps", "Evita balancear el tronco."]
  ],
  legs: [
    ["Sentadilla", "Rodillas alineadas y torso firme."],
    ["Peso muerto rumano", "Bisagra de cadera, espalda neutral."],
    ["Zancadas", "Paso estable y control de rodilla."],
    ["Elevación de gemelos", "Pausa arriba y baja lento."]
  ],
  full: [
    ["Sentadilla goblet", "Control total del tronco."],
    ["Remo", "Espalda activa y cuello relajado."],
    ["Flexiones", "Cuerpo en línea recta."],
    ["Plancha", "Glúteos y abdomen activos."]
  ],
  endurance: [
    ["Circuito funcional", "Mantén ritmo sostenible."],
    ["Burpees adaptados", "Prioriza técnica sobre velocidad."],
    ["Mountain climbers", "Cadera estable."],
    ["Farmer walk", "Hombros atrás y pasos firmes."]
  ]
};

function prescription(profile: UserProfile) {
  if (profile.fitness_level === "beginner") return { sets: 3, reps: "10-12", rest: "75-90 s", difficulty: "Base técnica" };
  if (profile.fitness_level === "advanced") return { sets: 4, reps: profile.goal === "strength" ? "4-6" : "8-12", rest: "90-150 s", difficulty: "Alta" };
  return { sets: 4, reps: profile.goal === "strength" ? "6-8" : "8-12", rest: "75-120 s", difficulty: "Media" };
}

export function generateWeeklyWorkoutPlan(profile: UserProfile): WorkoutDay[] {
  const days = Math.max(2, Math.min(profile.available_days || 3, 6));
  const p = prescription(profile);
  const split =
    profile.goal === "endurance"
      ? ["endurance", "full", "endurance", "legs", "full", "endurance"]
      : days <= 3
        ? ["full", "legs", "full", "push", "pull", "legs"]
        : ["push", "pull", "legs", "full", "push", "pull"];

  return Array.from({ length: days }).map((_, index) => {
    const key = split[index] as keyof typeof exerciseBank;
    const bank = exerciseBank[key];

    return {
      day: index + 1,
      title: `Día ${index + 1}: ${key === "push" ? "Empuje" : key === "pull" ? "Jalón" : key === "legs" ? "Pierna" : key === "endurance" ? "Resistencia" : "Full body"}`,
      muscleGroup: key === "push" ? "Pecho, hombro y tríceps" : key === "pull" ? "Espalda y bíceps" : key === "legs" ? "Pierna y glúteo" : key === "endurance" ? "Cardio funcional" : "Cuerpo completo",
      difficulty: p.difficulty,
      warmup: "8-10 minutos: movilidad articular, activación de core y 2 series progresivas del primer ejercicio.",
      stretching: "5-8 minutos: respiración, estiramiento suave de músculos trabajados y movilidad de cadera/torácica.",
      exercises: bank.map(([name, technique]) => ({
        name,
        sets: p.sets,
        reps: p.reps,
        rest: p.rest,
        technique
      }))
    };
  });
}
