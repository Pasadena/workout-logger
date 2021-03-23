export interface WorkoutSet {
  order: number;
  reps: number;
  weight?: number;
}

export interface WorkoutExercise {
  id?: string;
  order: number;
  type: string;
  sets: WorkoutSet[];
}

export interface Workout {
  id?: string;
  date?: string;
  exercises: WorkoutExercise[];
  exerciseCount?: number;
  updated_at?: string;
}

export interface ExerciseType {
  id?: string;
  name: string;
}
