import { getDeploymentsRequest } from '@/apiClient/deployment/client';
import { AddDeploymentForm } from '@/components/AddDeploymentForm';
import { UpdateDeploymentForm } from '@/components/UpdateDeploymentForm';
import { setDeployments, store } from '@/store';
import { createFileRoute, useLayoutEffect } from '@tanstack/react-router'
import { useSnapshot } from 'valtio/react';

export const Route = createFileRoute('/_layout/admin/')({
    component: RouteComponent,
})

function RouteComponent() {
    const deploymentList = useSnapshot(store).deployments;

    useLayoutEffect(() => {
        getDeploymentsRequest().then(setDeployments);
    }, []);

    return (
        <div className="p-4">
            <ul className="space-y-4">
                {deploymentList.map((dep) => (
                    <li key={dep.id} className="py-2">
                        <UpdateDeploymentForm data={dep} />
                    </li>
                ))}
            </ul>
            <AddDeploymentForm />
        </div>
    );
}
