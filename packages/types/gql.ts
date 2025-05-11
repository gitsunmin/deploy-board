/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
type Documents = {
    "\n  mutation CreateDeployment($input: DeploymentInput!) {\n    createDeployment(input: $input) {\n      id\n      name\n      description\n      deployer\n    }\n  }\n": typeof types.CreateDeploymentDocument,
    "\n  mutation DeleteDeployment($id: ID!) {\n    deleteDeployment(id: $id)\n  }\n": typeof types.DeleteDeploymentDocument,
    "\n  mutation UpdateDeployment($id: ID!, $input: DeploymentInput!) {\n    updateDeployment(id: $id, input: $input) {\n      id\n      name\n      description\n      deployer\n      status\n    }\n  }\n": typeof types.UpdateDeploymentDocument,
    "\n  query AdminPage {\n    deployments {\n      id\n      name\n      status\n      deployer\n      description\n      createdAt\n      updatedAt\n    }\n  }\n": typeof types.AdminPageDocument,
    "\n  subscription AdminDeploymentCreated {\n    deploymentCreated {\n      id\n      name\n      status\n      deployer\n      description\n      createdAt\n      updatedAt\n    }\n  }\n": typeof types.AdminDeploymentCreatedDocument,
    "\n  subscription AdminDeploymentUpdated {\n    deploymentUpdated {\n      id\n      name\n      status\n      deployer\n      description\n      createdAt\n      updatedAt\n    }\n  }\n": typeof types.AdminDeploymentUpdatedDocument,
    "\n  subscription AdminDeploymentDeleted {\n    deploymentDeleted {\n      id\n      name\n      status\n      deployer\n      description\n      createdAt\n      updatedAt\n    }\n  }\n": typeof types.AdminDeploymentDeletedDocument,
    "\n  query IndexPage {\n    deployments {\n      id\n      name\n      status\n      deployer\n      description\n      createdAt\n      updatedAt\n    }\n  }\n": typeof types.IndexPageDocument,
    "\n  subscription IndexDeploymentCreated {\n    deploymentCreated {\n      id\n      name\n      status\n      deployer\n      description\n      createdAt\n      updatedAt\n    }\n  }\n": typeof types.IndexDeploymentCreatedDocument,
    "\n  subscription IndexDeploymentUpdated {\n    deploymentUpdated {\n      id\n      name\n      status\n      deployer\n      description\n      createdAt\n      updatedAt\n    }\n  }\n": typeof types.IndexDeploymentUpdatedDocument,
    "\n  subscription IndexDeploymentDeleted {\n    deploymentDeleted {\n      id\n      name\n      status\n      deployer\n      description\n      createdAt\n      updatedAt\n    }\n  }\n": typeof types.IndexDeploymentDeletedDocument,
};
const documents: Documents = {
    "\n  mutation CreateDeployment($input: DeploymentInput!) {\n    createDeployment(input: $input) {\n      id\n      name\n      description\n      deployer\n    }\n  }\n": types.CreateDeploymentDocument,
    "\n  mutation DeleteDeployment($id: ID!) {\n    deleteDeployment(id: $id)\n  }\n": types.DeleteDeploymentDocument,
    "\n  mutation UpdateDeployment($id: ID!, $input: DeploymentInput!) {\n    updateDeployment(id: $id, input: $input) {\n      id\n      name\n      description\n      deployer\n      status\n    }\n  }\n": types.UpdateDeploymentDocument,
    "\n  query AdminPage {\n    deployments {\n      id\n      name\n      status\n      deployer\n      description\n      createdAt\n      updatedAt\n    }\n  }\n": types.AdminPageDocument,
    "\n  subscription AdminDeploymentCreated {\n    deploymentCreated {\n      id\n      name\n      status\n      deployer\n      description\n      createdAt\n      updatedAt\n    }\n  }\n": types.AdminDeploymentCreatedDocument,
    "\n  subscription AdminDeploymentUpdated {\n    deploymentUpdated {\n      id\n      name\n      status\n      deployer\n      description\n      createdAt\n      updatedAt\n    }\n  }\n": types.AdminDeploymentUpdatedDocument,
    "\n  subscription AdminDeploymentDeleted {\n    deploymentDeleted {\n      id\n      name\n      status\n      deployer\n      description\n      createdAt\n      updatedAt\n    }\n  }\n": types.AdminDeploymentDeletedDocument,
    "\n  query IndexPage {\n    deployments {\n      id\n      name\n      status\n      deployer\n      description\n      createdAt\n      updatedAt\n    }\n  }\n": types.IndexPageDocument,
    "\n  subscription IndexDeploymentCreated {\n    deploymentCreated {\n      id\n      name\n      status\n      deployer\n      description\n      createdAt\n      updatedAt\n    }\n  }\n": types.IndexDeploymentCreatedDocument,
    "\n  subscription IndexDeploymentUpdated {\n    deploymentUpdated {\n      id\n      name\n      status\n      deployer\n      description\n      createdAt\n      updatedAt\n    }\n  }\n": types.IndexDeploymentUpdatedDocument,
    "\n  subscription IndexDeploymentDeleted {\n    deploymentDeleted {\n      id\n      name\n      status\n      deployer\n      description\n      createdAt\n      updatedAt\n    }\n  }\n": types.IndexDeploymentDeletedDocument,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown;

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation CreateDeployment($input: DeploymentInput!) {\n    createDeployment(input: $input) {\n      id\n      name\n      description\n      deployer\n    }\n  }\n"): (typeof documents)["\n  mutation CreateDeployment($input: DeploymentInput!) {\n    createDeployment(input: $input) {\n      id\n      name\n      description\n      deployer\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation DeleteDeployment($id: ID!) {\n    deleteDeployment(id: $id)\n  }\n"): (typeof documents)["\n  mutation DeleteDeployment($id: ID!) {\n    deleteDeployment(id: $id)\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation UpdateDeployment($id: ID!, $input: DeploymentInput!) {\n    updateDeployment(id: $id, input: $input) {\n      id\n      name\n      description\n      deployer\n      status\n    }\n  }\n"): (typeof documents)["\n  mutation UpdateDeployment($id: ID!, $input: DeploymentInput!) {\n    updateDeployment(id: $id, input: $input) {\n      id\n      name\n      description\n      deployer\n      status\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query AdminPage {\n    deployments {\n      id\n      name\n      status\n      deployer\n      description\n      createdAt\n      updatedAt\n    }\n  }\n"): (typeof documents)["\n  query AdminPage {\n    deployments {\n      id\n      name\n      status\n      deployer\n      description\n      createdAt\n      updatedAt\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  subscription AdminDeploymentCreated {\n    deploymentCreated {\n      id\n      name\n      status\n      deployer\n      description\n      createdAt\n      updatedAt\n    }\n  }\n"): (typeof documents)["\n  subscription AdminDeploymentCreated {\n    deploymentCreated {\n      id\n      name\n      status\n      deployer\n      description\n      createdAt\n      updatedAt\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  subscription AdminDeploymentUpdated {\n    deploymentUpdated {\n      id\n      name\n      status\n      deployer\n      description\n      createdAt\n      updatedAt\n    }\n  }\n"): (typeof documents)["\n  subscription AdminDeploymentUpdated {\n    deploymentUpdated {\n      id\n      name\n      status\n      deployer\n      description\n      createdAt\n      updatedAt\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  subscription AdminDeploymentDeleted {\n    deploymentDeleted {\n      id\n      name\n      status\n      deployer\n      description\n      createdAt\n      updatedAt\n    }\n  }\n"): (typeof documents)["\n  subscription AdminDeploymentDeleted {\n    deploymentDeleted {\n      id\n      name\n      status\n      deployer\n      description\n      createdAt\n      updatedAt\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query IndexPage {\n    deployments {\n      id\n      name\n      status\n      deployer\n      description\n      createdAt\n      updatedAt\n    }\n  }\n"): (typeof documents)["\n  query IndexPage {\n    deployments {\n      id\n      name\n      status\n      deployer\n      description\n      createdAt\n      updatedAt\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  subscription IndexDeploymentCreated {\n    deploymentCreated {\n      id\n      name\n      status\n      deployer\n      description\n      createdAt\n      updatedAt\n    }\n  }\n"): (typeof documents)["\n  subscription IndexDeploymentCreated {\n    deploymentCreated {\n      id\n      name\n      status\n      deployer\n      description\n      createdAt\n      updatedAt\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  subscription IndexDeploymentUpdated {\n    deploymentUpdated {\n      id\n      name\n      status\n      deployer\n      description\n      createdAt\n      updatedAt\n    }\n  }\n"): (typeof documents)["\n  subscription IndexDeploymentUpdated {\n    deploymentUpdated {\n      id\n      name\n      status\n      deployer\n      description\n      createdAt\n      updatedAt\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  subscription IndexDeploymentDeleted {\n    deploymentDeleted {\n      id\n      name\n      status\n      deployer\n      description\n      createdAt\n      updatedAt\n    }\n  }\n"): (typeof documents)["\n  subscription IndexDeploymentDeleted {\n    deploymentDeleted {\n      id\n      name\n      status\n      deployer\n      description\n      createdAt\n      updatedAt\n    }\n  }\n"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;