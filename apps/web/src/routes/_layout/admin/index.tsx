import { AddDeploymentForm } from "@/components/AddDeploymentForm";
import { UpdateDeploymentForm } from "@/components/UpdateDeploymentForm";
import { gql, useQuery, useSubscription } from "@apollo/client";
import type { AdminQueryQuery, AdminSubscriptionSubscription } from '@repo/types/graphql';
import { createFileRoute } from "@tanstack/react-router";

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

const Subscription = gql`
  subscription AdminSubscription {
    deploymentCreated {
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
  const { data = { deployments: [] } } = useQuery<AdminQueryQuery>(Query);

  const subscriptionData = useSubscription<AdminSubscriptionSubscription>(Subscription, {
    onComplete: () => {
      console.log("Subscription completed");
    },
    onData: (data) => {
      console.log("onData Subscription data:", data);
    },
    onError: (error) => {
      console.error("Subscription error:", error);
    },
    shouldResubscribe: true,
    errorPolicy: "all",
  });

  console.log("Component Subscription data:", subscriptionData);

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
