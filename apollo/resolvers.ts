import { Workout, WorkoutExercise } from "types/types";

import { request, post, deleteRequest } from "core/request";

export const resolvers = {
  Query: {
    workouts: async () => {
      console.log("workouts called");
      return request("workouts", "GET");
    },
    workout: async (_, { id }: { id: string }) => {
      return request(`workouts/${id}`, "GET");
    },
    exerciseTypes: () => {
      return request("exercisetypes", "GET");
    },
    searchExerciseTypes: (_, args: { partialName: string }) => {
      return request(`exercisetypes/${args.partialName}`, "GET");
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
      return post("workouts", workout);
    },
    updateWorkout: async (_: any, args: { workout: Workout }) => {
      const payload = args.workout;
      console.log("Updating workout", payload);
      return request(`workouts/${payload.id}`, "PUT", payload);
    },
    deleteWorkout: async (_, { id }: { id: string }) => {
      console.log("Deleting workout", id);
      return request(`workouts/${id}`, "DELETE");
    },
    saveExerciseType: (_, args: { name: string }) => {
      console.log("Saving exercise type", args.name);
      return post("exercisetypes/", {
        name: args.name,
      });
    },
    deleteExerciseType: (_, { id }: { id: string }) => {
      return deleteRequest(`exercisetypes/${id}`);
    },
  },
};
