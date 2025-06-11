import { ApolloClient, ApolloLink, type FetchResult, HttpLink, InMemoryCache, NextLink, Observable, type Operation, split } from '@apollo/client';
import { getMainDefinition } from '@apollo/client/utilities';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { createClient } from 'graphql-ws';
import { ENV } from '@repo/env';

const serverUrl = new URL(process.env.NODE_ENV === 'development' ? `http://localhost:${ENV.SERVER_PORT}` : ENV.EXTERNAL_SERVER_URL);

const httpLink = new HttpLink({
    uri: `${serverUrl.protocol}//${serverUrl.host}/graphql`
});

const wsLink = new GraphQLWsLink(createClient({
    url: `${serverUrl.protocol.replace('http', 'ws')}//${serverUrl.host}/graphql`,
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