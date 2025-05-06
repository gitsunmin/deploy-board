'use client';
import type { Deployment } from '@/lib/database';

export const getDeploymentsRequest = async (): Promise<Deployment[]> => {
  return await fetch('/api/deployments', {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  }).then((res) => {
    if (!res.ok) {
      throw new Error('Network response was not ok');
    }
    return res.json() as Promise<Deployment[]>;
  });
};

export const addDeploymentRequest = async (
  deployment: Omit<Deployment, 'id' | 'createdAt' | 'updatedAt' | 'status'>,
): Promise<Deployment | null> => {
  const newDeployment = {
    ...deployment,
    id: crypto.randomUUID(),
    status: 'PENDING',
    createdAt: new Date(),
    updatedAt: new Date(),
  } as unknown as Deployment;

  return await fetch('/api/deployments', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newDeployment),
  }).then((res) => {
    if (!res.ok) {
      console.error('Network response was not ok');
      return null;
    }
    return res.json() as Promise<Deployment>;
  });
};

export const updateDeploymentRequest = async (
  id: string,
  updatedData: Partial<Deployment>,
): Promise<Deployment | null> => {
  return await fetch(`/api/deployments/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updatedData),
  }).then((res) => {
    if (!res.ok) {
      console.error('Network response was not ok');
      return null;
    }
    return res.json() as Promise<Deployment>;
  });
};

export const deleteDeploymentRequest = async (id: string): Promise<void> => {
  return await fetch(`/api/deployments/${id}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
  }).then((res) => {
    if (!res.ok) {
      console.error('Network response was not ok');
      throw new Error('Failed to delete deployment');
    }
    return res.json() as Promise<void>;
  });
};

