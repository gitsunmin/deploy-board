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
import type {
  IndexDocumentUpdatedSubscription,
  IndexDocumentUpdatedSubscriptionVariables,
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
import { DeploymentFlow } from '@/components/DeploymentFlow';
import { DeploymentStatus } from '@repo/types/schema';


// 파티클 효과 컴포넌트
function CelebrationEffect() {
  const [particles, setParticles] = useState<React.ReactNode[]>([]);

  useEffect(() => {
    // 파티클 생성
    const newParticles = [];
    const colors = ['#f59e0b', '#10b981', '#3b82f6', '#ec4899', '#8b5cf6'];

    for (let i = 0; i < 50; i++) {
      const size = Math.random() * 10 + 5;
      const color = colors[Math.floor(Math.random() * colors.length)];
      const xPos = Math.random() * 100;
      const delay = Math.random() * 1;
      const duration = Math.random() * 2 + 2;

      newParticles.push(
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: size,
            height: size,
            backgroundColor: color,
            left: `${xPos}%`,
            top: '-20px'
          }}
          initial={{ y: -20, opacity: 0 }}
          animate={{
            y: ['0%', '100%'],
            opacity: [0, 1, 0],
            rotate: [0, 360]
          }}
          transition={{
            duration: duration,
            delay: delay,
            repeat: 1,
            repeatDelay: Math.random() * 2
          }}
        />
      );
    }

    setParticles(newParticles);
  }, []);

  return <div className="absolute inset-0 overflow-hidden pointer-events-none">{particles}</div>;
}

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

const UpdatedDocumentSubscription = gql`
  subscription IndexDocumentUpdated {
    documentUpdated {
      title
      description
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
  const [document, setDocument] = useState({
    title: "",
    description: "",
  });
  const allServicesDeployed = deploymentList.every(
    (deployment) => deployment.status === DeploymentStatus.Success
  );

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

  useSubscription<IndexDocumentUpdatedSubscription, IndexDocumentUpdatedSubscriptionVariables>(UpdatedDocumentSubscription, {
    onData: ({ data: subscriptionData }) => {
      const { data } = subscriptionData;
      if (data && data?.documentUpdated !== null) {
        const { documentUpdated } = data;
        setDocument((prev) => ({
          ...prev,
          title: documentUpdated.title || prev.title,
          description: documentUpdated.description || prev.description,
        }));
      }
    }
  })

  useLayoutEffect(() => {
    if (data.deployments.length > 0) {
      setDeploymentList(data.deployments);
    }
    if (data.document?.title && data.document.description) {
      setDocument({
        title: data.document.title || "",
        description: data.document.description || "",
      });
    }
  }, [data.deployments, data.document]);

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
                  {document.title || "배포 현황판"}
                </CardTitle>
                <CardDescription className="mt-2">
                  <LinkifyText
                    text={
                      document.description ||
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

            <AnimatePresence>
              {allServicesDeployed && deploymentList.length > 0 && (
                <motion.div
                  className="absolute inset-0 bg-black/10 backdrop-blur-sm rounded-lg flex flex-col items-center justify-center z-10"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <motion.div
                    className="text-center"
                    initial={{ scale: 0.8, y: 20 }}
                    animate={{ scale: 1, y: 0 }}
                    transition={{
                      type: "spring",
                      stiffness: 200,
                      damping: 15,
                      delay: 0.2
                    }}
                  >
                    <motion.div
                      className="text-6xl mb-3"
                      animate={{
                        rotate: [0, 10, -10, 10, 0],
                        scale: [1, 1.2, 1, 1.1, 1]
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: 1,
                        repeatDelay: 3
                      }}
                    >
                      🎉
                    </motion.div>
                    <motion.h2
                      className="text-3xl font-bold text-green-600 mb-2"
                      animate={{
                        color: ['#15803d', '#047857', '#0891b2', '#15803d']
                      }}
                      transition={{ duration: 3, repeat: 1 }}
                    >
                      모든 배포 완료!
                    </motion.h2>
                    <motion.p
                      className="text-gray-700 dark:text-gray-300 max-w-md mx-auto"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5 }}
                    >
                      모든 서비스가 성공적으로 배포되었습니다.
                    </motion.p>
                  </motion.div>

                  {/* 배경 파티클 효과 */}
                  <CelebrationEffect />
                </motion.div>
              )}
            </AnimatePresence>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
