import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "sqlite",
  }),
  baseURL: process.env.BETTER_AUTH_URL || "http://localhost:3001",
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID || "demo",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "demo",
    },
    github: {
      clientId: process.env.GITHUB_CLIENT_ID || "demo", 
      clientSecret: process.env.GITHUB_CLIENT_SECRET || "demo",
    },
  },
  session: {
    expiresIn: 60 * 60 * 24 * 7, // 7 jours
    updateAge: 60 * 60 * 24, // 1 jour
  },
  user: {
    additionalFields: {
      isArtist: {
        type: "boolean",
        defaultValue: false,
      },
    },
  },
});
