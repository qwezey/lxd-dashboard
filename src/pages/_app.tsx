import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import '@/styles/globals.css';
import type {AppProps} from 'next/app';
import {SessionProvider} from 'next-auth/react';
import {trpc} from '@/ui/trpc';

export function App({Component, pageProps}: AppProps) {
  return (
    <SessionProvider>
      <Component {...pageProps} />{' '}
    </SessionProvider>
  );
}

export default trpc.withTRPC(App);
