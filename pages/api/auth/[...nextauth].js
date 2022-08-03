import NextAuth from "next-auth";
import TwitterProvider from "next-auth/providers/twitter";
import GoogleProvider from "next-auth/providers/google";
import { redirect } from "next/dist/server/api-utils";

export default NextAuth({
   // Configure one or more authentication providers
   providers: [
      GoogleProvider({
         clientId: process.env.GOOGLE_CLIENT_ID,
         clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      }),
   ],
});
