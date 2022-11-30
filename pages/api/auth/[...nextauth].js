import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  theme: {
    colorScheme: "light", // "auto" | "dark" | "light"
    brandColor: "", // Hex color value
    logo: "" // Absolute URL to logo image
  },
  // Configure one or more authentication providers
  providers: [

    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code"
        }
      }
    }),
    CredentialsProvider({
      name: 'Email',
      credentials: {
        username: { label: "Email", type: "email", placeholder: "exempel@hotmail.com" },
        password: { label: "Lösenord", type: "password" }
      },
      async authorize(credentials, req) {

        let fetchPromise = await fetch('http://localhost:3000/api/login', {
          method: "POST",
          body: JSON.stringify({
            email: credentials.username,
            password: credentials.password
          })
        });

        let userData = await fetchPromise.json();

        if (userData?.isLoggedIn)
          return userData.userData;

        return null;
      }
    })
  ],
  callbacks: {
    async session({ session, user, token }) {
      if (token) {
        session.roles = token.user.roles;
      }
      console.log(token);
      return session;
    },
    async signIn({ user, session }) {

      return true;
    },
    async jwt({ token, user, session }) {
      //console.log('Token sent user', user)
      if (user) {
        token.user = user;
      }
      return token;
    },
  },
  secret: process.env.JWT_SECRET
}
export default NextAuth(authOptions);