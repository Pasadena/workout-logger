import styled from "styled-components";
import { FiX } from "react-icons/fi";

const WorkoutContainer = styled.div`
  display: flex;
  align-items: center;
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
    <WorkoutContainer onClick={onTileClicked}>
      {children}
      <DeleteIcon onClick={onDelete} />
    </WorkoutContainer>
  );
}
