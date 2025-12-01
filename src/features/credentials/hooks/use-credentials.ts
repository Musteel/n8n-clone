import { useTRPC } from "@/trpc/client"
import { useMutation, useQuery, useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { use } from "react";
import { toast } from "sonner";
import { useCredentialsParams } from "./use-credentials-params";
import { CredentialType } from "@/generated/prisma";

// Hook to fetch all credentials using suspense

export const useSuspenseCredentials = () => {
    const trpc = useTRPC();
    const [params] = useCredentialsParams();

    return useSuspenseQuery(trpc.credentials.getAll.queryOptions(params));
};

// Hook to create a new credential

export const useCreateCredential = () => {
    const trpc = useTRPC();
    const queryClient =useQueryClient();

    return useMutation(trpc.credentials.create.mutationOptions({
        onSuccess: (data) => {
            toast.success(`Credential "${data.name}" created`);
            queryClient.invalidateQueries(trpc.credentials.getAll.queryOptions({}));
        },
        onError: (error) => {
            toast.error(`Failed to create credential: ${error.message}`);
        },
    }));
};

// Hook to delete existing credential

export const useRemoveCredential = () => {
    const trpc = useTRPC();
    const queryClient =useQueryClient();

    return useMutation(trpc.credentials.remove.mutationOptions({
        onSuccess: (data) => {
            toast.success(`Credential "${data.name}" removed`);
            queryClient.invalidateQueries(trpc.credentials.getAll.queryOptions({}));
            queryClient.invalidateQueries(trpc.credentials.getOne.queryFilter({ id: data.id }));
        },
        onError: (error) => {
            toast.error(`Failed to remove credential: ${error.message}`);
        },
    }));
};

// Hook to fetch a single credentials using suspense

export const useSuspenseCredential = (id: string) => {
    const trpc = useTRPC();

    return useSuspenseQuery(trpc.credentials.getOne.queryOptions({ id }));
};

// Hook to update a credential

export const useUpdateCredential = () => {
    const trpc = useTRPC();
    const queryClient =useQueryClient();

    return useMutation(trpc.credentials.update.mutationOptions({
        onSuccess: (data) => {
            toast.success(`Credential "${data.name}" saved`);
            queryClient.invalidateQueries(trpc.credentials.getAll.queryOptions({}));
            queryClient.invalidateQueries(trpc.credentials.getOne.queryFilter({ id: data.id }));
        },
        onError: (error) => {
            toast.error(`Failed to save credential: ${error.message}`);
        },
    }));
};

// Hook to fetch credentials by type

export const useCredentialsByType = (type: CredentialType) => {
    const trpc = useTRPC();
    return useQuery(trpc.credentials.getByType.queryOptions({ type }));
};