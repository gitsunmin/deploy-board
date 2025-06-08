import { createFileRoute, Link, useLoaderData } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'
import { gql, useMutation, useQuery } from '@apollo/client'
import { match } from 'ts-pattern'
import { DeploymentCompleteMutation, DeploymentCompleteMutationVariables, DeploymentQuery, DeploymentQueryVariables, DeploymentStatus } from '@repo/types/graphql'

const DEPLOYMENT_QUERY = gql`
    query Deployment($deployId: ID!) {
        node(id: $deployId) {
            __typename
            ... on Deployment {
                id
                name
                description
                deployer
                status
                dependsOn
            }
        }
    }
`
const DEPLOYMENT_MUTATION = gql`
    mutation DeploymentComplete($id: ID!, $input: DeploymentInput!) {
        updateDeployment(id: $id, input: $input) {
            id
            name
            description
            deployer
        }
    }
`

type Params = {
    deployId: string
}

export const Route = createFileRoute('/_layout/admin/deployment/$deployId')({
    component: RouteComponent,
    loader: async ({ params }): Promise<Params> => ({ deployId: params.deployId })
})

function RouteComponent() {
    const { deployId } = useLoaderData({
        from: '/_layout/admin/deployment/$deployId',
    })
    const { data } = useQuery<DeploymentQuery, DeploymentQueryVariables>(DEPLOYMENT_QUERY, {
        variables: { deployId },
    })

    const [updateDeployment] = useMutation<DeploymentCompleteMutation, DeploymentCompleteMutationVariables>(DEPLOYMENT_MUTATION, {
        onCompleted: (data) => {
            setIsDeployed(true)

            setTimeout(() => {
                setShowConfetti(true)
            }, 300)
        },
        onError: (error) => {
            console.error('배포 완료 중 오류 발생:', error)
        }
    })

    const [isDeployed, setIsDeployed] = useState(
        () => match(data)
            .with(
                { node: { __typename: 'Deployment' } },
                ({ node }) => node.status === DeploymentStatus.Success
            )
            .otherwise(() => false)
    );
    const [showConfetti, setShowConfetti] = useState(false);

    // Add these new state variables
    const [isPressed, setIsPressed] = useState(false);
    const [pressProgress, setPressProgress] = useState(0);
    const [pressTimer, setPressTimer] = useState<NodeJS.Timeout | null>(null);

    const handleDeployComplete = (input: DeploymentCompleteMutationVariables['input']) => () => {
        updateDeployment({
            variables: {
                id: deployId,
                input,
            },
        })
    }

    // Press and hold handlers
    const handlePressStart = (node: NonNullable<DeploymentQuery['node']>) => () => {
        setIsPressed(true);
        setPressProgress(0);

        // Clear any existing timer
        if (pressTimer) clearInterval(pressTimer);

        // Set up progress timer (3 seconds total)
        const timer = setInterval(() => {
            setPressProgress(prev => {
                const newProgress = prev + (100 / 30); // 100% in 3 seconds (30 * 100ms)

                if (newProgress >= 100) {
                    clearInterval(timer);
                    handleDeployComplete({
                        name: node.name,
                        deployer: node.deployer,
                        status: DeploymentStatus.Success,
                        description: node.description ?? '',
                        dependsOn: node.dependsOn ?? [],
                    })();
                    return 100;
                }
                return newProgress;
            });
        }, 100);

        setPressTimer(timer);
    };

    const handlePressEnd = () => {
        if (pressProgress < 100) { // Only cancel if not complete
            setIsPressed(false);
            setPressProgress(0);

            if (pressTimer) {
                clearInterval(pressTimer);
                setPressTimer(null);
            }
        }
    };

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            if (pressTimer) clearInterval(pressTimer);
        };
    }, [pressTimer]);

    useEffect(() => {
        setIsDeployed(match(data)
            .with(
                { node: { __typename: 'Deployment' } },
                ({ node }) => node.status === DeploymentStatus.Success
            )
            .otherwise(() => false))
    }, [data]);

    return match(data)
        .with({ node: { __typename: 'Deployment' } }, ({ node }) => {
            return (
                <div className="container mx-auto py-10 px-4 relative overflow-hidden min-h-[70vh] flex flex-col items-center justify-center">
                    <Card className="w-full max-w-2xl mx-auto">
                        <CardHeader>
                            <CardTitle className="text-2xl font-bold">{`"${node.name}"`}</CardTitle>
                            <CardDescription>
                                배포 완료를 위해 아래 버튼을 3초간 눌러주세요.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="flex flex-col items-center">
                            <AnimatePresence mode="wait">
                                {!isDeployed ? (
                                    <motion.div
                                        key="deployButton"
                                        initial={{ scale: 0.9, opacity: 0 }}
                                        animate={{ scale: 1, opacity: 1 }}
                                        exit={{ scale: 0.9, opacity: 0 }}
                                        className="w-full flex justify-center"
                                    >
                                        <div className="relative w-full max-w-md">
                                            <Button
                                                size="lg"
                                                className={cn(
                                                    "mt-4 text-xl py-8 px-12 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 shadow-lg transition-all duration-300 w-full max-w-md font-bold relative overflow-hidden",
                                                    isPressed ? "transform scale-[0.98]" : ""
                                                )}
                                                onMouseDown={handlePressStart(node)}
                                                onMouseUp={handlePressEnd}
                                                onMouseLeave={handlePressEnd}
                                                onTouchStart={handlePressStart(node)}
                                                onTouchEnd={handlePressEnd}
                                                type="button"
                                            >
                                                {isPressed ? <motion.div
                                                    className="font-medium text-white"
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                >
                                                    {pressProgress < 100 ? "계속 누르세요..." : "완료!"}
                                                </motion.div> : "배포 완료"}
                                                {/* 배포 완료 */}
                                                {isPressed && (
                                                    <motion.div
                                                        className="absolute bottom-0 left-0 h-2 bg-white bg-opacity-70"
                                                        style={{ width: `${pressProgress}%` }}
                                                        initial={{ width: "0%" }}
                                                        animate={{ width: `${pressProgress}%` }}
                                                    />
                                                )}
                                            </Button>

                                        </div>
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        key="successMessage"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="text-center py-8 w-full"
                                    >
                                        <motion.div
                                            className="text-5xl mb-4"
                                            animate={{
                                                scale: [1, 1.2, 1],
                                                rotate: [0, 10, -10, 0]
                                            }}
                                            transition={{
                                                duration: 0.5,
                                                repeat: 2,
                                                repeatType: "reverse"
                                            }}
                                        >
                                            🎉
                                        </motion.div>
                                        <motion.h2
                                            className="text-2xl font-bold text-green-600 mb-4"
                                            animate={{
                                                color: ['#16a34a', '#0d9488', '#0284c7', '#16a34a']
                                            }}
                                            transition={{ duration: 3, repeat: Infinity }}
                                        >
                                            배포가 성공적으로 완료되었습니다!
                                        </motion.h2>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                            <Link to='' href={`/admin`} className={cn(`text-sm text-gray-500 hover:text-gray-700 transition-colors duration-200 hover:underline pt-8`, {
                                'hidden': !isDeployed
                            })}>
                                잘못 눌렀습니다..
                            </Link>
                        </CardContent>
                    </Card>

                    {/* 컨페티 애니메이션 */}
                    <AnimatePresence>
                        {showConfetti && (
                            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                                {[...Array(50)].map((_, i) => {
                                    const size = Math.random() * 12 + 8;
                                    const color = [
                                        'bg-blue-500', 'bg-green-500', 'bg-yellow-500',
                                        'bg-pink-500', 'bg-purple-500', 'bg-red-500'
                                    ][Math.floor(Math.random() * 6)];

                                    return (
                                        <motion.div
                                            key={i}
                                            className={cn("absolute rounded-md rotate-45", color)}
                                            style={{
                                                width: size,
                                                height: size,
                                                left: `${Math.random() * 100}%`,
                                            }}
                                            initial={{
                                                opacity: 0,
                                                y: -20,
                                                x: 0
                                            }}
                                            animate={{
                                                opacity: [0, 1, 0],
                                                y: ['0vh', '100vh'],
                                                x: [0, (Math.random() - 0.5) * 200],
                                                rotate: [45, 45 + Math.random() * 360]
                                            }}
                                            transition={{
                                                duration: Math.random() * 2 + 2,
                                                delay: Math.random() * 0.5,
                                                ease: "easeOut"
                                            }}
                                        />
                                    );
                                })}
                            </div>
                        )}
                    </AnimatePresence>
                </div >
            )
        })
        .otherwise(() => <></>)

}
