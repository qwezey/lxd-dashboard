import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import {compare} from 'bcrypt';
import {PrismaClient} from '@prisma/client';

const prisma = new PrismaClient();

export default NextAuth({
  providers: [
    CredentialsProvider({
      credentials: {
        username: {
          label: 'Username',
          type: 'text',
        },
        password: {label: 'Password', type: 'password'},
      },
      async authorize(credentials) {
        if (!credentials) return null;
        const {username, password} = credentials;
        const user = await prisma.user.findUnique({where: {username}});
        if (!user) return null;
        const passwordIsValid = await compare(password, user.passwordHash);
        if (!passwordIsValid) return null;
        return {
          id: username,
          name: username,
        };
      },
    }),
  ],
});
