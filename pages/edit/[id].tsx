import React from "react";
import { useMutation, useQuery } from "@apollo/client";
import { useRouter } from "next/router";

import { UpdateWorkoutMutation, WorkoutQuery } from "apollo/queries";
import WorkoutForm from "components/WorkoutForm";
import { Workout, WorkoutExercise } from "types/types";

export default function EditWorkout() {
  const [edtableWorkout, setEditableWorkout] = React.useState(null);
  const router = useRouter();
  const { id } = router.query;
  const { data, loading, error } = useQuery(WorkoutQuery, {
    variables: { id },
    skip: !id,
  });
  const [updateWorkout, { data: updatedWorkout }] = useMutation<Workout>(
    UpdateWorkoutMutation
  );
  React.useEffect(() => {
    if (updatedWorkout) {
      router.push("/");
    }
  }, [updatedWorkout]);

  React.useEffect(() => {
    if (data?.workout) {
      const { workout } = data;
      setEditableWorkout({ ...workout });
    }
  }, [data?.workout]);

  const addExercise = React.useCallback(() => {
    const withNewExercise = edtableWorkout.exercises.concat([
      {
        type: "",
        sets: [
          {
            order: 1,
            reps: 0,
            weight: 0,
          },
        ],
      },
    ]);
    setEditableWorkout({ ...edtableWorkout, exercises: withNewExercise });
  }, [edtableWorkout, setEditableWorkout]);

  const exerciseModified = React.useCallback(
    (exercise: WorkoutExercise) => {
      edtableWorkout.exercises = edtableWorkout.exercises.map(
        (item: WorkoutExercise) => {
          return item.id === exercise.id ? exercise : item;
        }
      );
      setEditableWorkout({ ...edtableWorkout });
    },
    [edtableWorkout, setEditableWorkout]
  );

  if (error) {
    return <div>Error</div>;
  }

  if (loading || !edtableWorkout) {
    return <div>Loading...</div>;
  }

  return (
    <WorkoutForm
      workout={edtableWorkout}
      onAddExercise={addExercise}
      onExerciseModified={exerciseModified}
      onSave={(workout: Workout) =>
        updateWorkout({ variables: { workout: edtableWorkout } })
      }
    />
  );
}
