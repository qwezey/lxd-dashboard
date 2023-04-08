import {httpBatchLink} from '@trpc/client/links/httpBatchLink';
import {loggerLink} from '@trpc/client/links/loggerLink';
import {wsLink, createWSClient} from '@trpc/client/links/wsLink';
import {createTRPCNext} from '@trpc/next';
import type {inferProcedureOutput} from '@trpc/server';
import {NextPageContext} from 'next';
import type {AppRouter} from '@/server/routers/_app';

function getEndingLink(ctx: NextPageContext | undefined) {
  if (typeof window === 'undefined') {
    return httpBatchLink({
      url: '/api/trpc',
      headers() {
        if (!ctx?.req?.headers) {
          return {};
        }
        return {
          ...ctx.req.headers,
          'x-ssr': '1',
        };
      },
    });
  }
  const client = createWSClient({
    url: 'ws://localhost:3001',
  });
  return wsLink<AppRouter>({
    client,
  });
}

export const trpc = createTRPCNext<AppRouter>({
  config({ctx}) {
    return {
      links: [
        loggerLink({
          enabled: opts =>
            (process.env.NODE_ENV === 'development' &&
              typeof window !== 'undefined') ||
            (opts.direction === 'down' && opts.result instanceof Error),
        }),
        getEndingLink(ctx),
      ],
    };
  },
});

export type inferQueryOutput<
  TRouteKey extends keyof AppRouter['_def']['queries']
> = inferProcedureOutput<AppRouter['_def']['queries'][TRouteKey]>;
