import { ApolloClient, ApolloLink, type FetchResult, HttpLink, InMemoryCache, NextLink, Observable, type Operation, split } from '@apollo/client';
import { getMainDefinition } from '@apollo/client/utilities';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { createClient } from 'graphql-ws';
import { ENV } from '@repo/env';

const httpLink = new HttpLink({
    uri: `${ENV.SERVER_URI}:${ENV.SERVER_PORT}/graphql`
});

const wsLink = new GraphQLWsLink(createClient({
    url: `${ENV.WS_SERVER_URI}:${ENV.WS_SERVER_PORT}/subscriptions`,
}));

// 분할 링크
const splitLink = split(
    ({ query }) => {
        const definition = getMainDefinition(query);
        return (
            definition.kind === 'OperationDefinition' &&
            definition.operation === 'subscription'
        );
    },
    wsLink,
    httpLink,
);

export const apolloClient = new ApolloClient({
    link: splitLink,
    cache: new InMemoryCache(),
});