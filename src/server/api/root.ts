import { createTRPCRouter } from "~/server/api/trpc";
import { invoiceRouter } from "~/server/api/routers/invoice";
import { clientRouter } from "~/server/api/routers/client";
import { businessRouter } from "./routers/business";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  invoice: invoiceRouter,
  client: clientRouter,
  business: businessRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
