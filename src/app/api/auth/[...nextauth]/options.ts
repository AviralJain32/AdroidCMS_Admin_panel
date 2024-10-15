import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            id: "credentials",
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials: any): Promise<any> {
                try {
                    if (credentials.identifier === process.env.NEXT_AUTH_EMAIL && credentials.password === process.env.NEXT_AUTH_PASSWORD) {
                        return {
                            email: credentials.identifier,
                            fullname: "Admin" // Add a fullname if needed
                        };
                    }
                    if (credentials.password !== process.env.NEXT_AUTH_PASSWORD) {
                        throw new Error("Incorrect Password for admin access");
                    }
                    if (credentials.identifier !== process.env.NEXT_AUTH_EMAIL) {
                        throw new Error("Incorrect email for admin access");
                    }
                } catch (error: any) {
                    throw new Error(error.message || "Login failed");
                }
            }
        })
    ],
    callbacks: {
        async session({ session, token }) {
            if (token) {
                session.user.email = token.email;
                session.user.fullname = token.fullname;
            }
            return session;
        },
        async jwt({ token, user }) {
            if (user) {
                token.email = user.email;
                token.fullname = user.fullname;
            }
            return token;
        }
    },
    pages: {
        signIn: '/sign-in',
    },
    session: {
        strategy: "jwt"
    },
    secret: process.env.NEXTAUTH_SECRET
};
