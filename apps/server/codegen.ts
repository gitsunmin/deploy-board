import type { CodegenConfig } from '@graphql-codegen/cli';
import { Constants } from './src/constants';


const config: CodegenConfig = {
  schema: Constants.System.SCHEMA_PATH,
  // emitLegacyCommonJSImports: false,
  generates: {
    './../../packages/types/schema.ts': {
      plugins: ['typescript', 'typescript-resolvers', 'typescript-operations'],
      config: {
        immutableTypes: true,
      },
    },
  },
};

export default config;
