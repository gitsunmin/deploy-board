import { AddDeploymentForm } from "@/components/forms/AddDeploymentForm";
import { Separator } from "@/components/ui/separator";
import { UpdateDeploymentForm } from "@/components/forms/UpdateDeploymentForm";
import { UpdateDocumentForm } from "@/components/forms/UpdateDocumentForm";
import { gql, useQuery, useSubscription } from "@apollo/client";
import type {
  AdminDeploymentCreatedSubscription,
  AdminDeploymentCreatedSubscriptionVariables,
  AdminDeploymentDeletedSubscription,
  AdminDeploymentDeletedSubscriptionVariables,
  AdminDeploymentUpdatedSubscription,
  AdminDeploymentUpdatedSubscriptionVariables,
  AdminPageQuery,
} from "@repo/types/graphql";
import { createFileRoute, useLayoutEffect } from "@tanstack/react-router";
import { useState } from "react";


const Query = gql`
  query AdminPage {
    document {
      title
      description
    }
    deployments {
      id
      name
      status
      deployer
      description
      dependsOn
      createdAt
      updatedAt
    }
  }
`;

const CreatedSubscription = gql`
  subscription AdminDeploymentCreated {
    deploymentCreated {
      id
      name
      status
      deployer
      description
      dependsOn
      createdAt
      updatedAt
    }
  }
`;

const UpdatedSubscription = gql`
  subscription AdminDeploymentUpdated {
    deploymentUpdated {
      id
      name
      status
      deployer
      description
      dependsOn
      createdAt
      updatedAt
    }
  }
`;

const DeletedSubscription = gql`
  subscription AdminDeploymentDeleted {
    deploymentDeleted {
      id
      name
      status
      deployer
      description
      dependsOn
      createdAt
      updatedAt
    }
  }
`;

export const Route = createFileRoute("/_layout/admin/")({
  component: RouteComponent,
});

function RouteComponent() {
  const [deploymentList, setDeploymentList] = useState<
    AdminPageQuery["deployments"]
  >([]);
  const [document, setDocument] = useState<AdminPageQuery["document"] | null>(
    null
  );
  const { data = { deployments: [], document } } =
    useQuery<AdminPageQuery>(Query);

  useSubscription<
    AdminDeploymentCreatedSubscription,
    AdminDeploymentCreatedSubscriptionVariables
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
    AdminDeploymentUpdatedSubscription,
    AdminDeploymentUpdatedSubscriptionVariables
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
    AdminDeploymentDeletedSubscription,
    AdminDeploymentDeletedSubscriptionVariables
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
    setDocument(data.document);
  }, [data.deployments]);

  return (
    <div className="p-8">
      {data.document && <UpdateDocumentForm data={data.document} />}

      <Separator className="my-8 bg-black py-1 rounded-md" />

      <ul className="space-y-4">
        {deploymentList.map((dep) => (
          <li key={dep.id} className="py-2">
            <UpdateDeploymentForm data={dep} deploymentList={deploymentList} />
          </li>
        ))}
      </ul>
      <AddDeploymentForm deploymentList={deploymentList} />
    </div>
  );
}
