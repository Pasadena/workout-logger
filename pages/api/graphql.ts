import { ApolloServer } from "apollo-server-micro";
import { types } from "../../apollo/types";
import { resolvers } from "../../apollo/resolvers";

const apolloServer = new ApolloServer({ typeDefs: types, resolvers });

export const config = {
  api: {
    bodyParser: false,
  },
};

export default apolloServer.createHandler({ path: "/api/graphql" });
