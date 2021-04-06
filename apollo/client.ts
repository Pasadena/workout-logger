import { useMemo } from "react";
import {
  ApolloClient,
  ApolloLink,
  HttpLink,
  InMemoryCache,
  concat,
} from "@apollo/client";

let apolloClient: ApolloClient<any> = null;

const isSsr = typeof window === "undefined";

const gqlUrl = process.env.GQL_URL || "http://localhost:3000";

const removeTypenameMiddleware = new ApolloLink((operation, forward) => {
  if (operation.variables) {
    const omitTypename = (key, value) =>
      key === "__typename" ? undefined : value;
    operation.variables = JSON.parse(
      JSON.stringify(operation.variables, omitTypename)
    );
  }
  return forward(operation);
});

function createApolloClient() {
  return new ApolloClient({
    ssrMode: isSsr,
    link: concat(
      removeTypenameMiddleware,
      new HttpLink({
        uri: `${gqlUrl}/api/graphql`,
        credentials: "same-origin",
      })
    ),
    cache: new InMemoryCache(),
  });
}

export function initClient(initialState = null) {
  const client: ApolloClient<any> = apolloClient ?? createApolloClient();
  if (initialState) {
    client.cache.restore(initialState);
  }
  if (isSsr) {
    return client;
  } else {
    apolloClient = client;
    return client;
  }
}

export function useApollo(initialState: any) {
  const store = useMemo(() => initClient(initialState), [initialState]);
  return store;
}
