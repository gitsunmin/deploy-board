import { createLazyFileRoute } from "@tanstack/react-router";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { gql, useQuery } from "@apollo/client";
import type { Query } from "@repo/types/schema";

export const Route = createLazyFileRoute("/")({
  component: Index,
});

type QueryResponse = {
  deployments: Query["deployments"];
};

const Query = gql`
  query IndexQuery {
    deployments {
      id
      name
      status
      deployer
      description
      createdAt
      updatedAt
    }
  }
`;

function Index() {
  const { data = { deployments: [] } } = useQuery<QueryResponse, {}>(Query);

  return (
    <div className="p-4">
      <Card>
        <CardHeader>
          <CardTitle>Deployment List</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-4">
            {data.deployments.map((dep) => {
              console.log("dep:", dep);
              return (
                <li key={dep.id} className="py-2">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">{dep.name}</span>
                    <span className="text-sm text-gray-500">{dep.status}</span>
                  </div>
                  <Separator />
                </li>
              );
            })}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
