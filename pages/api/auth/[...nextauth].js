import NextAuth from "next-auth";

import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import Credentials from "next-auth/providers/credentials";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import clientPromise from "../../../lib/mongodb";
import dbConnect from "../../../lib/db";
import User from "../../../lib/models/user_model";
import { verifyPassword } from "../../../lib/encrypt";

export default NextAuth({
  // Configuring of all the  providers
  providers: [
    Credentials({
      async authorize(credentials) {
        const db = await dbConnect();

        const user = await User.findOne({
          email: credentials.email,
        }).select("+password");
        if (!user) {
          throw new Error("No user found!");
        }
        const isValid = await verifyPassword(
          credentials.password,
          user.password
        );
        if (!isValid) {
          throw new Error("Could not log you in!");
        }
        return { email: user.email };
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
  ],
  session: {
    strategy: "jwt",
  },

  pages: {
    signIn: "/auth/signup",
  },
  adapter: MongoDBAdapter(clientPromise),
});
