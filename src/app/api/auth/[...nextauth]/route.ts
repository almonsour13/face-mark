import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { googleSignIn, refreshAccessToken, signInUser } from "@/lib/api/auth";

const handler = NextAuth({
    providers: [
        // 🔹 Google Login
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
            authorization: {
                params: {
                    prompt: "select_account",
                    access_type: "offline",
                    response_type: "code",
                },
            },
        }),

        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials.password) return null;

                const result = await signInUser(credentials);
                if (!result.success) {
                    throw new Error(JSON.stringify(result.error));
                }

                return {
                    id: result.user.id,
                    name: result.user.name,
                    email: result.user.email,
                    role: result.user.role,
                    accessToken: result.accessToken,
                    refreshToken: result.refreshToken,
                };
            },
        }),
    ],

    session: { strategy: "jwt" },

    callbacks: {
        // 🔹 Handle Google Sign-In manually
        async signIn({ user, account }) {
            if (account?.provider === "google") {
                try {
                    const result = await googleSignIn({
                        name: user.name,
                        email: user.email!,
                        image: user.image,
                        provider: account.provider,
                        providerAccountId: account.providerAccountId,
                    });
                    if (result?.user) {
                        user.id = result.user.id;
                        user.name = result.user.name;
                        user.email = result.user.email;
                        user.role = result.user.role;
                        user.accessToken = result.accessToken;
                        user.refreshToken = result.refreshToken;
                        return true;
                    } else {
                        return false;
                    }
                } catch (error: any) {
                    return false;
                }
            }
            return true;
        },

        // 🔹 JWT payload - FIXED: Store tokens properly
        async jwt({ token, user }) {
            // Initial sign in
            if (user) {
                return {
                    ...token,
                    role: (user as any).role,
                    accessToken: user.accessToken,
                    refreshToken: user.refreshToken,
                    accessTokenExpires: Date.now() + 15 * 60 * 1000, // 15 minutes
                };
            }
            if (
                token.accessTokenExpires &&
                Date.now() < (token.accessTokenExpires as number)
            ) {
                return token;
            }
            return await refreshAccessToken(token);
        },

        // 🔹 Session object sent to frontend - FIXED: Pass tokens from token to session
        async session({ session, token }) {
            if (token && session.user) {
                session.user.id = token.id as string;
                session.user.role = token.role as number; 
                session.accessToken = token.accessToken as string;
                session.refreshToken = token.refreshToken as string;
                session.error = token.error as string | undefined;
            }
            return session;
        },
    },

    pages: {
        signIn: "/auth/signin",
    },

    secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
