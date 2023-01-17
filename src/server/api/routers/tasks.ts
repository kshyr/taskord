import { z } from "zod";

import { createTRPCRouter, publicProcedure, protectedProcedure } from "../trpc";

export const tasksRouter = createTRPCRouter({
  createTask: protectedProcedure
    .input(z.object({ title: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.task.create({
        data: {
          ...input,
        },
      });
    }),

  getTasks: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.task.findMany();
  }),

  // updateTask: protectedProcedure
  //   .input(z.object({ id: z.number(), title: z.string() }))
  //   .query(async ({ ctx, input }) => {
  //     return ctx.prisma.example.update({
  //       where: { id: input.id },
  //       data: {
  //         title: input.title,
  //       },
  //     });
  //   }
  // ),
});
