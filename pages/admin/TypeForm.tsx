import React, { FormEvent } from "react";
import styled from "styled-components";
import { ApolloCache, FetchResult, gql, useMutation } from "@apollo/client";

import { CreateExerciseTypeMutation } from "apollo/queries";
import InputField from "components/InputField";
import { PrimaryButton } from "components/Button";
import { appendToCache } from "apollo/cache";
import { ExerciseType } from "types/types";

const Form = styled.form`
  padding: 1rem;
  background-color: #f5f5f5;
  box-shadow: 0px 15px 10px -15px rgb(0 0 0 / 30%);
  & > * {
    margin-right: 1rem;
  }
`;

const Title = styled.h3`
  margin-top: 0;
`;

const Content = styled.div`
  display: flex;
  justify-content: space-between;
  padding-bottom: 1rem;
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

  const createType = React.useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      saveExerciseType({ variables: { name } });
      setName("");
    },
    [name, setName]
  );

  return (
    <Form onSubmit={createType}>
      <Title>Create a new type</Title>
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
        <PrimaryButton type="submit" label="Create" />
      </Content>
    </Form>
  );
}
