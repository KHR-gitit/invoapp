import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";

export const createClient = protectedProcedure
  .input(z.object({ 
    fName: z.string().min(1),
    lName: z.string().min(1),
    address: z.string().min(1),
    contactNumber: z.string().min(1),
    email: z.string().min(1),
    businessId: z.string().min(1)
  }))
  .mutation((opts) => {
    return opts.ctx.db.client.create({
        data: {
            fName: opts.input.fName,
            lName: opts.input.lName,
            address: opts.input.address,
            contactNumber: opts.input.contactNumber,
            email: opts.input.email,
            businessId: opts.input.businessId,
        },
    });
  });

export const clientRouter = createTRPCRouter({
  hello: publicProcedure.input(z.object({ text: z.string() })).query((opts) => {
    return {
      greeting: `Hello ${opts.input.text}`,
    };
  }),

  create: createClient,

  getSecretMessage: protectedProcedure.query(() => {
    return "this is a secret message!";
  }),
});