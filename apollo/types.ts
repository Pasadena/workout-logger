import { gql } from "@apollo/client";

export const types = gql`
  type ExerciseSet {
    order: Int!
    reps: Int!
    weight: Int
  }
  type Exercise {
    id: ID!
    order: Int!
    type: ExerciseType!
    sets: [ExerciseSet]!
  }
  type Workout {
    id: ID!
    date: String!
    updated_at: String
    exercises: [Exercise]!
    exerciseCount: Int!
  }

  type ExerciseType {
    id: ID!
    name: String!
  }

  input ExerciseTypeInput {
    id: ID!
    name: String!
  }

  input ExerciseSetInput {
    order: Int!
    reps: Int!
    weight: Int
  }
  input ExerciseInput {
    id: String
    order: Int!
    type: ExerciseTypeInput!
    sets: [ExerciseSetInput]!
  }
  input WorkoutInput {
    id: String
    date: String
    exercises: [ExerciseInput]!
  }

  type Query {
    workouts: [Workout]
    workout(id: ID!): Workout!
    exerciseTypes: [ExerciseType]!
    searchExerciseTypes(partialName: String): [ExerciseType]!
  }

  type Mutation {
    saveWorkout(workout: WorkoutInput!): Workout!
    updateWorkout(workout: WorkoutInput!): Workout!
    deleteWorkout(id: ID!): ID!
    saveExerciseType(name: String!): ExerciseType
    deleteExerciseType(id: ID!): ID!
  }
`;
