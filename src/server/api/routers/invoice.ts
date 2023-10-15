import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";

// export const createInvoice = protectedProcedure
//   .input(z.object({ text: z.string().min(1) }))
//   .mutation((opts) => {
//     console.log("Creating post", opts.input.text);
//     return opts.ctx.db.post.create({
//       data: {
//         text: opts.input.text,
//         createdBy: { connect: { id: opts.ctx.session.user.id } },
//       },
//     });
//   });

export const invoiceRouter = createTRPCRouter({
  // hello: publicProcedure.input(z.object({ text: z.string() })).query((opts) => {
  //   return {
  //     greeting: `Hello ${opts.input.text}`,
  //   };
  hello: publicProcedure.query(() => {
    return {
      greeting: `Hello World`,
    };
  }),

  // create: createPost,

  getSecretMessage: protectedProcedure.query(() => {
    return "this is a secret message!";
  }),
});
