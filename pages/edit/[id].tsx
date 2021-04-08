import React from "react";
import { useMutation, useQuery } from "@apollo/client";
import { useRouter } from "next/router";

import { UpdateWorkoutMutation, WorkoutQuery } from "apollo/queries";
import WorkoutForm from "components/WorkoutForm";
import { Workout } from "types/types";
import { useCurrentWorkoutState } from "state/currentWorkout";

export default function EditWorkout() {
  const [edtableWorkout, setEditableWorkout] = useCurrentWorkoutState();
  const router = useRouter();
  const { id } = router.query;
  const { loading, error } = useQuery<{ workout: Workout }>(WorkoutQuery, {
    variables: { id },
    skip: !id,
    onCompleted: (data) => setEditableWorkout(data.workout),
  });
  const [updateWorkout, { data: updatedWorkout }] = useMutation<Workout>(
    UpdateWorkoutMutation
  );
  React.useEffect(() => {
    if (updatedWorkout) {
      router.push("/");
    }
  }, [updatedWorkout]);

  if (error) {
    return <div>Error</div>;
  }

  if (loading || !edtableWorkout) {
    return <div>Loading...</div>;
  }

  return (
    <WorkoutForm
      workout={edtableWorkout}
      onSave={(workout: Workout) =>
        updateWorkout({ variables: { workout: edtableWorkout } })
      }
    />
  );
}
