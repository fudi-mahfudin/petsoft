import type { Metadata } from 'next';
import localFont from 'next/font/local';
import '@/styles/globals.css';

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});

export const metadata: Metadata = {
  title: 'PetSoft - Pet daycare software',
  description: "Take care of people's pets responsibly with PetSoft.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased text-sm text-zinc-900 bg-primary min-h-screen`}
      >
        {children}
      </body>
    </html>
  );
}
