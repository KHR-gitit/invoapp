import { z } from "zod";
import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";

export const createBusiness = protectedProcedure
  .input(z.object({
        logo: z.string().min(1),
        name: z.string().min(1),
        address: z.string().min(1),
        contactNumber: z.string().min(1),
        email: z.string().min(1), 
    }))
  .mutation(async (opts) => { 
    const createdBusiness = await opts.ctx.db.business.create({
        data: {
            logo: opts.input.logo,
            name: opts.input.name,
            address: opts.input.address,
            contactNumber: opts.input.contactNumber,
            email: opts.input.email,
            createdById: opts.ctx.session.user.id
        },
    });
    return createdBusiness;
});

export const businessRouter = createTRPCRouter({
  hello: publicProcedure.input(z.object({ text: z.string() })).query((opts) => {
    return {
      greeting: `Hello ${opts.input.text}`,
    };
  }),

  create: createBusiness,

  getSecretMessage: protectedProcedure.query(() => {
    return "this is a secret message!";
  }),
});