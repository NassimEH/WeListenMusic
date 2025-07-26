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
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    },
    github: {
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    },
  },
  user: {
    additionalFields: {
      isArtist: {
        type: "boolean",
        defaultValue: false,
      },
      provider: {
        type: "string",
        required: true,
      },
      providerId: {
        type: "string", 
        required: true,
      },
    },
  },
  callbacks: {
    async signUp({ user, account }) {
      // Créer automatiquement un profil artiste si l'utilisateur le souhaite
      if (user.isArtist) {
        await prisma.artist.create({
          data: {
            userId: user.id,
            stageName: user.name || "Artiste",
          },
        });
      }
      return { user, account };
    },
  },
});

export type Session = typeof auth.$Infer.Session;
export type User = typeof auth.$Infer.User;
