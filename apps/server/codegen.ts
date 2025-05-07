import type { CodegenConfig } from '@graphql-codegen/cli'
import { Constants } from './src/constants'

const config: CodegenConfig = {
    schema: Constants.System.SCHEMA_PATH,
    emitLegacyCommonJSImports: false,
    generates: {
        './../../packages/typescript-config/graphql.ts': {
            plugins: [
                'typescript',
                'typescript-resolvers',
                'typescript-operations',
            ],
            config: {
                immutableTypes: true,
            }
        },
    }
}

export default config