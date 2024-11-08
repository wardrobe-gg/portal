import { z } from "zod";
import { publicProcedure, createTRPCRouter } from "../trpc";

export const authRouter = createTRPCRouter({
  // Basic endpoint that returns a 200 status no matter the input
  login: publicProcedure
    .input(z.object({}).optional()) // Accept any input
    .mutation(async () => {
      return {
        status: 200,
        message: "OK",
      };
    }),
  getUsername: publicProcedure
    .mutation(async () => {
      return {
        status: 200,
        username: 'ajj_s'
      }
    })
});

// Export type definition of API
export type AppRouter = typeof authRouter;