import { gql } from "@apollo/client";
import { format } from "date-fns";
import { Workout, WorkoutExercise } from "types/types";

let currWorkoutId = 0;
let currExerciseId = 0;

let workouts: Workout[] = [
  {
    id: "dasdada",
    date: "02.02.2021",
    updated_at: null,
    exercises: [
      {
        id: "dsdddddddd",
        order: 1,
        type: "push-up",
        sets: [
          {
            order: 1,
            reps: 12,
            weight: 0,
          },
        ],
      },
    ],
  },
];

export const resolvers = {
  Query: {
    workouts: (obj, args, context, info) => {
      console.log("workouts called");
      return workouts;
    },
    workout: (obj, args, context, info) => {
      const workout = workouts.find((item: Workout) => item.id === args.id);
      return workout;
    },
  },
  Workout: {
    id: (obj: unknown) => (obj as { id: string }).id,
    date: (obj: unknown) => (obj as { date: string }).date,
    exercises: (obj: unknown) =>
      (obj as { exercises: WorkoutExercise[] }).exercises,
    exerciseCount: (obj: unknown) =>
      (obj as { exercises: WorkoutExercise[] }).exercises.length,
  },
  Exercise: {
    id: (obj: unknown) => (obj as { id: string }).id,
  },
  Mutation: {
    saveWorkout: (_, { workout }: { workout: Workout }) => {
      console.log("Saving workout", workout);
      workout.id = (++currWorkoutId).toString();
      workout.date = format(new Date(), "dd.MM.yyyy");
      workout.exercises.forEach((exercise: WorkoutExercise) => {
        exercise.id = (++currExerciseId).toString();
      });
      workouts.push(workout);
      return workout;
    },
    updateWorkout: (
      parent: any,
      args: { workout: Workout },
      context: any,
      info: any
    ) => {
      const updated = args.workout;
      console.log("Updating workout", updated);
      updated.updated_at = format(new Date(), "dd.MM.yyyy HH:mm:ss");
      workouts = workouts.map((item: Workout) =>
        item.id !== updated.id ? item : updated
      );
      return updated;
    },
    deleteWorkout: (_, { id }: { id: string }) => {
      workouts = workouts.filter((item: Workout) => item.id !== id);
      console.log("ID: ", id);
      return id;
    },
  },
};
