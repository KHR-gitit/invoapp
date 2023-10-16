import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";

export const createInvoice = protectedProcedure
  .input(z.object({ 
    clientId:z.string(),
    items: z.array(z.object({
      sno: z.number(),
      desc: z.string(),
      qty: z.number(),
      rate: z.number(),
    })),
    quote: z.boolean(),
    businessId:z.string(),
    dueDate: z.date()

   }))
  .mutation(async (opts) => {
    await Promise.all(opts.input.items.map(
      async (item)  =>( await opts.ctx.db.item.findUnique({ where: { name: item.desc } })?
      {}: opts.ctx.db.item.create({data:{name:item.desc}}))
    ))

    return await opts.ctx.db.invoice.create({
      data: {
        clientId: opts.input.clientId,
        items: opts.input.items,
        quote: opts.input.quote,
        businessId: opts.input.businessId,
        dueDate: opts.input.dueDate
      },
    });
  });

export const invoiceRouter = createTRPCRouter({
  hello: publicProcedure.input(z.object({ text: z.string() })).query((opts) => {
    return {
      greeting: `Hello ${opts.input.text}`,
    };
  }),

  getInvoice: protectedProcedure.input(z.object({id: z.string()})).query(async(opts)=>{
    const invoice = await opts.ctx.db.invoice.findUnique({where:{id:opts.input.id}})
    const business = await opts.ctx.db.business.findUnique({where:{id:invoice?.businessId}})
    const client = await opts.ctx.db.client.findUnique({where:{id:invoice?.clientId}})

    return {
      data:{
        id: opts.input.id,
        invoice_no: invoice?.invoiceId,
        clientData: {
          fullName: `${client?.fName ?? ''} ${client?.lName ?? ''}`,
          address: client?.address,
          phone: client?.contactNumber,
          email: client?.email


        },
        businessData:{
          company: business?.name,
          email: business?.email,
          phone: business?.contactNumber,
          address: business?.address,
        },

        trans_date:new Intl.DateTimeFormat('en-AU', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
        }).format(invoice?.createdAt),
        due_date: new Intl.DateTimeFormat('en-AU', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
        }).format(invoice?.dueDate),
        items: invoice?.items,

      }
    }
  }),

  create: createInvoice,

  getSecretMessage: protectedProcedure.query(() => {
    return "this is a secret message!";
  }),
});
