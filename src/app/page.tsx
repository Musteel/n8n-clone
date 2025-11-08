"use client";

import { LogoutButton } from "./logout";
import { useTRPC } from "@/trpc/client";
import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";
import { tr } from "date-fns/locale";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const Page = () => {
  const trpc = useTRPC();
  const queryClient = new QueryClient();
  const { data } = useQuery(trpc.getWorkflows.queryOptions());

  const testAI = useMutation(trpc.testAi.mutationOptions({
    onSuccess: () => {
      toast.success('AI job is queued');
    },
    onError: () => {
      toast.error(`Something went wrong`);
    }
  }));

  const create = useMutation(trpc.createWorkflow.mutationOptions({
    onSuccess: () => {
      toast.success('Job queued');
    }
  }));

  return (
    <div className= "min-h-screen min-w-screen flex items-center justify-center flex-col gap-y-6">
      protected server component
      <div>
      {JSON.stringify(data, null, 2)}
      </div>
      <Button disabled={testAI.isPending} onClick={() => testAI.mutate()}>Test AI</Button>
      <Button disabled={create.isPending} onClick={() => create.mutate()}>Create workflow</Button>
      <LogoutButton />
    </div>
  );

};
export default Page;
