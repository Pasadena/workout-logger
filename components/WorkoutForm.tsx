import React from "react";
import styled from "styled-components";
import { FiPlusCircle } from "react-icons/fi";
import { format } from "date-fns";
import { Workout, WorkoutExercise } from "types/types";
import Link from "components/Link";
import { Button, PrimaryButton } from "components/Button";
import Exercise from "pages/create/Exercise";

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

const AddContainer = styled.div`
  display: flex;
  padding: 0.5rem;
  align-items: center;
`;

const AddIcon = styled(FiPlusCircle)`
  width: 50px;
  height: 50px;
  color: green;
  animation: color 0.2s ease-in;
  &:hover {
    color: darkgreen;
  }
  margin-right: 2rem;
`;

const AddTitle = styled.div`
  font-size: 1.2rem;
  font-weight: 500;
`;

interface Props {
  workout: Workout;
  onAddExercise: () => void;
  onExerciseModified: (exercise: WorkoutExercise) => void;
  onSave: (workout: Workout) => void;
}

const ExerciseForm = ({
  workout,
  onAddExercise,
  onExerciseModified,
  onSave,
}: Props) => {
  return (
    <Container>
      <Title>Workout {workout.date || format(new Date(), "dd.MM.yyyy")}</Title>
      <Actions>
        <Link href="/" label="Back" />
        <PrimaryButton
          onClick={() => onSave(workout)}
          label={!!workout.id ? "Update" : "Create"}
        />
      </Actions>
      <Exercises>
        {workout.exercises.map((exercise: WorkoutExercise, index: number) => (
          <Exercise
            key={`exercise-${exercise.id}-${index}`}
            exercise={exercise}
            onExerciseModified={onExerciseModified}
            order={index + 1}
          />
        ))}
      </Exercises>
      <AddContainer>
        <AddIcon onClick={onAddExercise} />
        <AddTitle>New exercise</AddTitle>
      </AddContainer>
    </Container>
  );
};

export default ExerciseForm;
