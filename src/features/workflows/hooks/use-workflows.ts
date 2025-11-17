import { useTRPC } from "@/trpc/client"
import { useMutation, useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { use } from "react";
import { toast } from "sonner";
import { useWorkflowsParams } from "./use-workflow-params";

// Hook to fetch all workflows using suspense

export const useSuspenseWorkflows = () => {
    const trpc = useTRPC();
    const [params] = useWorkflowsParams();

    return useSuspenseQuery(trpc.workflows.getAll.queryOptions(params));
};

// Hook to create a new workflow

export const useCreateWorkflow = () => {
    const trpc = useTRPC();
    const queryClient =useQueryClient();

    return useMutation(trpc.workflows.create.mutationOptions({
        onSuccess: (data) => {
            toast.success(`Workflow "${data.name}" created`);
            queryClient.invalidateQueries(trpc.workflows.getAll.queryOptions({}));
        },
        onError: (error) => {
            toast.error(`Failed to create workflow: ${error.message}`);
        },
    }));
};

// Hook to delete existing workflow

export const useRemoveWorkflow = () => {
    const trpc = useTRPC();
    const queryClient =useQueryClient();

    return useMutation(trpc.workflows.remove.mutationOptions({
        onSuccess: (data) => {
            toast.success(`Workflow "${data.name}" removed`);
            queryClient.invalidateQueries(trpc.workflows.getAll.queryOptions({}));
            queryClient.invalidateQueries(trpc.workflows.getOne.queryFilter({ id: data.id }));
        },
        onError: (error) => {
            toast.error(`Failed to remove workflow: ${error.message}`);
        },
    }));
};

// Hook to fetch a single workflows using suspense

export const useSuspenseWorkflow = (id: string) => {
    const trpc = useTRPC();

    return useSuspenseQuery(trpc.workflows.getOne.queryOptions({ id }));
};

// Hook to update a workflow name

export const useUpdateWorkflowName = () => {
    const trpc = useTRPC();
    const queryClient =useQueryClient();

    return useMutation(trpc.workflows.updateName.mutationOptions({
        onSuccess: (data) => {
            toast.success(`Workflow "${data.name}" updated`);
            queryClient.invalidateQueries(trpc.workflows.getAll.queryOptions({}));
            queryClient.invalidateQueries(trpc.workflows.getOne.queryFilter({ id: data.id }));
        },
        onError: (error) => {
            toast.error(`Failed to update workflow name: ${error.message}`);
        },
    }));
};