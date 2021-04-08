import React from "react";
import styled from "styled-components";
import { WorkoutExercise, WorkoutSet } from "types/types";

import { Input } from "components/InputField";
import { useUpdateSet } from "state/currentWorkout";

const SetContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding-left: 0.5rem;
`;

const SetInput = styled(Input)`
  width: 40px;
  text-align: center;
`;

const SetTitle = styled.div`
  font-weight: 600;
`;
const Divider = styled.span``;

interface Props {
  title: string;
  exercise: WorkoutExercise;
  set: WorkoutSet;
}

const Set = ({ title, exercise, set }: Props) => {
  const updateSet = useUpdateSet();

  return (
    <SetContainer>
      <SetTitle>{title}</SetTitle>
      <SetInput
        onChange={(e) =>
          updateSet(exercise, { ...set, reps: parseInt(e.target.value) })
        }
        type="number"
        value={set.reps}
      />
      <Divider>/</Divider>
      <SetInput
        onChange={(e) =>
          updateSet(exercise, { ...set, weight: parseInt(e.target.value) })
        }
        type="number"
        value={set.weight}
      />
    </SetContainer>
  );
};

export default Set;
