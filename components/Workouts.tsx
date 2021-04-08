import styled from "styled-components";
import { ApolloCache, FetchResult, useMutation } from "@apollo/client";

import { RemoveWorkoutMutation } from "apollo/queries";
import { evictFromCache } from "apollo/cache";
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
  margin-bottom: 2rem;
`;

const Title = styled.h2`
  font-weight: 600;
  font-size: 1.5rem;
`;

const WorkoutCount = styled.span`
  font-size: 0.8rem;
`;

const WorkoutDate = styled.h3`
  font-weight: 400;
  font-size: 1.5rem;
`;

const WorkoutExercises = styled.div`
  font-size: 1.2;
`;

interface Props {
  workouts: Workout[];
}

const Workouts = ({ workouts }: Props) => {
  const router = useRouter();
  const [removeWorkout] = useMutation(RemoveWorkoutMutation, {
    update: (
      cache: ApolloCache<{ deleteWorkout: string }>,
      result: FetchResult<{ deleteWorkout: string }>
    ) => evictFromCache(cache, "workouts", result.data.deleteWorkout),
  });
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
          <WorkoutDate>{workout.date}</WorkoutDate>
          <WorkoutExercises>{`${workout.exerciseCount} exercises`}</WorkoutExercises>
        </DeletableTile>
      ))}
    </Container>
  );
};

export default Workouts;
