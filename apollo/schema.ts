import { makeExecutableSchema } from "apollo-server-micro";
import { types } from "./types";
import { resolvers } from "./resolvers";

export default makeExecutableSchema({
  typeDefs: types,
  resolvers,
});
