import React from "react";
import styled from "styled-components";
import { FiX } from "react-icons/fi";

const WorkoutContainer = styled.div`
  display: flex;
  align-items: center;
`;

const SelectableContainer = styled.div`
  min-width: 300px;
  display: flex;
  flex-direction: column;
  padding: 1rem 1.5rem;
  border-radius: 4px;
  box-shadow: 0px 2px 6px 0px rgba(0, 0, 0, 0.3);
  transition: 0.2s ease-in;
  &:hover {
    cursor: pointer;
    transform: scale(1.02);
  }
`;

const DeleteIcon = styled(FiX)`
  margin-left: 2rem;
  width: 50px;
  height: 50px;
  color: red;
  transition: color 0.2s ease-in;
  &:hover {
    color: darkgreen;
    transform: scale(1.05);
    cursor: pointer;
  }
`;

interface Props {
  children: React.ReactNode;
  onTileClicked: () => void;
  onDelete: () => void;
}

export default function DeletableTile({
  children,
  onTileClicked,
  onDelete,
}: Props) {
  return (
    <WorkoutContainer>
      <SelectableContainer onClick={onTileClicked}>
        {children}
      </SelectableContainer>
      <DeleteIcon onClick={onDelete} />
    </WorkoutContainer>
  );
}
