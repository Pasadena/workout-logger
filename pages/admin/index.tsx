import { useQuery } from "@apollo/client";
import styled from "styled-components";

import { ExerciseTypesQuery } from "apollo/queries";
import { ExerciseType } from "types/types";
import { initClient } from "apollo/client";
import TypeForm from "pages/admin/TypeForm";
import DeletableTile from "components/DeletableTile";

const Container = styled.div`
  width: 30%;
  & > * {
    margin-top: 1rem;
    margin-bottom: 1rem;
  }
`;

const TypesList = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  & > * {
    margin-bottom: 1rem;
  }
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
      <TypeForm />
      <TypesList>
        <TypeListHeader>
          Available Types
          <TypeCount>{data.exerciseTypes.length} types</TypeCount>
        </TypeListHeader>
        {data.exerciseTypes.map((type: ExerciseType) => (
          <DeletableTile
            key={type.id}
            onDelete={() => {}}
            onTileClicked={() => {}}
          >
            <Type>{type.name}</Type>
          </DeletableTile>
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
