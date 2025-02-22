
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { Link, routing } from "@/i18n/routing";
import {  Cairo } from "next/font/google";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "animate.css/animate.min.css";
import "./globals.css";
import "@/assets/css/rtl.css";
import "@/assets/css/media.css";
import AddWow from "@/lib/AddWow";
import { Metadata } from "next";
import QueryProvider from "./QueryProvider";
import LoadingProvider from "@/components/LoadingProvider"; // ✅ Import LoadingProvider

const cairo = Cairo({
  subsets: ["arabic"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({
    locale,
  }));
}

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations();
  return {
    title: t("mainLayout.metadata.title"),
    description: t("mainLayout.metadata.description"),
    keywords: [],
    authors: [],
  };
}

export default async function LocaleLayout({ children, params }: { children: React.ReactNode; params: Promise<{ locale: (typeof routing.locales)[number] }> }) {
  const { locale } = await params;

  if (!routing.locales.includes(locale)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html lang={locale} dir={locale == "ar" ? "rtl" : "ltr"}>
      <body className={cairo.className}>
        <AddWow />
        <QueryProvider>
        <AddWow />
          <LoadingProvider>
            <main>
              <NextIntlClientProvider messages={messages} locale={locale}>
                <Link href="\" className="ar" locale="ar">ar</Link>
                <Link href="\" className="en" locale="en">en</Link>
                {children}
              </NextIntlClientProvider>
            </main>
          </LoadingProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
