import { ApolloClient, ApolloLink, type FetchResult, HttpLink, InMemoryCache, NextLink, Observable, type Operation, split } from '@apollo/client';
import { getMainDefinition } from '@apollo/client/utilities';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { createClient } from 'graphql-ws';

const httpLink = new HttpLink({
    uri: 'http://localhost:3000/graphql'
});

const wsLink = new GraphQLWsLink(createClient({
    url: 'ws://localhost:3000/subscriptions',
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