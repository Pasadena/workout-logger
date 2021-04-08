import React from "react";
import { ApolloCache, FetchResult, gql, useMutation } from "@apollo/client";
import { useRouter } from "next/router";

import { AddWorkoutMutation } from "apollo/queries";
import WorkoutForm from "components/WorkoutForm";
import { Workout } from "types/types";
import { appendToCache } from "apollo/cache";
import { useCurrentWorkout } from "state/currentWorkout";

export default function CreateWorkout() {
  const router = useRouter();
  const workout = useCurrentWorkout();

  const [addWorkout, { data: addWorkoutResponse }] = useMutation<{
    saveWorkout: Workout;
  }>(AddWorkoutMutation, {
    update: (
      cache: ApolloCache<{ saveWorkout: Workout }>,
      result: FetchResult<{ saveWorkout: Workout }>
    ) =>
      appendToCache(
        cache,
        "workouts",
        result.data.saveWorkout,
        gql`
          fragment NewWorkout on Workout {
            id
            date
          }
        `
      ),
  });

  React.useEffect(() => {
    if (addWorkoutResponse) {
      router.push("/");
    }
  }, [addWorkoutResponse]);

  const saveWorkout = React.useCallback(() => {
    addWorkout({ variables: { workout } });
  }, [workout]);

  return (
    <WorkoutForm
      workout={workout}
      onSave={(workout: Workout) => saveWorkout()}
    />
  );
}
