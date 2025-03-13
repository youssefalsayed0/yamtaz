import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import {  routing,  } from "@/i18n/routing";
import { Cairo } from "next/font/google";
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
/* import LoadingProvider from "@/components/LoadingProvider"; // ✅ Import LoadingProvider
 */import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Loader from "@/components/Loader";

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
				{/* 	<LoadingProvider> */}
						<NextIntlClientProvider messages={messages} locale={locale}>
						<Loader />
						<Navbar locale={locale}/>
							<main>
								{children}
							</main>
							<Footer />
						</NextIntlClientProvider>
					{/* </LoadingProvider> */}
				</QueryProvider>
			</body>
		</html>
	);
}
