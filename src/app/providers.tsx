'use client';

import {FC, PropsWithChildren} from 'react';
import {SessionProvider} from 'next-auth/react';

export function Providers({children}: PropsWithChildren): ReturnType<FC> {
  return <SessionProvider>{children}</SessionProvider>;
}
