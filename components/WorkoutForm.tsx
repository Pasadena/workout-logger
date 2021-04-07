import React from "react";
import styled from "styled-components";
import { FiPlusCircle, FiCheck } from "react-icons/fi";
import { format } from "date-fns";
import { Workout, WorkoutExercise } from "types/types";
import { BackLink } from "components/Link";
import { IconButton } from "components/Button";
import Exercise from "components/create/Exercise";

const Container = styled.div`
  padding: 1rem;
  display: flex;
  flex-direction: column;

  @media (min-width: 768px) {
    padding: 2rem;
  }

  > * {
    margin-top: 0.5rem;
    margin-bottom: 0.5rem;
  }
`;

const WorkoutTitle = styled.h3`
  margin: 0;
  font-size: 1.5rem;
`;

const Header = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-around;
`;

const Exercises = styled.div`
  > * {
    box-sizing: border-box;
    margin-top: 0.25rem;
    margin-bottom: 0.25rem;
  }
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
      <Header>
        <BackLink href="/" />
        <WorkoutTitle>
          {workout.date || format(new Date(), "dd.MM.yyyy")}
        </WorkoutTitle>
        <IconButton onClick={() => onSave(workout)} icon={() => <FiCheck />} />
      </Header>
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
