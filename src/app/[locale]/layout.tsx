import {NextIntlClientProvider} from 'next-intl';
import {getMessages} from 'next-intl/server';
import {notFound} from 'next/navigation';
import {routing} from '@/i18n/routing';
import type { Metadata } from "next";
import { Assistant } from "next/font/google";
import "../globals.css";
import Footer from '../component/footer';
import Header from '../component/header';
import DemoGuide from '../component/demoGuide';

 
const assistant = Assistant({
  variable: "--font-sans-serif",
  subsets: ["latin"],
});
export const metadata: Metadata = {
  title: "Clone Web",
  description: "Clone web by next app",
};
export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{locale: string}>;
}) {
  // Ensure that the incoming `locale` is valid
  const {locale} = await params;
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }
 
  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();
 
  return (
    <html lang={locale}>
      <body className={assistant.className}>
        <NextIntlClientProvider messages={messages}>
          <DemoGuide />
          <Header />
          {children}
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}