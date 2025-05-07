import { Environment, type FetchFunction, Network } from 'relay-runtime';
import { HTTP_ENDPOINT } from '@/constants/deployment';

export const fetchGraphQL: FetchFunction = async (request, variables) => {
  const resp = await fetch(HTTP_ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query: request.text, variables }),
  });
  if (!resp.ok) {
    throw new Error('Response failed.');
  }
  return await resp.json();
};

export const environment = new Environment({
  network: Network.create(fetchGraphQL),
});
