import { createFileRoute, useLoaderData } from '@tanstack/react-router'
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

    const handleDeployComplete = (input: DeploymentCompleteMutationVariables['input']) => () => {
        updateDeployment({
            variables: {
                id: deployId,
                input,
            },
        })
    }

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
                                배포 완료를 위해 아래 버튼을 클릭하세요
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
                                        <Button
                                            size="lg"
                                            className="mt-4 text-xl py-8 px-12 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1 active:translate-y-0 active:shadow-md w-full max-w-md font-bold"
                                            onClick={handleDeployComplete({
                                                name: node.name,
                                                deployer: node.deployer,
                                                status: DeploymentStatus.Success,
                                                description: node.description ?? '',
                                                dependsOn: node.dependsOn ?? [],
                                            })}
                                        >
                                            배포 완료
                                        </Button>
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
