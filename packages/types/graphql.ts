/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type Deployment = Node & {
  __typename?: 'Deployment';
  createdAt: Scalars['String']['output'];
  deployer: Scalars['String']['output'];
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  status: DeploymentStatus;
  updatedAt: Scalars['String']['output'];
};

export type DeploymentInput = {
  deployer: Scalars['String']['input'];
  description: Scalars['String']['input'];
  name: Scalars['String']['input'];
  status: DeploymentStatus;
};

export enum DeploymentStatus {
  Failed = 'FAILED',
  InProgress = 'IN_PROGRESS',
  Pending = 'PENDING',
  Success = 'SUCCESS',
  Yet = 'YET'
}

export type Document = {
  __typename?: 'Document';
  description: Scalars['String']['output'];
  title: Scalars['String']['output'];
};

export type DocumentInput = {
  description: Scalars['String']['input'];
  title: Scalars['String']['input'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createDeployment: Deployment;
  deleteDeployment: Scalars['Boolean']['output'];
  updateDeployment: Deployment;
  updateDocument: Document;
};


export type MutationCreateDeploymentArgs = {
  input: DeploymentInput;
};


export type MutationDeleteDeploymentArgs = {
  id: Scalars['ID']['input'];
};


export type MutationUpdateDeploymentArgs = {
  id: Scalars['ID']['input'];
  input: DeploymentInput;
};


export type MutationUpdateDocumentArgs = {
  input: DocumentInput;
};

export type Node = {
  id: Scalars['ID']['output'];
};

export type Query = {
  __typename?: 'Query';
  deployments: Array<Deployment>;
  document: Document;
};

export type Subscription = {
  __typename?: 'Subscription';
  deploymentCreated: Array<Deployment>;
  deploymentDeleted: Array<Deployment>;
  deploymentUpdated: Array<Deployment>;
  documentUpdated: Document;
};

export type CreateDeploymentMutationVariables = Exact<{
  input: DeploymentInput;
}>;


export type CreateDeploymentMutation = { __typename?: 'Mutation', createDeployment: { __typename?: 'Deployment', id: string, name: string, description?: string | null, deployer: string } };

export type DeleteDeploymentMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type DeleteDeploymentMutation = { __typename?: 'Mutation', deleteDeployment: boolean };

export type UpdateDeploymentMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  input: DeploymentInput;
}>;


export type UpdateDeploymentMutation = { __typename?: 'Mutation', updateDeployment: { __typename?: 'Deployment', id: string, name: string, description?: string | null, deployer: string, status: DeploymentStatus } };

export type UpdateDocumentMutationVariables = Exact<{
  input: DocumentInput;
}>;


export type UpdateDocumentMutation = { __typename?: 'Mutation', updateDocument: { __typename?: 'Document', title: string, description: string } };

export type AdminPageQueryVariables = Exact<{ [key: string]: never; }>;


export type AdminPageQuery = { __typename?: 'Query', document: { __typename?: 'Document', title: string, description: string }, deployments: Array<{ __typename?: 'Deployment', id: string, name: string, status: DeploymentStatus, deployer: string, description?: string | null, createdAt: string, updatedAt: string }> };

export type AdminDeploymentCreatedSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type AdminDeploymentCreatedSubscription = { __typename?: 'Subscription', deploymentCreated: Array<{ __typename?: 'Deployment', id: string, name: string, status: DeploymentStatus, deployer: string, description?: string | null, createdAt: string, updatedAt: string }> };

export type AdminDeploymentUpdatedSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type AdminDeploymentUpdatedSubscription = { __typename?: 'Subscription', deploymentUpdated: Array<{ __typename?: 'Deployment', id: string, name: string, status: DeploymentStatus, deployer: string, description?: string | null, createdAt: string, updatedAt: string }> };

export type AdminDeploymentDeletedSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type AdminDeploymentDeletedSubscription = { __typename?: 'Subscription', deploymentDeleted: Array<{ __typename?: 'Deployment', id: string, name: string, status: DeploymentStatus, deployer: string, description?: string | null, createdAt: string, updatedAt: string }> };

export type IndexPageQueryVariables = Exact<{ [key: string]: never; }>;


export type IndexPageQuery = { __typename?: 'Query', document: { __typename?: 'Document', title: string, description: string }, deployments: Array<{ __typename?: 'Deployment', id: string, name: string, status: DeploymentStatus, deployer: string, description?: string | null, createdAt: string, updatedAt: string }> };

export type IndexDeploymentCreatedSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type IndexDeploymentCreatedSubscription = { __typename?: 'Subscription', deploymentCreated: Array<{ __typename?: 'Deployment', id: string, name: string, status: DeploymentStatus, deployer: string, description?: string | null, createdAt: string, updatedAt: string }> };

export type IndexDeploymentUpdatedSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type IndexDeploymentUpdatedSubscription = { __typename?: 'Subscription', deploymentUpdated: Array<{ __typename?: 'Deployment', id: string, name: string, status: DeploymentStatus, deployer: string, description?: string | null, createdAt: string, updatedAt: string }> };

export type IndexDeploymentDeletedSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type IndexDeploymentDeletedSubscription = { __typename?: 'Subscription', deploymentDeleted: Array<{ __typename?: 'Deployment', id: string, name: string, status: DeploymentStatus, deployer: string, description?: string | null, createdAt: string, updatedAt: string }> };


export const CreateDeploymentDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateDeployment"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"DeploymentInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createDeployment"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"deployer"}}]}}]}}]} as unknown as DocumentNode<CreateDeploymentMutation, CreateDeploymentMutationVariables>;
export const DeleteDeploymentDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteDeployment"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteDeployment"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}]}}]} as unknown as DocumentNode<DeleteDeploymentMutation, DeleteDeploymentMutationVariables>;
export const UpdateDeploymentDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateDeployment"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"DeploymentInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateDeployment"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"deployer"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}}]}}]} as unknown as DocumentNode<UpdateDeploymentMutation, UpdateDeploymentMutationVariables>;
export const UpdateDocumentDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateDocument"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"DocumentInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateDocument"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}}]}}]} as unknown as DocumentNode<UpdateDocumentMutation, UpdateDocumentMutationVariables>;
export const AdminPageDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"AdminPage"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"document"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}},{"kind":"Field","name":{"kind":"Name","value":"deployments"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"deployer"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<AdminPageQuery, AdminPageQueryVariables>;
export const AdminDeploymentCreatedDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"AdminDeploymentCreated"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deploymentCreated"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"deployer"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<AdminDeploymentCreatedSubscription, AdminDeploymentCreatedSubscriptionVariables>;
export const AdminDeploymentUpdatedDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"AdminDeploymentUpdated"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deploymentUpdated"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"deployer"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<AdminDeploymentUpdatedSubscription, AdminDeploymentUpdatedSubscriptionVariables>;
export const AdminDeploymentDeletedDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"AdminDeploymentDeleted"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deploymentDeleted"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"deployer"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<AdminDeploymentDeletedSubscription, AdminDeploymentDeletedSubscriptionVariables>;
export const IndexPageDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"IndexPage"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"document"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}},{"kind":"Field","name":{"kind":"Name","value":"deployments"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"deployer"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<IndexPageQuery, IndexPageQueryVariables>;
export const IndexDeploymentCreatedDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"IndexDeploymentCreated"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deploymentCreated"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"deployer"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<IndexDeploymentCreatedSubscription, IndexDeploymentCreatedSubscriptionVariables>;
export const IndexDeploymentUpdatedDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"IndexDeploymentUpdated"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deploymentUpdated"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"deployer"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<IndexDeploymentUpdatedSubscription, IndexDeploymentUpdatedSubscriptionVariables>;
export const IndexDeploymentDeletedDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"IndexDeploymentDeleted"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deploymentDeleted"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"deployer"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<IndexDeploymentDeletedSubscription, IndexDeploymentDeletedSubscriptionVariables>;