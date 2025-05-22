import { createLazyFileRoute } from "@tanstack/react-router";
import { Separator } from "@/components/ui/separator";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { gql, useQuery, useSubscription } from "@apollo/client";
import {
  DeploymentStatus,
  type IndexDeploymentCreatedSubscription,
  type IndexDeploymentCreatedSubscriptionVariables,
  type IndexDeploymentDeletedSubscription,
  type IndexDeploymentDeletedSubscriptionVariables,
  type IndexDeploymentUpdatedSubscription,
  type IndexDeploymentUpdatedSubscriptionVariables,
  type IndexPageQuery,
} from "@repo/types/graphql";
import { useLayoutEffect, useState, useRef, useEffect } from "react";
import { LinkifyText } from "@/components/LinkifyText";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { DeploymentFlow } from '@/components/DeploymentFlow';

export const Route = createLazyFileRoute("/")({
  component: Index,
});

const Query = gql`
  query IndexPage {
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
  subscription IndexDeploymentCreated {
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
  subscription IndexDeploymentUpdated {
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
  subscription IndexDeploymentDeleted {
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

function Index() {
  const [deploymentList, setDeploymentList] = useState<
    IndexPageQuery["deployments"]
  >([]);
  const {
    data = { deployments: [], document: { title: "", description: "" } },
  } = useQuery<IndexPageQuery>(Query);
  const [updatedIds, setUpdatedIds] = useState<Set<string>>(new Set());
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Clear animation states after delay
  useEffect(() => {
    if (updatedIds.size > 0) {
      const timer = setTimeout(() => {
        setUpdatedIds(new Set());
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [updatedIds]);

  // Simulated live updates for visual effect
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      if (deploymentList.length > 0) {
        const randomIndex = Math.floor(Math.random() * deploymentList.length);
        const updatedDeployment = { ...deploymentList[randomIndex] };

        // Visual pulse effect only - not changing actual status
        setUpdatedIds((prev) => new Set(prev).add(updatedDeployment.id));
      }
    }, 8000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [deploymentList]);

  useSubscription<
    IndexDeploymentCreatedSubscription,
    IndexDeploymentCreatedSubscriptionVariables
  >(CreatedSubscription, {
    onData: (response) => {
      const { data: subscriptionData } = response;
      const { data = { deploymentCreated: [] } } = subscriptionData;
      const { deploymentCreated = [] } = data;

      // Add to updated IDs for animation
      if (deploymentCreated.length > 0) {
        setUpdatedIds(
          (prev) => new Set(Array.from(prev).concat(deploymentCreated[0].id))
        );
      }

      setDeploymentList((prev) => [deploymentCreated[0], ...prev]);
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

      if (deploymentUpdated.length > 0) {
        // Add to updated IDs for animation
        setUpdatedIds(
          (prev) => new Set([...Array.from(prev), deploymentUpdated[0].id])
        );

        setDeploymentList((prev) =>
          prev.map((item) =>
            item.id === deploymentUpdated[0].id ? deploymentUpdated[0] : item
          )
        );
      }
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

      if (deploymentDeleted.length > 0) {
        setDeploymentList((prev) =>
          prev.filter((item) => item.id !== deploymentDeleted[0].id)
        );
      }
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
    <div className="p-8 h-screen bg-gray-50 dark:bg-gray-900">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="shadow-lg border-t-4 border-primary dark:border-primary">
          <CardHeader className="bg-gradient-to-r from-indigo-50 to-secondary dark:from-gray-800 dark:to-gray-700 py-2">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-2xl font-bold text-primary dark:text-primary">
                  {data.document.title || "배포 현황판"}
                </CardTitle>
                <CardDescription className="mt-2">
                  <LinkifyText
                    text={
                      data.document.description ||
                      "실시간 배포 상태를 확인하세요"
                    }
                  />
                </CardDescription>
              </div>
              <div className="flex items-center space-x-2">
                <div className="h-2 w-2 bg-green-600 rounded-full animate-pulse transform-gpu duration-1000" />
                <span className="text-xs text-gray-500">
                  실시간 업데이트 중
                </span>
              </div>
            </div>
          </CardHeader>

          <CardContent className="p-6">
            <DeploymentFlow deployments={deploymentList} />
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
