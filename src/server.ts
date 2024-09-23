import express, { Application } from 'express';
import { ApolloServer } from 'apollo-server-express';
import { typeDefs } from './graphql/schema'
import { resolvers } from './graphql/resolvers'
import { formatError } from './common/errors/errorHandlers'
import 'dotenv/config';
import { decodeToken } from './common/utils/tokenUtils'

const startServer = async () => {
  const app: Application = express();

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    formatError,
    context: ({ req }) => {
      return req
    },
  });

  await server.start();
  server.applyMiddleware({ app });
  const PORT = process.env.PORT;

  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}${server.graphqlPath}`);
  });
};

startServer();