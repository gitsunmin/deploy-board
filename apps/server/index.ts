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
import fs from 'node:fs';

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

// HTTPS 설정을 위한 SSL 인증서 읽기
const httpsOptions = {
  key: fs.readFileSync(path.join(__dirname, 'ssl', 'localhost+3-key.pem')),
  cert: fs.readFileSync(path.join(__dirname, 'ssl', 'localhost+3.pem'))
};

const FastifyApp = Fastify({
  logger: true,
  https: httpsOptions
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
  subscription: true,
  graphiql: {
    enabled: true,
    plugins: [],
  },

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