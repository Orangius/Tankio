import CredentialsProvider from "next-auth/providers/credentials"
import type { NextAuthOptions } from "next-auth"
import { User } from "@/models/user"
import bcryptjs from "bcryptjs"
import connectToDataBase from "@/lib/db"

export const options: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      id: "credentials",
      name: "Credentials",
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      // @ts-ignore
      async authorize(credentials, req) {
        // @ts-ignore
        // You need to provide your own logic here that takes the credentials
        // submitted and returns either a object representing a user or value
        // that is false/null if the credentials are invalid.
        // e.g. return { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
        // You can also use the `req` object to obtain additional parameters
        // (i.e., the request IP address)
        try {
          const foundUser = await User.findOne({
            // @ts-ignore
            username: credentials.username.toLowerCase(),
          })
            .lean()
            .exec()

          console.log("found user: ", foundUser)
          if (foundUser) {
            const isPasswordCorrect = await bcryptjs.compare(
              credentials!.password,
              (foundUser as any).password
            )
            console.log("is password correct: ", isPasswordCorrect)
            if (isPasswordCorrect) {
              return foundUser
            }
          }
        } catch (error) {
          console.log(error)
        }

        // Return null if user data could not be retrieved
        return null
      },
    }),
  ],
  // callbacks: {
  //   async jwt({ token, user }) {
  //     console.log("jwt user", user)
  //     console.log("jwt token", token)
  //     return token
  //   },

  //   async session({ session, token, user }) {
  //     //const sessionUser = await User.findOne({ username: session.user.email });
  //     //  session.user = token.sub
  //     //session.user.id = sessionUser._id.toString();
  //     console.log("session session", session)
  //     console.log("session token", token)
  //     console.log("session user", user)
  //     return session
  //   },
  // },
}
