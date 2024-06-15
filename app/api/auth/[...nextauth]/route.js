import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import EmailProvider from "next-auth/providers/email";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import clientPromise from "@utils/mongoDBAdapter";
import { CustomSendVerificationRequest } from "../signinemail";

import User from "@models/user";
import { connectToDB } from "@utils/database";

const handler = NextAuth({
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    EmailProvider({
      server: process.env.EMAIL_SERVER,
      from: process.env.EMAIL_FROM,
      sendVerificationRequest({ identifier, url, provider }) {
        CustomSendVerificationRequest({ identifier, url, provider });
      },
    }),
  ],
  pages: {
    signIn: "/auth/signin",
    verifyRequest: "/auth/verify-request",
    error: "/auth/error",
  },
  callbacks: {
    async session({ session }) {
      // store the user id from MongoDB to session
      const sessionUser = await User.findOne({ email: session.user.email });
      session.user.id = sessionUser._id.toString();
      session.user.email = sessionUser.email.toString();
      session.user.image = sessionUser.image.toString();
      return session;
    },
    async signIn({ account, profile, user, credentials }) {
      try {
        await connectToDB();

        // Check if the user already exists in your database by email
        const userExists = await User.findOne({
          email: profile?.email || user.email,
        });

        if (!userExists) {
          // If the user does not exist, create a new user in your system
          await User.create({
            email: profile?.email || user.email,
            username:
              profile?.name.replace(" ", "").toLowerCase() ||
              user.email.split("@")[0],
            image: profile?.picture || "",
          });
        }

        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    },
    async redirect({ url, baseUrl }) {
      return baseUrl;
    },
  },
});

export { handler as GET, handler as POST };
