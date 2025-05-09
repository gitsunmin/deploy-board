import { getDeploymentsRequest } from "@/apiClient/deployment/client";
import { AddDeploymentForm } from "@/components/AddDeploymentForm";
import { UpdateDeploymentForm } from "@/components/UpdateDeploymentForm";
import { gql, useQuery } from "@apollo/client";
import type { Query } from "@repo/types/schema";
import { createFileRoute } from "@tanstack/react-router";

type QueryResponse = {
  deployments: Query["deployments"];
};

const Query = gql`
  query AdminQuery {
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

export const Route = createFileRoute("/_layout/admin/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { data = { deployments: [] } } = useQuery<QueryResponse, {}>(Query);

  return (
    <div className="p-4">
      <ul className="space-y-4">
        {data.deployments.map((dep) => (
          <li key={dep.id} className="py-2">
            <UpdateDeploymentForm data={dep} />
          </li>
        ))}
      </ul>
      <AddDeploymentForm />
    </div>
  );
}
