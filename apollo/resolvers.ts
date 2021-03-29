import { ExerciseType, Workout, WorkoutExercise } from "types/types";

import { request } from "core/request";

let currExerciseId = 0;

let types: ExerciseType[] = [
  {
    id: "111-222",
    name: "Push-up",
  },
  {
    id: "111-333",
    name: "Chin-up",
  },
];

export const resolvers = {
  Query: {
    workouts: async (obj, args, context, info) => {
      console.log("workouts called");
      return request("http://localhost:4000/dev/workouts", "GET");
    },
    workout: async (obj, args, context, info) => {
      return request(`http://localhost:4000/dev/workouts/${args.id}`, "GET");
    },
    exerciseTypes: (obj, args, context, info) => {
      return types;
    },
    searchExerciseTypes: (
      obj,
      args: { partialName: string },
      context,
      info
    ) => {
      return types.filter((type: ExerciseType) =>
        type.name.includes(args.partialName)
      );
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
    saveWorkout: async (_, { workout }: { workout: Workout }) => {
      console.log("Saving workout", workout);
      return request(
        "http://localhost:4000/dev/workouts",
        "POST",
        workout,
        (status: number) => status === 201
      );
    },
    updateWorkout: async (parent: any, args: { workout: Workout }) => {
      const payload = args.workout;
      console.log("Updating workout", payload);
      return request(
        `http://localhost:4000/dev/workouts/${payload.id}`,
        "PUT",
        payload
      );
    },
    deleteWorkout: async (_, { id }: { id: string }) => {
      console.log("Deleting workout", id);
      return request(`http://localhost:4000/dev/workouts/${id}`, "DELETE");
    },
    saveExerciseType: (_, args: { name: string }) => {
      console.log("Creating new type", args.name);
      const newExerciseType = {
        id: (++currExerciseId).toString(),
        name: args.name,
      };
      types.push(newExerciseType);
      return newExerciseType;
    },
  },
};
