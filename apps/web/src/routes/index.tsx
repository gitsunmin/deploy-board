import { createFileRoute } from '@tanstack/react-router'
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLayoutEffect } from "react";
import { getDeploymentsRequest } from "@/apiClient/deployment/client";
import { useSnapshot } from "valtio";
import { setDeployments, store } from "@/store";
import { useLazyLoadQuery } from 'react-relay';
import { graphql } from 'relay-runtime';

const Query = graphql`
  query IndexQuery {
    deployments {
      id
      name
      description
    }
  }
`;

export const Route = createFileRoute('/')({
    component: Index,
})

function Index() {
    const data = useLazyLoadQuery<IndexQuery>(
        Query,
        {},
    );
    const deploymentList = useSnapshot(store).deployments;

    useLayoutEffect(() => {
        getDeploymentsRequest().then(setDeployments);
    }, []);

    return (
        <div className="p-4">
            <Card>
                <CardHeader>
                    <CardTitle>Deployment List</CardTitle>
                </CardHeader>
                <CardContent>
                    <ul className="space-y-4">
                        {deploymentList.map((dep) => (
                            <li key={dep.id} className="py-2">
                                <div className="flex justify-between items-center">
                                    <span className="font-medium">{dep.name}</span>
                                    <span className="text-sm text-gray-500">{dep.status}</span>
                                </div>
                                <Separator />
                            </li>
                        ))}
                    </ul>
                </CardContent>
            </Card>
        </div>
    )
}