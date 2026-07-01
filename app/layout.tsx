import type { Metadata } from 'next';
import { Inter, Oswald } from 'next/font/google';
import './globals.css';
import { CartProvider } from '@/lib/cart';
import { PromoBar } from '@/components/PromoBar';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { CartDrawer } from '@/components/CartDrawer';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });
const oswald = Oswald({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-display',
});

export const metadata: Metadata = {
  title: {
    default: 'SoleStripe — Sneakers, Running, Basketball & Lifestyle',
    template: '%s · SoleStripe',
  },
  description:
    'Shop the latest sneakers, running shoes, basketball, skate and lifestyle kicks at SoleStripe. Free shipping over $75.',
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${oswald.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-ink">
        <CartProvider>
          <PromoBar />
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  );
}
