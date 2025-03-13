"use client";
import { Link, usePathname } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import React from "react";
import logo from "@/assets/images/logo.svg";
import { useHome } from "@/hooks/useHome";
import Image from "next/image";
import Social from "./Social";

export default function Footer() {
	interface Section {
		title: string;
	}

	const t = useTranslations("footer");
	const { data, isLoading, error } = useHome();
	const pathname = usePathname();

	// List of routes where the footer should be hidden
	const hiddenRoutes = ["/login", "/register", "/dashboard", "/register/client" , "/login/client" , "/login/provider"];
	if (hiddenRoutes.includes(pathname)) return null; // ✅ Conditional return AFTER all hooks

	if (isLoading) return null;
	if (error) return <p>Error loading home data</p>;

	const footer = data?.sections.find((sec: Section) => sec.title === "footer");

	return (
		<footer className="bg-gradient text-white main-p !pb-6">
			<div className="container">
				<div className="flex md:flex-row flex-col items-start md:items-start flex-wrap md:text-start gap-[60px] md:gap-[20px] md:justify-between md:px-30 relative">
					<div className="flex flex-col items-start gap-[30px] lg:w-2/4 mb-0 md:mb-6">
						<Image src={logo} loading="lazy" width={130} height={100} alt="logo" />
						<div className="text">
							<p className="hidden lg:block text-[16px] md:text-[20px] text-white">{footer?.content}</p>
							<p className="lg:hidden">{t("main2")}</p>
						</div>
						<div className="sm:hidden lg:block">
							<Social />
						</div>
					</div>

					<div className="hidden sm:block lg:hidden absolute top-0 rtl:left-0 ltr:right-0">
						<Social />
					</div>

					<div className="gap-[15px] grid-cols-1 text-[18px] justify-center md:justify-items-start hidden lg:grid">
						<p className="color-main font-bold text-xl">{t("quickLinks")}</p>
						<Link href="/">
							<p className="text-md main-transition hover-main">{t("links.home")}</p>
						</Link>
						<Link href="/">
							<p className="text-md main-transition hover-main">{t("links.about")}</p>
						</Link>
						<Link href="/">
							<p className="text-md main-transition hover-main">{t("links.lawyers")}</p>
						</Link>
						<Link href="/">
							<p className="text-md main-transition hover-main">{t("links.systems")}</p>
						</Link>
					</div>

					<div className="grid md:flex lg:grid gap-[15px] grid-cols-1 text-[18px] justify-items-start md:justify-evenly md:w-full lg:w-auto lg:justify-items-start">
						<p className="hidden lg:block color-main font-bold text-xl">{t("contact")}</p>
						<Link href="" target="_blank" className="hidden lg:flex items-center gap-[15px]">
							<span className="main-transition hover-main">{t("links.whatsapp")}</span>
						</Link>

						<Link href={`tel:+90534337090`} target="_blank" className="flex items-center gap-[15px]">
							<span className="main-transition hover-main">{t("phone")}</span>
						</Link>

						<Link href="/" target="_blank" className="flex items-center gap-[15px]">
							<span className="main-transition hover-main">{t("saudi")}</span>
						</Link>

						<Link href={"mailto:ymtaz@ymtaz.sa"} target="_blank" className="flex items-center gap-[15px]">
							<span className="main-transition hover-main">ymtaz@ymtaz.sa</span>
						</Link>

						<Link href="/contact" target="_blank" className="hidden lg:flex items-center gap-[15px]">
							<span className="main-transition hover-main">{t("contactus")}</span>
						</Link>
					</div>
				</div>

				<div className="lg:hidden md:text-center mt-[30px]">
					<p className="mt-4 text-[17px] font-medium">
						<i className="fa-solid fa-clock me-2"></i>
						{t("time")}
					</p>
					<p className="mt-4 text-[17px] font-medium">{t("hint")}</p>
				</div>

				<div className="text-center mt-[60px]">
					<span className="text-center p-0 m-0">{t("copyRight")}</span>
				</div>
			</div>
		</footer>
	);
}
