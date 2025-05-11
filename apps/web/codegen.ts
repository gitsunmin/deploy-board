
import { join } from 'node:path';
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import type { CodegenConfig } from '@graphql-codegen/cli';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const SCHEMA_PATH = join(__dirname, '../../packages/graphql/schema.graphql');

const config: CodegenConfig = {
  schema: SCHEMA_PATH,
  documents: ['src/**/*.{ts,tsx}'],
  generates: {
    './../../packages/types/': {
      preset: 'client',
      plugins: [],
      presetConfig: {
        gqlTagName: 'gql',
      }
    }
  },
  ignoreNoDocuments: true,
};

export default config;