import type { GraphQLResolveInfo } from "graphql";
import type { MercuriusContext } from "mercurius";
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) =>
  | Promise<import("mercurius-codegen").DeepPartial<TResult>>
  | import("mercurius-codegen").DeepPartial<TResult>;
export type RequireFields<T, K extends keyof T> = Omit<T, K> & {
  [P in K]-?: NonNullable<T[P]>;
};
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  _FieldSet: any;
};

export type Node = {
  id: Scalars["ID"];
};

export type Document = {
  __typename?: "Document";
  title: Scalars["String"];
  description: Scalars["String"];
};

export type Deployment = Node & {
  __typename?: "Deployment";
  id: Scalars["ID"];
  name: Scalars["String"];
  description?: Maybe<Scalars["String"]>;
  status: DeploymentStatus;
  deployer: Scalars["String"];
  createdAt: Scalars["String"];
  updatedAt: Scalars["String"];
  dependsOn?: Maybe<Array<Scalars["ID"]>>;
};

export enum DeploymentStatus {
  YET = "YET",
  PENDING = "PENDING",
  IN_PROGRESS = "IN_PROGRESS",
  SUCCESS = "SUCCESS",
  FAILED = "FAILED",
}

export type DeploymentInput = {
  name: Scalars["String"];
  description: Scalars["String"];
  deployer: Scalars["String"];
  status: DeploymentStatus;
  dependsOn?: InputMaybe<Array<Scalars["ID"]>>;
};

export type DocumentInput = {
  title: Scalars["String"];
  description: Scalars["String"];
};

export type Query = {
  __typename?: "Query";
  node?: Maybe<Node>;
  document: Document;
  deployments: Array<Deployment>;
};

export type QuerynodeArgs = {
  id: Scalars["ID"];
};

export type Mutation = {
  __typename?: "Mutation";
  createDeployment: Deployment;
  updateDeployment: Deployment;
  deleteDeployment: Scalars["Boolean"];
  updateDocument: Document;
};

export type MutationcreateDeploymentArgs = {
  input: DeploymentInput;
};

export type MutationupdateDeploymentArgs = {
  id: Scalars["ID"];
  input: DeploymentInput;
};

export type MutationdeleteDeploymentArgs = {
  id: Scalars["ID"];
};

export type MutationupdateDocumentArgs = {
  input: DocumentInput;
};

export type Subscription = {
  __typename?: "Subscription";
  documentUpdated: Document;
  deploymentUpdated: Array<Deployment>;
  deploymentCreated: Array<Deployment>;
  deploymentDeleted: Array<Deployment>;
};

export type ResolverTypeWrapper<T> = Promise<T> | T;

export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<
  TResult,
  TKey extends string,
  TParent,
  TContext,
  TArgs,
> {
  subscribe: SubscriptionSubscribeFn<
    { [key in TKey]: TResult },
    TParent,
    TContext,
    TArgs
  >;
  resolve?: SubscriptionResolveFn<
    TResult,
    { [key in TKey]: TResult },
    TContext,
    TArgs
  >;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<
  TResult,
  TKey extends string,
  TParent,
  TContext,
  TArgs,
> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<
  TResult,
  TKey extends string,
  TParent = {},
  TContext = {},
  TArgs = {},
> =
  | ((
      ...args: any[]
    ) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo,
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (
  obj: T,
  context: TContext,
  info: GraphQLResolveInfo,
) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<
  TResult = {},
  TParent = {},
  TContext = {},
  TArgs = {},
> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Node: ResolversTypes["Deployment"];
  ID: ResolverTypeWrapper<Scalars["ID"]>;
  Document: ResolverTypeWrapper<Document>;
  String: ResolverTypeWrapper<Scalars["String"]>;
  Deployment: ResolverTypeWrapper<Deployment>;
  DeploymentStatus: DeploymentStatus;
  DeploymentInput: DeploymentInput;
  DocumentInput: DocumentInput;
  Query: ResolverTypeWrapper<{}>;
  Mutation: ResolverTypeWrapper<{}>;
  Boolean: ResolverTypeWrapper<Scalars["Boolean"]>;
  Subscription: ResolverTypeWrapper<{}>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Node: ResolversParentTypes["Deployment"];
  ID: Scalars["ID"];
  Document: Document;
  String: Scalars["String"];
  Deployment: Deployment;
  DeploymentInput: DeploymentInput;
  DocumentInput: DocumentInput;
  Query: {};
  Mutation: {};
  Boolean: Scalars["Boolean"];
  Subscription: {};
};

export type NodeResolvers<
  ContextType = MercuriusContext,
  ParentType extends
    ResolversParentTypes["Node"] = ResolversParentTypes["Node"],
> = {
  resolveType: TypeResolveFn<"Deployment", ParentType, ContextType>;
  id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
};

export type DocumentResolvers<
  ContextType = MercuriusContext,
  ParentType extends
    ResolversParentTypes["Document"] = ResolversParentTypes["Document"],
> = {
  title?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  description?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type DeploymentResolvers<
  ContextType = MercuriusContext,
  ParentType extends
    ResolversParentTypes["Deployment"] = ResolversParentTypes["Deployment"],
> = {
  id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  name?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  description?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  status?: Resolver<
    ResolversTypes["DeploymentStatus"],
    ParentType,
    ContextType
  >;
  deployer?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  dependsOn?: Resolver<
    Maybe<Array<ResolversTypes["ID"]>>,
    ParentType,
    ContextType
  >;
  isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<
  ContextType = MercuriusContext,
  ParentType extends
    ResolversParentTypes["Query"] = ResolversParentTypes["Query"],
> = {
  node?: Resolver<
    Maybe<ResolversTypes["Node"]>,
    ParentType,
    ContextType,
    RequireFields<QuerynodeArgs, "id">
  >;
  document?: Resolver<ResolversTypes["Document"], ParentType, ContextType>;
  deployments?: Resolver<
    Array<ResolversTypes["Deployment"]>,
    ParentType,
    ContextType
  >;
};

export type MutationResolvers<
  ContextType = MercuriusContext,
  ParentType extends
    ResolversParentTypes["Mutation"] = ResolversParentTypes["Mutation"],
> = {
  createDeployment?: Resolver<
    ResolversTypes["Deployment"],
    ParentType,
    ContextType,
    RequireFields<MutationcreateDeploymentArgs, "input">
  >;
  updateDeployment?: Resolver<
    ResolversTypes["Deployment"],
    ParentType,
    ContextType,
    RequireFields<MutationupdateDeploymentArgs, "id" | "input">
  >;
  deleteDeployment?: Resolver<
    ResolversTypes["Boolean"],
    ParentType,
    ContextType,
    RequireFields<MutationdeleteDeploymentArgs, "id">
  >;
  updateDocument?: Resolver<
    ResolversTypes["Document"],
    ParentType,
    ContextType,
    RequireFields<MutationupdateDocumentArgs, "input">
  >;
};

export type SubscriptionResolvers<
  ContextType = MercuriusContext,
  ParentType extends
    ResolversParentTypes["Subscription"] = ResolversParentTypes["Subscription"],
> = {
  documentUpdated?: SubscriptionResolver<
    ResolversTypes["Document"],
    "documentUpdated",
    ParentType,
    ContextType
  >;
  deploymentUpdated?: SubscriptionResolver<
    Array<ResolversTypes["Deployment"]>,
    "deploymentUpdated",
    ParentType,
    ContextType
  >;
  deploymentCreated?: SubscriptionResolver<
    Array<ResolversTypes["Deployment"]>,
    "deploymentCreated",
    ParentType,
    ContextType
  >;
  deploymentDeleted?: SubscriptionResolver<
    Array<ResolversTypes["Deployment"]>,
    "deploymentDeleted",
    ParentType,
    ContextType
  >;
};

export type Resolvers<ContextType = MercuriusContext> = {
  Node?: NodeResolvers<ContextType>;
  Document?: DocumentResolvers<ContextType>;
  Deployment?: DeploymentResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Subscription?: SubscriptionResolvers<ContextType>;
};

export type Loader<TReturn, TObj, TParams, TContext> = (
  queries: Array<{
    obj: TObj;
    params: TParams;
  }>,
  context: TContext & {
    reply: import("fastify").FastifyReply;
  },
) => Promise<Array<import("mercurius-codegen").DeepPartial<TReturn>>>;
export type LoaderResolver<TReturn, TObj, TParams, TContext> =
  | Loader<TReturn, TObj, TParams, TContext>
  | {
      loader: Loader<TReturn, TObj, TParams, TContext>;
      opts?: {
        cache?: boolean;
      };
    };
export interface Loaders<
  TContext = import("mercurius").MercuriusContext & {
    reply: import("fastify").FastifyReply;
  },
> {
  Document?: {
    title?: LoaderResolver<Scalars["String"], Document, {}, TContext>;
    description?: LoaderResolver<Scalars["String"], Document, {}, TContext>;
  };

  Deployment?: {
    id?: LoaderResolver<Scalars["ID"], Deployment, {}, TContext>;
    name?: LoaderResolver<Scalars["String"], Deployment, {}, TContext>;
    description?: LoaderResolver<
      Maybe<Scalars["String"]>,
      Deployment,
      {},
      TContext
    >;
    status?: LoaderResolver<DeploymentStatus, Deployment, {}, TContext>;
    deployer?: LoaderResolver<Scalars["String"], Deployment, {}, TContext>;
    createdAt?: LoaderResolver<Scalars["String"], Deployment, {}, TContext>;
    updatedAt?: LoaderResolver<Scalars["String"], Deployment, {}, TContext>;
    dependsOn?: LoaderResolver<
      Maybe<Array<Scalars["ID"]>>,
      Deployment,
      {},
      TContext
    >;
  };
}
declare module "mercurius" {
  interface IResolvers
    extends Resolvers<import("mercurius").MercuriusContext> {}
  interface MercuriusLoaders extends Loaders {}
}
