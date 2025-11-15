import { prefetchWorkflows } from "@/features/workflows/servers/prefetch";
import { requireAuth } from "@/lib/auth-utils";
import { HydrateClient } from "@/trpc/server";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary"
import { WorkflowsContainer, WorkflowsList } from "@/features/workflows/components/workflows";
import { SearchParams } from "nuqs";
import { workflowsParamsLoader } from "@/features/workflows/servers/params-loader";

type Props = {
    searchParams: Promise<SearchParams>;
}

const Page = async ({ searchParams }: Props) => {
    await requireAuth();

    const params = await workflowsParamsLoader(searchParams);
    prefetchWorkflows(params);

    return (
        <WorkflowsContainer>
            <HydrateClient>
                <ErrorBoundary fallback={<div>Something went wrong.</div>}>
                    <Suspense fallback={<div>Loading workflows...</div>}>
                        <WorkflowsList />
                    </Suspense>
                </ErrorBoundary>
            </HydrateClient>
        </WorkflowsContainer>
    )
};

export default Page;