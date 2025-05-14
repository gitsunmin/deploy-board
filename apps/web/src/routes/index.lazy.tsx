import { createLazyFileRoute } from "@tanstack/react-router";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { gql, useQuery, useSubscription } from "@apollo/client";
import type {
  IndexDeploymentCreatedSubscription,
  IndexDeploymentCreatedSubscriptionVariables,
  IndexDeploymentDeletedSubscription,
  IndexDeploymentDeletedSubscriptionVariables,
  IndexDeploymentUpdatedSubscription,
  IndexDeploymentUpdatedSubscriptionVariables,
  IndexPageQuery,
} from "@repo/types/graphql";
import { useLayoutEffect, useState } from "react";

export const Route = createLazyFileRoute("/")({
  component: Index,
});

const Query = gql`
  query IndexPage {
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

const CreatedSubscription = gql`
  subscription IndexDeploymentCreated {
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

const UpdatedSubscription = gql`
  subscription IndexDeploymentUpdated {
    deploymentUpdated {
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

const DeletedSubscription = gql`
  subscription IndexDeploymentDeleted {
    deploymentDeleted {
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
  const [deploymentList, setDeploymentList] = useState<
    IndexPageQuery["deployments"]
  >([]);
  const { data = { deployments: [] } } = useQuery<IndexPageQuery>(Query);

  useSubscription<
    IndexDeploymentCreatedSubscription,
    IndexDeploymentCreatedSubscriptionVariables
  >(CreatedSubscription, {
    onData: (response) => {
      const { data: subscriptionData } = response;
      const { data = { deploymentCreated: [] } } = subscriptionData;
      const { deploymentCreated = [] } = data;
      setDeploymentList(deploymentCreated);
    },
    shouldResubscribe: true,
    errorPolicy: "all",
  });

  useSubscription<
    IndexDeploymentUpdatedSubscription,
    IndexDeploymentUpdatedSubscriptionVariables
  >(UpdatedSubscription, {
    onData: (response) => {
      const { data: subscriptionData } = response;
      const { data = { deploymentUpdated: [] } } = subscriptionData;
      const { deploymentUpdated = [] } = data;
      setDeploymentList(deploymentUpdated);
    },
    shouldResubscribe: true,
    errorPolicy: "all",
  });

  useSubscription<
    IndexDeploymentDeletedSubscription,
    IndexDeploymentDeletedSubscriptionVariables
  >(DeletedSubscription, {
    onData: (response) => {
      const { data: subscriptionData } = response;
      const { data = { deploymentDeleted: [] } } = subscriptionData;
      const { deploymentDeleted = [] } = data;
      setDeploymentList(deploymentDeleted);
    },
    shouldResubscribe: true,
    errorPolicy: "all",
  });

  useLayoutEffect(() => {
    if (data.deployments.length > 0) {
      setDeploymentList(data.deployments);
    }
  }, [data.deployments]);

  return (
    <div className="p-4">
      <Card>
        <CardHeader>
          <CardTitle>Deployment List</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-4">
            {deploymentList.map((dep) => {
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
