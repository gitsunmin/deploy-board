import { Suspense, useCallback, useEffect, useState } from 'react';
import ReactFlow, {
    ReactFlowProvider,
    Background,
    Controls,
    type Node,
    type NodeTypes,
    Position,
    useEdgesState,
    useNodesState,
    Panel,
    MarkerType,
    Handle,
    useReactFlow,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { type Deployment, DeploymentStatus } from '@repo/types/graphql';
import { cn } from '@/lib/utils';

// 커스텀 노드 유형 정의
const nodeTypes: NodeTypes = {
    deploymentNode: DeploymentNode,
};

// 각 상태별 스타일 적용
const getStatusStyles = (status: DeploymentStatus) => {
    switch (status) {
        case DeploymentStatus.InProgress:
            return "bg-blue-100 text-blue-800 border-blue-300";
        case DeploymentStatus.Pending:
            return "bg-yellow-100 text-yellow-800 border-yellow-300";
        case DeploymentStatus.Failed:
            return "bg-red-100 text-red-800 border-red-300";
        case DeploymentStatus.Success:
            return "bg-green-100 text-green-800 border-green-300";
        case DeploymentStatus.Yet:
            return "bg-gray-100 text-gray-800 border-gray-300";
        default:
            return "bg-gray-100 text-gray-800 border-gray-300";
    }
};

// 배포 노드 컴포넌트
function DeploymentNode({ data }: {
    data: {
        label: string;
        status: DeploymentStatus;
        description?: string;
        deployer?: string;
    }
}) {
    const isInProgress = data.status === DeploymentStatus.InProgress;

    return (
        <div className={cn(
            "p-4 rounded-md border-2 shadow-md min-w-[180px] relative",
            isInProgress ? "animate-pulse" : "",  // 진행 중인 상태는 깜빡이게
            getStatusStyles(data.status)
        )}>
            {/* 왼쪽(들어오는 연결선) 핸들 */}
            <Handle
                type="target"
                position={Position.Left}
                style={{ background: '#555', width: '10px', height: '10px' }}
                isConnectable={false}
            />

            <div className="font-bold">{data.label}</div>
            {data.description && (
                <div className="text-xs mt-1 truncate max-w-[180px]">{data.description}</div>
            )}
            {data.deployer && (
                <div className="text-xs mt-1 flex items-center">
                    <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <title>Deployer icon</title>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    <span>{data.deployer}</span>
                </div>
            )}
            <div className="text-xs mt-1 font-semibold">{data.status}</div>

            {/* 오른쪽(나가는 연결선) 핸들 */}
            <Handle
                type="source"
                position={Position.Right}
                style={{ background: '#555', width: '10px', height: '10px' }}
                isConnectable={false}
            />
        </div>
    );
}


type DeploymentFlowProps = {
    deployments: Deployment[];
    className?: string;
};

function Content({ deployments, className }: DeploymentFlowProps) {
    const [nodes, setNodes, onNodesChange] = useNodesState([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);
    const [layouting, setLayouting] = useState(false);
    const reactFlowInstance = useReactFlow();

    // 노드 및 엣지 생성 함수
    const createNodesAndEdges = useCallback(() => {
        if (!deployments.length) return;

        // 초기 위치 계산을 위한 값
        const initialX = 100;
        const initialY = 100;
        const xSpacing = 250;
        const ySpacing = 150;

        // 각 레벨(의존성 깊이)별 노드 카운트
        const levelCounts: Record<number, number> = {};

        // 각 배포의 의존성 깊이 계산
        const nodeDepths: Record<string, number> = {};

        // 의존성이 없는 배포는 0레벨
        for (const dep of deployments) {
            if (!dep.dependsOn || dep.dependsOn.length === 0) {
                nodeDepths[dep.id] = 0;
                levelCounts[0] = (levelCounts[0] || 0) + 1;
            }
        }

        // 의존성이 있는 배포의 깊이 계산
        let changed = true;
        while (changed) {
            changed = false;
            for (const dep of deployments) {
                if (nodeDepths[dep.id] !== undefined) continue;

                // 모든 의존성이 이미 깊이가 계산됐는지 확인
                if (dep.dependsOn?.every(depId => nodeDepths[depId] !== undefined)) {
                    // 이 노드의 깊이는 의존성의 최대 깊이 + 1
                    const maxDepth = Math.max(...dep.dependsOn.map(depId => nodeDepths[depId] || 0));
                    nodeDepths[dep.id] = maxDepth + 1;
                    levelCounts[maxDepth + 1] = (levelCounts[maxDepth + 1] || 0) + 1;
                    changed = true;
                }
            }
        }

        // 순환 의존성이나 계산되지 않은 노드에 대한 처리
        for (const dep of deployments) {
            if (nodeDepths[dep.id] === undefined) {
                nodeDepths[dep.id] = 0;
                levelCounts[0] = (levelCounts[0] || 0) + 1;
            }
        }

        // 노드 생성
        const newNodes = deployments.map((dep, index) => {
            const depth = nodeDepths[dep.id];
            const position = levelCounts[depth] > 1
                ? depth * xSpacing + initialX
                : initialX + depth * xSpacing;


            const indexInLevel = deployments
                .filter(d => nodeDepths[d.id] === depth)
                .findIndex(d => d.id === dep.id);

            const y = initialY + (indexInLevel * ySpacing);

            return {
                id: dep.id,
                type: 'deploymentNode',
                position: { x: position, y },
                data: {
                    label: dep.name,
                    status: dep.status,
                    deployer: dep.deployer,
                    description: dep.description
                },
                sourcePosition: Position.Right,
                targetPosition: Position.Left,
            } as Node;
        });

        const newEdges = deployments.flatMap(dep =>
            (dep.dependsOn || [])
                .filter(targetId => deployments.some(d => d.id === targetId))
                .map(targetId => {
                    const sourceDep = deployments.find(d => d.id === targetId);
                    return {
                        id: `e-${targetId}-${dep.id}`,
                        source: targetId,
                        target: dep.id,
                        animated: sourceDep?.status === DeploymentStatus.InProgress ||
                            dep.status === DeploymentStatus.InProgress,
                        type: 'smoothstep',  // 더 부드러운 곡선
                        style: { stroke: '#666', strokeWidth: 2 },
                        markerEnd: {  // 화살표 끝 모양
                            type: MarkerType.ArrowClosed,
                            width: 15,
                            height: 15,
                            color: '#666',
                        },
                    }
                })
        );

        setNodes(newNodes);
        setEdges(newEdges);
        setLayouting(false);
        setTimeout(() => reactFlowInstance.fitView(), 50);

    }, [deployments, setNodes, setEdges, reactFlowInstance]);

    // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
    useEffect(() => {
        setLayouting(true);
        createNodesAndEdges();
        // 데이터가 완전히 업데이트된 후 뷰 조정
        setTimeout(() => {
            reactFlowInstance.fitView();
        }, 50);
    }, [deployments, createNodesAndEdges]);

    return (
        <div className={cn("w-full h-[500px] border rounded-lg bg-white", className)}>
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                nodeTypes={nodeTypes}
                fitView
                draggable={false}
                panOnDrag={false}
                zoomOnScroll={false}
                zoomOnPinch={false}
                zoomOnDoubleClick={false}
                elementsSelectable={false}
                nodesConnectable={false}
                nodesDraggable={false}
                nodesFocusable={false}
                edgesFocusable={false}
                selectNodesOnDrag={false}
                defaultEdgeOptions={{ type: 'default' }}  // 기본 엣지 타입 설정
                fitViewOptions={{ padding: 0.2 }}  // 여백 추가
                attributionPosition="bottom-left"

            >
                <Controls />
                <Background gap={12} size={1} />
                {layouting && (
                    <Panel position="top-center">
                        <div className="bg-white p-2 rounded shadow">
                            그래프 레이아웃 구성 중...
                        </div>
                    </Panel>
                )}
            </ReactFlow>
        </div>
    );
}

export function DeploymentFlow(props: DeploymentFlowProps) {
    return <Suspense>
        <ReactFlowProvider >
            <Content {...props} />
        </ReactFlowProvider>
    </Suspense>
}