'use client';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import {SessionProvider} from 'next-auth/react';
import {PropsWithChildren} from 'react';

// export const metadata = {
//   title: 'LXD Dashboard',
//   description: "QweZey's LXD Dashboard",
// };

export default function RootLayout({children}: PropsWithChildren) {
  return (
    <html lang="en">
      <body>
        <SessionProvider>{children}</SessionProvider>
      </body>
    </html>
  );
}
