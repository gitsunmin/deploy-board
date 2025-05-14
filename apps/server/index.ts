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
import { ENV } from '@repo/env';

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
  skipUTF8Validation: true, // 추가 - WebSocket 메시지 처리 방식 변경
});

const serverCleanup = useServer({
  schema,
  context: (ctx) => {
    // 컨텍스트 명시적 설정
    return { ctx };
  },
  onConnect: () => {
    console.log('Client connected to WebSocket');
    return true;
  },
  onDisconnect: () => {
    console.log('Client disconnected from WebSocket');
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
httpServer.listen(ENV.SERVER_PORT, () => {
  console.log(`Server is now running on ${ENV.SERVER_URI}:${ENV.SERVER_PORT}/graphql`);
});