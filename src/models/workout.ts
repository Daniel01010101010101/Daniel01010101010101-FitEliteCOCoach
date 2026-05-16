export type WorkoutExercise = {
  name: string;
  sets: number;
  reps: string;
  rest: string;
  technique: string;
};

export type WorkoutDay = {
  day: number;
  title: string;
  muscleGroup: string;
  difficulty: string;
  warmup: string;
  stretching: string;
  exercises: WorkoutExercise[];
};
