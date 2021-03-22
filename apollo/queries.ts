import { gql } from "@apollo/client";

export const WorkoutsQuery = gql`
  query WorkoutsQuery {
    workouts {
      id
      date
      updated_at
      exerciseCount
    }
  }
`;

export const WorkoutQuery = gql`
  query WorkoutQuery($id: ID!) {
    workout(id: $id) {
      id
      date
      exercises {
        id
        order
        type
        sets {
          order
          reps
          weight
        }
      }
    }
  }
`;

export const AddWorkoutMutation = gql`
  mutation AddWorkoutMutation($workout: WorkoutInput!) {
    saveWorkout(workout: $workout) {
      id
      date
    }
  }
`;

export const RemoveWorkoutMutation = gql`
  mutation DeleteWorkoutMutation($id: ID!) {
    deleteWorkout(id: $id)
  }
`;

export const UpdateWorkoutMutation = gql`
  mutation UpdateWorkoutMutation($workout: WorkoutInput!) {
    updateWorkout(workout: $workout) {
      id
      date
      updated_at
      exerciseCount
    }
  }
`;
