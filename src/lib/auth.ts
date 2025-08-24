import { NextAuthOptions } from 'next-auth';
import { PrismaAdapter } from '@auth/prisma-adapter';
import GoogleProvider from 'next-auth/providers/google';
import GitHubProvider from 'next-auth/providers/github';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcryptjs from 'bcryptjs';
import { db } from '@/lib/db';

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(db) as any,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        try {
          const user = await db.user.findUnique({
            where: { email: credentials.email },
          });

          if (!user?.hashedPassword) {
            return null;
          }

          const isPasswordValid = await bcryptjs.compare(
            credentials.password,
            user.hashedPassword
          );

          if (!isPasswordValid) {
            return null;
          }

          return {
            id: user.id,
            email: user.email,
            name: user.name,
            image: user.image,
            role: user.role,
          };
        } catch (error) {
          console.error('Auth error:', error);
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  callbacks: {
    async jwt({ token, user, account }) {
      if (user) {
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.sub!;
        session.user.role = token.role as string;
      }
      return session;
    },
    async redirect({ url, baseUrl }) {
      // Allows relative callback URLs
      if (url.startsWith('/')) return `${baseUrl}${url}`;
      // Allows callback URLs on the same origin
      else if (new URL(url).origin === baseUrl) return url;
      return baseUrl;
    },
  },
  pages: {
    signIn: '/auth/signin',
    signUp: '/auth/signup',
    error: '/auth/error',
  },
  events: {
    async signIn({ user, account, profile }) {
      console.log('User signed in:', { user: user.email, provider: account?.provider });
    },
    async signOut({ session }) {
      console.log('User signed out:', session?.user?.email);
    },
  },
  debug: process.env.NODE_ENV === 'development',
};

// Helper functions for user management
export async function createUser(data: {
  email: string;
  password: string;
  name?: string;
}) {
  const hashedPassword = await bcryptjs.hash(data.password, 12);
  
  return await db.user.create({
    data: {
      email: data.email,
      hashedPassword,
      name: data.name,
    },
  });
}

export async function getUserByEmail(email: string) {
  return await db.user.findUnique({
    where: { email },
    include: {
      accounts: true,
      orders: {
        orderBy: { createdAt: 'desc' },
        take: 5,
      },
    },
  });
}

export async function updateUser(userId: string, data: Partial<{
  name: string;
  email: string;
  image: string;
  phone: string;
  dateOfBirth: Date;
  preferences: any;
}>) {
  return await db.user.update({
    where: { id: userId },
    data,
  });
}