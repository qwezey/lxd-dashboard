import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import {PropsWithChildren} from 'react';
import {Providers} from './providers';

export const metadata = {
  title: 'LXD Dashboard',
  description: "QweZey's LXD Dashboard",
};

export default function RootLayout({children}: PropsWithChildren) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
