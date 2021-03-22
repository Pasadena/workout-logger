import React from "react";
import styled from "styled-components";
import { ApolloCache, gql, useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import { format } from "date-fns";

import { AddWorkoutMutation } from "apollo/queries";
import WorkoutForm from "components/WorkoutForm";
import Exercise from "pages/create/Exercise";
import { Workout, WorkoutExercise, WorkoutSet } from "types/types";
import { PrimaryButton, Button } from "components/Button";
import Link from "components/Link";

const Container = styled.div`
  padding: 2rem;
  display: flex;
  flex-direction: column;

  > * {
    margin-top: 0.5rem;
    margin-bottom: 0.5rem;
  }
`;

const Title = styled.header`
  font-size: 1.5rem;
`;

const Exercises = styled.div`
  > * {
    box-sizing: border-box;
    margin-top: 0.25rem;
    margin-bottom: 0.25rem;
  }
`;

const Actions = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

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
  /**const activateSet = React.useCallback(() => {
    exercises.push({
      type: "",
      sets: [
        {
          order: 1,
          reps: 0,
          weight: 0,
        },
      ],
    });
    setExercises([...exercises]);
  }, [exercises, setExercises]);
  const addSet = React.useCallback(
    (exercise: WorkoutExercise) => {
      const updatedExercises = exercises.map((item) => {
        if (item.type !== exercise)
        const maxOrder = Math.max(
          ...exercise.sets.map((set: WorkoutSet) => set.order)
        );
        item.type === exercise.type
          ? { ...item, sets: item.sets.concat({ reps: 0, weight: 0 }) }
          : item
      }
        
      );
      setExercises([...updatedExercises]);
    },
    [exercises, setExercises]
  );
  return (
    <Container>
      <Title>Workout {format(new Date(), "dd.MM.yyyy")}</Title>
      <Actions>
        <Link href="/" label="Back" />
        <PrimaryButton onClick={saveWorkout} label="Save" />
      </Actions>
      <Button onClick={activateSet} label="New exercise" />
      <Exercises>
        {exercises.map((exercise: WorkoutExercise, index: number) => (
          <Exercise
            exercise={exercise}
            onAddSetPressed={addSet}
            order={index + 1}
          />
        ))}
      </Exercises>
    </Container>
  );**/

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
