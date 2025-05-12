import { resolvers } from '@/resolvers';
import { Constants } from '@/constants';
import { ApolloServer } from '@apollo/server';
import { WebSocketServer } from 'ws';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { createServer } from 'node:http';
import express from 'express';
import { useServer } from 'graphql-ws/use/ws';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import cors from 'cors';
import { expressMiddleware } from '@apollo/server/express4';

const typeDefs = await Bun.file(Constants.System.SCHEMA_PATH).text();

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
})

const app = express();
const httpServer = createServer(app);

const wsServer = new WebSocketServer({
  server: httpServer,
  path: '/subscriptions',
});

const serverCleanup = useServer({
  schema,
  onConnect: async (ctx) => {
    console.log('ctx:', ctx.subscriptions);
    console.log('Connected!');
  },
  onDisconnect(ctx, code, reason) {
    console.log('ctx:', ctx.subscriptions);
    console.log('Disconnected!:', code, reason);
  },

}, wsServer);

const server = new ApolloServer({
  schema,
  plugins: [
    ApolloServerPluginDrainHttpServer({ httpServer }),
    {
      async serverWillStart() {
        console.log('serverWillStart server...');
        return {
          async drainServer() {
            await serverCleanup.dispose();
          },

        };
      },
    },
  ],
  logger: {
    debug(message) {
      console.log(message);
    },
    info(message) {
      console.log(message);
    },
    warn(message) {
      console.warn(message);
    },
    error(message) {
      console.error(message);
    },
  }
});


await server.start();

app.use(
  '/graphql',
  cors<cors.CorsRequest>({
    origin: '*',
  }),
  express.json(),
  expressMiddleware(server),
);

// Now that our HTTP server is fully set up, we can listen to it.
httpServer.listen(Constants.System.PORT, () => {
  console.log(`Server is now running on http://localhost:${Constants.System.PORT}/graphql`);
});