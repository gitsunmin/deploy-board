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
  Success = 'SUCCESS'
}

export type Mutation = {
  __typename?: 'Mutation';
  createDeployment: Deployment;
  deleteDeployment: Scalars['Boolean']['output'];
  updateDeployment: Deployment;
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

export type Node = {
  id: Scalars['ID']['output'];
};

export type Query = {
  __typename?: 'Query';
  deployments: Array<Deployment>;
};

export type Subscription = {
  __typename?: 'Subscription';
  deploymentCreated: Deployment;
  deploymentDeleted: Scalars['ID']['output'];
  deploymentUpdated: Deployment;
};

export type CreateDeploymentMutationVariables = Exact<{
  input: DeploymentInput;
}>;


export type CreateDeploymentMutation = { __typename?: 'Mutation', createDeployment: { __typename?: 'Deployment', id: string, name: string, description?: string | null, deployer: string } };

export type AdminQueryQueryVariables = Exact<{ [key: string]: never; }>;


export type AdminQueryQuery = { __typename?: 'Query', deployments: Array<{ __typename?: 'Deployment', id: string, name: string, status: DeploymentStatus, deployer: string, description?: string | null, createdAt: string, updatedAt: string }> };

export type IndexQueryQueryVariables = Exact<{ [key: string]: never; }>;


export type IndexQueryQuery = { __typename?: 'Query', deployments: Array<{ __typename?: 'Deployment', id: string, name: string, status: DeploymentStatus, deployer: string, description?: string | null, createdAt: string, updatedAt: string }> };


export const CreateDeploymentDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateDeployment"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"DeploymentInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createDeployment"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"deployer"}}]}}]}}]} as unknown as DocumentNode<CreateDeploymentMutation, CreateDeploymentMutationVariables>;
export const AdminQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"AdminQuery"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deployments"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"deployer"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<AdminQueryQuery, AdminQueryQueryVariables>;
export const IndexQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"IndexQuery"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deployments"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"deployer"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<IndexQueryQuery, IndexQueryQueryVariables>;