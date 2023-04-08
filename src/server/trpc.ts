import {Context} from './context';
import {initTRPC, TRPCError} from '@trpc/server';

const t = initTRPC.context<Context>().create();

export const router = t.router;
export const publicProcedure = t.procedure;
export const middleware = t.middleware;
export const mergeRouters = t.mergeRouters;

const isAuthed = middleware(({next, ctx}) => {
  const user = ctx.session?.user;
  if (user) throw new TRPCError({code: 'UNAUTHORIZED'});
  return next({
    ctx: {
      user,
    },
  });
});

export const authedProcedure = t.procedure.use(isAuthed);
