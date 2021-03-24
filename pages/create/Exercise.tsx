import React from "react";
import styled from "styled-components";
import { FiPlus } from "react-icons/fi";
import { useLazyQuery } from "@apollo/client";

import { ExerciseType, WorkoutExercise, WorkoutSet } from "types/types";

import Set from "./Set";
import InputField from "components/InputField";
import { SearchExerciseTypesQuery } from "apollo/queries";
import Combobox from "components/Combobox";

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
  onExerciseModified: (exercise: WorkoutExercise) => void;
}

const Exercise = ({ exercise, order, onExerciseModified }: Props) => {
  const [seachTypes, result] = useLazyQuery<{
    searchExerciseTypes: ExerciseType[];
  }>(SearchExerciseTypesQuery);
  const setExerciseType = React.useCallback(
    (type: ExerciseType) => {
      onExerciseModified({ ...exercise, type });
    },
    [exercise]
  );
  const addSet = React.useCallback(() => {
    const maxOrder = Math.max(
      ...exercise.sets.map((set: WorkoutSet) => set.order)
    );
    const withNewSet = exercise.sets.concat([
      {
        order: maxOrder + 1,
        reps: 0,
        weight: 0,
      },
    ]);
    onExerciseModified({ ...exercise, sets: withNewSet });
  }, [exercise]);
  const onSetModified = React.useCallback(
    (set: WorkoutSet) => {
      const updatedSets = exercise.sets.map((item: WorkoutSet) =>
        item.order === set.order ? set : item
      );
      onExerciseModified({ ...exercise, sets: updatedSets });
    },
    [exercise]
  );
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
          optionSelected={(type: ExerciseType) => setExerciseType(type)}
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
            setModified={onSetModified}
          />
        ))}
        <AddSetIcon onClick={(e) => addSet()} />
      </Content>
    </Container>
  );
};

export default Exercise;
