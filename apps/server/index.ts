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
import { match, P } from 'ts-pattern';

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const serverUri = new URL(ENV.SERVER_URL);

const port = match(serverUri)
  .with({ port: P.string.minLength(1) }, (uri) => Number(uri.port))
  .with({ protocol: 'http:' }, () => 3000)
  .with({ protocol: 'https:' }, () => 443)
  .otherwise(() => 8000);

const FastifyApp = Fastify({
  logger: true,
})

const FastifySchema = await Bun.file(Constants.System.SCHEMA_PATH).text();

await FastifyApp.register(cors, {
  origin: true, // For development, allow all origins
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization'],
})

FastifyApp.register(Mercurius, {
  schema: FastifySchema,
  resolvers,
  graphiql: true,
  subscription: true,

})

FastifyApp.register(MercuriusLogging, {
  logLevel: 'info',
  logBody: true,
  logVariables: true,
  logRequest: true,
  logMessage: (context) => `GraphQL Request: ${context.operationId} ${context.__currentQuery}`,
})

FastifyApp.get('/health', async function () {
  return { status: 'ok' }
})

FastifyApp.listen({ port: 8000 }, (_, args2) => {
  console.log('Starting Server on ', serverUri.origin, `:${port}`);
})


mercuriusCodegen(FastifyApp, {
  targetPath: './../../packages/graphql/generated.ts'
}).catch(console.error)