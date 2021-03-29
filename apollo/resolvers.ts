import { format } from "date-fns";
import { ExerciseType, Workout, WorkoutExercise } from "types/types";

let currWorkoutId = 0;
let currExerciseId = 0;
let currTypeId = 0;

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

let workouts: Workout[] = [
  {
    id: "dasdada",
    date: "02.02.2021",
    updated_at: null,
    exercises: [
      {
        id: "dsdddddddd",
        order: 1,
        type: types[0],
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
    workouts: async (obj, args, context, info) => {
      console.log("workouts called");
      const response = await fetch("http://localhost:4000/dev/workouts");
      if (response.status !== 200) {
        console.log("Error in workouts", response);
        throw new Error("Cannot fetch workouts!");
      }
      const data = await response.json();
      console.log("Workouts", data);
      return data;
    },
    workout: async (obj, args, context, info) => {
      const response = await fetch(
        `http://localhost:4000/dev/workouts/${args.id}`
      );
      if (response.status !== 200) {
        console.log("Error in workout", response);
        throw new Error(`Cannot fetch workout ${args.id}`);
      }
      const data = await response.json();
      console.log("Workout", data);
      return data;
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
      try {
        console.log("Saving workout", workout);
        const response = await fetch("http://localhost:4000/dev/workouts", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(workout),
        });
        if (response.status !== 201) {
          console.log("Error posting workout", response);
          throw new Error("Cannot create new workout");
        }
        const data = await response.json();
        return data;
      } catch (err) {
        console.log("Err", err);
        throw err;
      }
    },
    updateWorkout: async (parent: any, args: { workout: Workout }) => {
      try {
        const payload = args.workout;
        console.log("Updating workout", payload);
        const response = await fetch(
          `http://localhost:4000/dev/workouts/${payload.id}`,
          {
            method: "PUT",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
          }
        );
        if (response.status !== 200) {
          console.log("Error updating workout", response);
          throw new Error(`Cannot update workout ${payload.id}`);
        }
        const data = await response.json();
        return data;
      } catch (err) {
        console.log("Err", err);
        throw err;
      }
    },
    deleteWorkout: (_, { id }: { id: string }) => {
      workouts = workouts.filter((item: Workout) => item.id !== id);
      console.log("ID: ", id);
      return id;
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
