import { useQuery } from "@apollo/client";
import styled from "styled-components";

import { ExerciseTypesQuery } from "apollo/queries";
import { ExerciseType } from "types/types";
import { initClient } from "apollo/client";

const Container = styled.div`
  width: 30%;
`;

const TypesList = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const TypeListHeader = styled.h3`
  display: flex;
  justify-content: space-between;
`;

const TypeCount = styled.span`
  font-size: 0.9rem;
  font-weight: 300;
`;

const Type = styled.div`
  padding: 1rem;
  font-size: 1.5rem;
  font-weight: 500;
`;

export default function AdminView() {
  const { loading, error, data } = useQuery<{ exerciseTypes: ExerciseType[] }>(
    ExerciseTypesQuery
  );

  if (error) {
    return <div>Error!</div>;
  }
  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <Container>
      <TypesList>
        <TypeListHeader>
          Available Types
          <TypeCount>{data.exerciseTypes.length} types</TypeCount>
        </TypeListHeader>
        {data.exerciseTypes.map((type: ExerciseType) => (
          <Type key={type.id}>{type.name}</Type>
        ))}
      </TypesList>
    </Container>
  );
}

export async function getServerSideProps() {
  const client = initClient();
  await client.query({ query: ExerciseTypesQuery });
  return {
    props: {
      initialApolloState: client.cache.extract(),
    },
  };
}
