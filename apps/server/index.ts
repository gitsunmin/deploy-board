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
  subscription: true
})

FastifyApp.get('/', async function (req, reply) {
  const query = '{ document { title } }'
  return reply.graphql(query)
})

FastifyApp.listen({ port: 4000 })


mercuriusCodegen(FastifyApp, {
  // Commonly relative to your root package.json
  targetPath: './../../packages/graphql/generated.ts'
}).catch(console.error)