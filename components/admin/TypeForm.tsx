import React, { FormEvent } from "react";
import styled from "styled-components";
import { ApolloCache, FetchResult, gql, useMutation } from "@apollo/client";

import { CreateExerciseTypeMutation } from "apollo/queries";
import InputField from "components/InputField";
import { PrimaryButton } from "components/Button";
import { appendToCache } from "apollo/cache";
import { ExerciseType } from "types/types";

const Form = styled.form`
  padding: 1.5rem;
  background-color: #f5f5f5;
  border-radius: 4px;
  box-shadow: 0px 15px 10px -15px rgb(0 0 0 / 30%);
`;

const Title = styled.h3`
  margin-top: 0;
  margin-bottom: 2rem;
`;

const Content = styled.div`
  display: flex;
  justify-content: space-between;
  padding-bottom: 1rem;
  & > * {
    margin-right: 1rem;
  }
`;

export default function TypeForm() {
  const [name, setName] = React.useState("");
  const [saveExerciseType] = useMutation<
    { saveExerciseType: ExerciseType },
    { name: string }
  >(CreateExerciseTypeMutation, {
    update: (
      cache: ApolloCache<{ saveExerciseType: ExerciseType }>,
      result: FetchResult<{ saveExerciseType: ExerciseType }>
    ) =>
      appendToCache(
        cache,
        "exerciseTypes",
        result.data.saveExerciseType,
        gql`
          fragment NewType on ExerciseType {
            id
            name
          }
        `
      ),
  });

  const createType = React.useCallback(() => {
    saveExerciseType({ variables: { name } });
    setName("");
  }, [name, setName]);

  return (
    <Form>
      <Title>Create a new exercise type:</Title>
      <Content>
        <InputField
          label="Name"
          inputProps={{
            value: name,
          }}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setName(e.target.value)
          }
        />
        <PrimaryButton label="Create" onClick={() => createType()} />
      </Content>
    </Form>
  );
}
