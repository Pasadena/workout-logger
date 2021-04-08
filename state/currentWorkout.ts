import { atom, useRecoilState, useRecoilValue } from "recoil";
import { Workout, WorkoutExercise, WorkoutSet } from "types/types";

const emptyExercise = (order = 1) => ({
  type: null,
  order,
  sets: [{ order: 1, reps: 0, weight: 0 }],
});

const currentWorkoutAtom = atom<Workout>({
  key: "currentWorkoutAtom",
  default: { exercises: [emptyExercise()] },
});

export const useCurrentWorkout = () => useRecoilValue(currentWorkoutAtom);

export const useCurrentWorkoutState = () => useRecoilState(currentWorkoutAtom);

export const useUpdateSet = () => {
  const [workout, setWorkout] = useRecoilState(currentWorkoutAtom);

  const updateSet = (exercise: WorkoutExercise, set: WorkoutSet) => {
    const updatedSets = exercise.sets.map((item: WorkoutSet) =>
      item.order === set.order ? set : item
    );
    setWorkout({
      ...workout,
      exercises: workout.exercises.map((item: WorkoutExercise) =>
        item.order !== exercise.order
          ? item
          : { ...exercise, sets: updatedSets }
      ),
    });
  };
  return updateSet;
};

export const useAddSet = () => {
  const [workout, setWorkout] = useRecoilState(currentWorkoutAtom);

  const addSet = (exercise: WorkoutExercise) => {
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
    setWorkout({
      ...workout,
      exercises: workout.exercises.map((item: WorkoutExercise) =>
        item.order !== exercise.order ? item : { ...exercise, sets: withNewSet }
      ),
    });
  };
  return addSet;
};

export const useUpdateExercise = () => {
  const [workout, setWorkout] = useRecoilState(currentWorkoutAtom);
  const updateExercise = (exercise: WorkoutExercise) =>
    setWorkout({
      ...workout,
      exercises: workout.exercises.map((item: WorkoutExercise) =>
        item.order !== exercise.order ? item : { ...exercise }
      ),
    });
  return updateExercise;
};

export const useAddExercise = () => {
  const [workout, setWorkout] = useRecoilState(currentWorkoutAtom);
  const addExercise = () => {
    const maxOrder = Math.max(
      ...workout.exercises.map((set: WorkoutExercise) => set.order)
    );
    setWorkout({
      ...workout,
      exercises: workout.exercises.concat([emptyExercise(maxOrder + 1)]),
    });
  };

  return addExercise;
};
