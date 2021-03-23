import React from "react";
import { ApolloCache, gql, useMutation } from "@apollo/client";
import { useRouter } from "next/router";

import { AddWorkoutMutation } from "apollo/queries";
import WorkoutForm from "components/WorkoutForm";
import { Workout, WorkoutExercise } from "types/types";

const updateWorkoutCache = (cache: ApolloCache<Workout>, result) => {
  cache.modify({
    fields: {
      workouts(existingWorkouts: []) {
        const newWorkoutRef = cache.writeFragment({
          data: result.data.saveWorkout,
          fragment: gql`
            fragment NewWorkout on Workout {
              id
              date
            }
          `,
        });
        return [...existingWorkouts, newWorkoutRef];
      },
    },
  });
};

export default function CreateWorkout() {
  const router = useRouter();
  const [workout, setWorkout] = React.useState<Workout>({
    exercises: [
      { type: "", order: 1, sets: [{ order: 1, reps: 0, weight: 0 }] },
    ],
  });

  const [addWorkout, { data: addWorkoutResponse }] = useMutation<Workout>(
    AddWorkoutMutation,
    {
      update: updateWorkoutCache,
    }
  );

  React.useEffect(() => {
    if (addWorkoutResponse) {
      router.push("/");
    }
  }, [addWorkoutResponse]);

  const saveWorkout = React.useCallback(() => {
    addWorkout({ variables: { workout } });
  }, [workout]);

  const addExercise = React.useCallback(() => {
    const maxOrder = Math.max(
      ...workout.exercises.map((item: WorkoutExercise) => item.order)
    );
    const withNewExercise = workout.exercises.concat([
      {
        type: "",
        order: maxOrder + 1,
        sets: [
          {
            order: 1,
            reps: 0,
            weight: 0,
          },
        ],
      },
    ]);
    setWorkout({ ...workout, exercises: withNewExercise });
  }, [workout, setWorkout]);

  const exerciseModified = React.useCallback(
    (exercise: WorkoutExercise) => {
      const updatedExercises = workout.exercises.map(
        (item: WorkoutExercise) => {
          return item.order === exercise.order ? exercise : item;
        }
      );
      setWorkout({ ...workout, exercises: updatedExercises });
    },
    [workout, setWorkout]
  );

  return (
    <WorkoutForm
      workout={workout}
      onAddExercise={addExercise}
      onExerciseModified={exerciseModified}
      onSave={(workout: Workout) => saveWorkout()}
    />
  );
}
