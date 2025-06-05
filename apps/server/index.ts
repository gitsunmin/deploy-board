import { Constants } from '@/constants';
import { resolvers } from '@/resolvers';
import Fastify from 'fastify';
import Mercurius from 'mercurius';
import mercuriusCodegen from 'mercurius-codegen'
import cors from '@fastify/cors';

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

FastifyApp.get('/health', async function () {
  return { status: 'ok' }
})

FastifyApp.listen({ port: Constants.System.PORT }, (_, args2) => {
  console.log('Starting Server on ', args2);
})


mercuriusCodegen(FastifyApp, {
  targetPath: './../../packages/graphql/generated.ts'
}).catch(console.error)