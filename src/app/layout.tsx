import './globals.css';

export const metadata = {
  title: 'LXD Dashboard',
  description: "QweZey's LXD Dashboard",
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
