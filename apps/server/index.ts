import { Constants } from '@/constants';
import { resolvers } from '@/resolvers';
import Fastify from 'fastify';
import Mercurius from 'mercurius';
import mercuriusCodegen from 'mercurius-codegen'
import cors from '@fastify/cors';
import MercuriusLogging from 'mercurius-logging';
import { ENV } from '@repo/env'
import path from 'node:path';
import dotenv from 'dotenv';

dotenv.config({ path: path.resolve(__dirname, '../../.env') });


const FastifyApp = Fastify({
  logger: true,
})

const FastifySchema = await Bun.file(Constants.System.SCHEMA_PATH).text();

await FastifyApp.register(cors, {
  origin: true, // For development, allow all origins
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization', 'Accept', 'Origin', 'X-Requested-With'],
  preflightContinue: false,
  optionsSuccessStatus: 200,
})

await FastifyApp.register(Mercurius, {
  schema: FastifySchema,
  resolvers,
  subscription: {
    context: (connection, request) => {
      return {};
    },
    verifyClient: (info, next) => {
      // Allow all WebSocket connections in development
      next(true);
    }
  },
  graphiql: {
    enabled: true,
    plugins: [],
  },
})

await FastifyApp.register(MercuriusLogging, {
  logLevel: 'info',
  logBody: true,
  logVariables: true,
  logRequest: true,
  logMessage: (context) => `GraphQL Request: ${context.operationId} ${context.__currentQuery}`,
})

// Add WebSocket CORS headers
FastifyApp.addHook('onRequest', async (request, reply) => {
  if (request.headers.upgrade === 'websocket') {
    reply.header('Access-Control-Allow-Origin', '*');
    reply.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    reply.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Accept, Origin, X-Requested-With');
    reply.header('Access-Control-Allow-Credentials', 'true');
  }
})

FastifyApp.get('/health', async function () {
  return { status: 'ok' }
})

// Explicit OPTIONS handler for GraphQL endpoint
FastifyApp.options('/graphql', async (request, reply) => {
  reply
    .header('Access-Control-Allow-Origin', '*')
    .header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
    .header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Accept, Origin, X-Requested-With')
    .header('Access-Control-Allow-Credentials', 'true')
    .header('Access-Control-Max-Age', '86400')
    .code(200)
    .send()
})

// 외부에서 접근 가능하도록 host를 0.0.0.0으로 설정
FastifyApp.listen({ 
  port: ENV.SERVER_PORT, 
  host: '0.0.0.0' 
}, (err, address) => {
  if (err) {
    FastifyApp.log.error(err);
    process.exit(1);
  }
  console.log(`Server is running at ${address}`);
  console.log(`GraphiQL available at ${address}/graphiql`);
})


mercuriusCodegen(FastifyApp, {
  targetPath: './../../packages/graphql/generated.ts'
}).catch(console.error)