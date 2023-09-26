import './globals.css';
import type { Metadata } from 'next';
import Navbar from './components/Navbar';
import { Staatliches } from 'next/font/google';

export const revalidate = 10; // revalidate at most every 10 seconds

export const metadata: Metadata = {
  title: 'Next.js Image Gallery',
  description: 'Next 13 image gallery site',
};

const staatliches = Staatliches({ weight: ['400'], subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${staatliches.className} bg-black text-white`}>
        <Navbar />
        <main className="max-w-6xl mx-auto relative">{children}</main>
      </body>
    </html>
  );
}
