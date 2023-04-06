import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "../trpc";

export const galleryRouter = createTRPCRouter({
  getSecretMessage: protectedProcedure.query(() => {
    return "you can now see this secret message!";
  }),
});
