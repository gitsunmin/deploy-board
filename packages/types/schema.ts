import { GraphQLResolveInfo } from 'graphql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type Deployment = Node & {
  readonly __typename?: 'Deployment';
  readonly createdAt: Scalars['String']['output'];
  readonly deployer: Scalars['String']['output'];
  readonly description?: Maybe<Scalars['String']['output']>;
  readonly id: Scalars['ID']['output'];
  readonly name: Scalars['String']['output'];
  readonly status: DeploymentStatus;
  readonly updatedAt: Scalars['String']['output'];
};

export type DeploymentInput = {
  readonly deployer: Scalars['String']['input'];
  readonly description: Scalars['String']['input'];
  readonly name: Scalars['String']['input'];
  readonly status: DeploymentStatus;
};

export enum DeploymentStatus {
  Failed = 'FAILED',
  InProgress = 'IN_PROGRESS',
  Pending = 'PENDING',
  Success = 'SUCCESS'
}

export type Mutation = {
  readonly __typename?: 'Mutation';
  readonly createDeployment: Deployment;
  readonly deleteDeployment: Scalars['Boolean']['output'];
  readonly updateDeployment: Deployment;
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
  readonly id: Scalars['ID']['output'];
};

export type Query = {
  readonly __typename?: 'Query';
  readonly deployments: ReadonlyArray<Deployment>;
};

export type Subscription = {
  readonly __typename?: 'Subscription';
  readonly deploymentCreated: ReadonlyArray<Deployment>;
  readonly deploymentDeleted: ReadonlyArray<Deployment>;
  readonly deploymentUpdated: ReadonlyArray<Deployment>;
};



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;


/** Mapping of interface types */
export type ResolversInterfaceTypes<_RefType extends Record<string, unknown>> = {
  Node: ( Deployment );
};

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  Deployment: ResolverTypeWrapper<Deployment>;
  DeploymentInput: DeploymentInput;
  DeploymentStatus: DeploymentStatus;
  ID: ResolverTypeWrapper<Scalars['ID']['output']>;
  Mutation: ResolverTypeWrapper<{}>;
  Node: ResolverTypeWrapper<ResolversInterfaceTypes<ResolversTypes>['Node']>;
  Query: ResolverTypeWrapper<{}>;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  Subscription: ResolverTypeWrapper<{}>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Boolean: Scalars['Boolean']['output'];
  Deployment: Deployment;
  DeploymentInput: DeploymentInput;
  ID: Scalars['ID']['output'];
  Mutation: {};
  Node: ResolversInterfaceTypes<ResolversParentTypes>['Node'];
  Query: {};
  String: Scalars['String']['output'];
  Subscription: {};
};

export type DeploymentResolvers<ContextType = any, ParentType extends ResolversParentTypes['Deployment'] = ResolversParentTypes['Deployment']> = {
  createdAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  deployer?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  status?: Resolver<ResolversTypes['DeploymentStatus'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  createDeployment?: Resolver<ResolversTypes['Deployment'], ParentType, ContextType, RequireFields<MutationCreateDeploymentArgs, 'input'>>;
  deleteDeployment?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationDeleteDeploymentArgs, 'id'>>;
  updateDeployment?: Resolver<ResolversTypes['Deployment'], ParentType, ContextType, RequireFields<MutationUpdateDeploymentArgs, 'id' | 'input'>>;
};

export type NodeResolvers<ContextType = any, ParentType extends ResolversParentTypes['Node'] = ResolversParentTypes['Node']> = {
  __resolveType: TypeResolveFn<'Deployment', ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  deployments?: Resolver<ReadonlyArray<ResolversTypes['Deployment']>, ParentType, ContextType>;
};

export type SubscriptionResolvers<ContextType = any, ParentType extends ResolversParentTypes['Subscription'] = ResolversParentTypes['Subscription']> = {
  deploymentCreated?: SubscriptionResolver<ReadonlyArray<ResolversTypes['Deployment']>, "deploymentCreated", ParentType, ContextType>;
  deploymentDeleted?: SubscriptionResolver<ReadonlyArray<ResolversTypes['Deployment']>, "deploymentDeleted", ParentType, ContextType>;
  deploymentUpdated?: SubscriptionResolver<ReadonlyArray<ResolversTypes['Deployment']>, "deploymentUpdated", ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  Deployment?: DeploymentResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Node?: NodeResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Subscription?: SubscriptionResolvers<ContextType>;
};

