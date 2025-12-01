
import { credentialsRouter } from '@/features/credentials/servers/routers';
import { createTRPCRouter } from '../init';
import { workflowsRouter } from '@/features/workflows/servers/routers';

export const appRouter = createTRPCRouter({
  workflows: workflowsRouter,
  credentials: credentialsRouter,
});
// export type definition of API
export type AppRouter = typeof appRouter;