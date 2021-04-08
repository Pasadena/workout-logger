import React from "react";
import styled from "styled-components";
import { FiPlus } from "react-icons/fi";
import { useLazyQuery } from "@apollo/client";

import { ExerciseType, WorkoutExercise, WorkoutSet } from "types/types";

import Set from "./Set";
import { SearchExerciseTypesQuery } from "apollo/queries";
import Combobox from "components/Combobox";
import { useAddSet, useUpdateExercise } from "state/currentWorkout";

const Container = styled.div`
  display: flex;
  padding: 1rem;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem;

  border-radius: 4px;
  box-shadow: 0px 1px 4px -1px rgba(0, 0, 0, 0.3);
  > * {
    margin-top: 0.5rem;
    margin-bottom: 0.5rem;
  }
`;

const Title = styled.h2`
  margin-bottom: 1rem;
  margin-right: 1rem;
`;

const SetsTitle = styled.h3``;

const AddSetIcon = styled(FiPlus)`
  width: 40px;
  height: 40px;
  color: green;
  padding-left: 1rem;
`;

interface Props {
  exercise: WorkoutExercise;
  order: number;
}

const Exercise = ({ exercise, order }: Props) => {
  const addSet = useAddSet();
  const updateExercise = useUpdateExercise();

  const [seachTypes, result] = useLazyQuery<{
    searchExerciseTypes: ExerciseType[];
  }>(SearchExerciseTypesQuery);

  const searchTypes = React.useCallback((partialName: string) => {
    seachTypes({ variables: { partialName } });
  }, []);
  return (
    <Container>
      <Title>{order}.</Title>
      <Content>
        <Combobox
          label="Type"
          value={exercise.type?.name}
          optionSelected={(type: ExerciseType) =>
            updateExercise({ ...exercise, type })
          }
          optionRenderer={(item: ExerciseType) => item.name}
          searchTermChanged={searchTypes}
          fetchResult={{ ...result, data: result.data?.searchExerciseTypes }}
        />
        <SetsTitle>Sets (reps / weight)</SetsTitle>
        {exercise.sets.map((set: WorkoutSet, index: number) => (
          <Set
            key={`set-${index}`}
            set={set}
            title={`${index + 1}.`}
            exercise={exercise}
          />
        ))}
        <AddSetIcon onClick={(e) => addSet(exercise)} />
      </Content>
    </Container>
  );
};

export default Exercise;
