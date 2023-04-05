import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import {hash, compare} from 'bcrypt';
import {PrismaClient} from '@prisma/client';

const prisma = new PrismaClient();
const saltRounds = 10;

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
        const passwordHash = await hash(password, saltRounds);
        let user = await prisma.user.findFirst({where: {username}});
        if (!user)
          user = await prisma.user.create({data: {username, passwordHash}});
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
