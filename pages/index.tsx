import { useQuery } from "@apollo/client";
import styled from "styled-components";
import { initClient } from "apollo/client";

import { WorkoutsQuery } from "apollo/queries";
import Link from "components/Link";
import Workouts from "../components/Workouts";

const Container = styled.div`
  padding: 1rem;
`;

const Home = function () {
  const { data, error } = useQuery(WorkoutsQuery);
  if (error) {
    return <div>Error!</div>;
  }
  if (!data) {
    return <div>Loading</div>;
  }
  return (
    <Container>
      <Link href="/create" label="New workout" />
      <Link href="/admin" label="Admin" />
      <Workouts workouts={data.workouts} />
    </Container>
  );
};

export async function getServerSideProps() {
  const apolloClient = initClient();
  await apolloClient.query({
    query: WorkoutsQuery,
  });
  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
    },
  };
}

export default Home;
