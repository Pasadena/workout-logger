import React from "react";
import styled from "styled-components";
import { WorkoutSet } from "types/types";

import { Input } from "components/InputField";

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
  set: WorkoutSet;
  setModified: (set: WorkoutSet) => void;
}

const Set = ({ title, set, setModified }: Props) => {
  return (
    <SetContainer>
      <SetTitle>{title}</SetTitle>
      <SetInput
        onChange={(e) =>
          setModified({ ...set, reps: parseInt(e.target.value) })
        }
        type="number"
        value={set.reps}
      />
      <Divider>/</Divider>
      <SetInput
        onChange={(e) =>
          setModified({ ...set, weight: parseInt(e.target.value) })
        }
        type="number"
        value={set.weight}
      />
    </SetContainer>
  );
};

export default Set;
