import { join } from 'node:path';
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const System = {
  PORT: process.env.SERVER_PORT ? parseInt(process.env.SERVER_PORT, 10) : 3000,
  SCHEMA_PATH: join(__dirname, '../../../../packages/graphql/schema.graphql'),
};

export const Constants = {
  System,
};
