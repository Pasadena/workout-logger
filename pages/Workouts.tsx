import styled from "styled-components";
import { FiX } from "react-icons/fi";
import { ApolloCache, useMutation } from "@apollo/client";

import { RemoveWorkoutMutation } from "apollo/queries";
import { Workout } from "types/types";
import { useRouter } from "next/router";
import DeletableTile from "components/DeletableTile";

const Container = styled.div`
  min-width: 400px;
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.h2`
  font-weight: 600;
  font-size: 1.5rem;
`;

const WorkoutCount = styled.span`
  font-size: 0.8rem;
`;

const WorkoutContainer = styled.div`
  display: flex;
  align-items: center;
  transition: 0.2s ease-in;
  &:hover {
    cursor: pointer;
    transform: scale(1.02);
  }
`;

const WorkoutTile = styled.div`
  min-width: 300px;
  display: flex;
  flex-direction: column;
  padding: 1rem;
  box-shadow: 0px 2px 6px 0px rgba(0, 0, 0, 0.3);
`;

const WorkoutDate = styled.h3`
  font-weight: 400;
  font-size: 1.5rem;
`;

const WorkoutExercises = styled.div`
  font-size: 1.2;
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
  workouts: Workout[];
}

function updateCache(cache: ApolloCache<Workout>, result: any) {
  cache.modify({
    fields: {
      workouts(existingWorkouts = []) {
        return existingWorkouts.filter(
          (item: Workout) => item.id !== result.deleteWorkout
        );
      },
    },
  });
}

const Workouts = ({ workouts }: Props) => {
  const router = useRouter();
  const [
    removeWorkout,
    { data: deletedData },
  ] = useMutation(RemoveWorkoutMutation, { update: updateCache });
  return (
    <Container>
      <Header>
        <Title>Previous workouts</Title>
        <WorkoutCount>{`${workouts.length} workouts`}</WorkoutCount>
      </Header>
      {workouts.map((workout: Workout, index: number) => (
        <DeletableTile
          key={`${workout.id}-${index}`}
          onDelete={() => removeWorkout({ variables: { id: workout.id } })}
          onTileClicked={() => router.push(`/edit/${workout.id}`)}
        >
          <WorkoutTile>
            <WorkoutDate>{workout.date}</WorkoutDate>
            <WorkoutExercises>{`${workout.exerciseCount} exercises`}</WorkoutExercises>
          </WorkoutTile>
        </DeletableTile>
      ))}
    </Container>
  );
};

export default Workouts;
