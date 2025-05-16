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
  IndexDeploymentCreatedSubscription,
  IndexDeploymentCreatedSubscriptionVariables,
  IndexDeploymentDeletedSubscription,
  IndexDeploymentDeletedSubscriptionVariables,
  IndexDeploymentUpdatedSubscription,
  IndexDeploymentUpdatedSubscriptionVariables,
  IndexPageQuery,
} from "@repo/types/graphql";
import { useLayoutEffect, useState, useRef, useEffect } from "react";
import { LinkifyText } from "@/components/LinkifyText";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

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

  // Helper function to get status color
  const getStatusStyles = (status: DeploymentStatus) => {
    switch (status) {
      case DeploymentStatus.InProgress:
        return "bg-green-100 text-green-800 border-green-300";
      case DeploymentStatus.Pending:
        return "bg-yellow-100 text-yellow-800 border-yellow-300";
      case DeploymentStatus.Failed:
        return "bg-red-100 text-red-800 border-red-300";
      case DeploymentStatus.Success:
        return "bg-blue-100 text-blue-800 border-blue-300";
      case DeploymentStatus.Yet:
        return "bg-gray-100 text-gray-800 border-gray-300";
      default:
        return "bg-gray-100 text-gray-800 border-gray-300";
    }
  };

  // Helper function for status icon
  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case "running":
        return (
          <svg className="w-4 h-4 animate-spin mr-1" viewBox="0 0 24 24">
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
              fill="none"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        );
      case "pending":
        return (
          <svg
            className="w-4 h-4 animate-pulse mr-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        );
      case "failed":
        return (
          <svg
            className="w-4 h-4 mr-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        );
      case "completed":
        return (
          <svg
            className="w-4 h-4 mr-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <div className="m-4 p-4 min-h-screen bg-gray-50 dark:bg-gray-900">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="shadow-lg border-t-4 border-indigo-500">
          <CardHeader className="bg-gradient-to-r from-indigo-50 to-blue-50 dark:from-gray-800 dark:to-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-2xl font-bold text-indigo-700 dark:text-indigo-400">
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
                <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-xs text-gray-500">
                  실시간 업데이트 중
                </span>
              </div>
            </div>
          </CardHeader>

          <CardContent className="p-6">
            <AnimatePresence>
              {deploymentList.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="p-8 text-center text-gray-500"
                >
                  현재 활성화된 배포가 없습니다
                </motion.div>
              ) : (
                <ul className="space-y-4">
                  <AnimatePresence>
                    {deploymentList.map((dep) => {
                      // const isUpdated = updatedIds.has(dep.id);

                      return (
                        <motion.li
                          key={dep.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{
                            opacity: 1,
                            x: 0,
                            // backgroundColor: isUpdated
                            //   ? [
                            //       "rgba(236, 253, 245, 0)",
                            //       "rgba(236, 253, 245, 1)",
                            //       "rgba(236, 253, 245, 0)",
                            //     ]
                            //   : "transparent",
                          }}
                          exit={{ opacity: 0, x: 20 }}
                          transition={{
                            default: { duration: 0.4 },
                            backgroundColor: {
                              duration: 2,
                              times: [0, 0.5, 1],
                            },
                          }}
                          className={cn(
                            "rounded-lg border p-4 shadow-sm transition-all duration-300"
                            // isUpdated ? "border-indigo-300" : "border-gray-200"
                          )}
                        >
                          <div className="flex justify-between items-center">
                            <div className="flex flex-col">
                              <span className="font-semibold text-lg flex items-center">
                                {dep.name}
                                {/* {isUpdated && (
                                  <motion.span
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    className="ml-2 text-xs px-1.5 py-0.5 bg-indigo-100 text-indigo-800 rounded-full"
                                  >
                                    업데이트
                                  </motion.span>
                                )} */}
                              </span>
                              {dep.description && (
                                <span className="text-sm text-gray-500 mt-1">
                                  {dep.description}
                                </span>
                              )}
                              <span className="text-xs text-gray-400 mt-1">
                                배포자: {dep.deployer || "시스템"} |{" "}
                                {new Date(
                                  dep.updatedAt || dep.createdAt
                                ).toLocaleString("ko-KR")}
                              </span>
                            </div>

                            <div className="flex items-center">
                              <span
                                className={cn(
                                  "text-sm px-3 py-1 rounded-full border flex items-center",
                                  getStatusStyles(dep.status)
                                )}
                              >
                                {getStatusIcon(dep.status)}
                                {dep.status}
                              </span>
                            </div>
                          </div>
                        </motion.li>
                      );
                    })}
                  </AnimatePresence>
                </ul>
              )}
            </AnimatePresence>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
