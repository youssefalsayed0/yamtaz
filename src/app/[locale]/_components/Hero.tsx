"use client";
import React, { useState, useEffect } from "react";
import { useHome } from "@/hooks/useHome";
import { Link } from "@/i18n/routing";
import Image from "next/image";
import hero from "@/assets/images/home/svgviewer-output.svg";
import { useTranslations } from "next-intl";
export default function Hero() {
	const t = useTranslations("landingPage");

	const { data, isLoading, error } = useHome();

	if (isLoading) return null;
	if (error) return <p>Error loading home data</p>;

	const headerSection = data?.sections.find((sec : string) => sec.title === "header");
	/* 	const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://api.ymtaz.sa/api/"; 
	const imageUrl = `${BASE_URL}${headerSection.image.url}`; */
	return (
		<>
			<section className="landing main-p xl:p-0 xl:min-h-screen  ">
				<div className="container  xl:min-h-screen  xl:flex  xl:items-center ">
					<div className=" flex flex-col h-100  xl:flex-row-reverse   sm:items-center lg:justify-between gap-[41px] text-center lg:text-right w-full ">
						<div className=" flex justify-center items-center relative flex-col w-1\2">
							<div className="[background:radial-gradient(50%_50%_at_50%_50%,_#ffffffcc,_#ddb762cc)] blur-[150px]  absolute w-full h-full flex text-transparent"></div>
							<div className="z-10 flex">
								<Image alt="app" src={hero} width={0} height={0} className="img-fluid  wow animate__animated animate__bounceInUp  " />
							</div>
							<p className="mt-4 text-[17px] color-silver z-10 font-medium ">
																<i className="fa-solid fa-clock me-2 "></i> {t("homeSectionView.message")}
								
							</p>
						</div>

						<div className="flex flex-col gap-4  w-1\2 ">
							<div className="self-stretch flex flex-col  justify-center xl:justify-start gap-[16px]">
								<p className=" wow animate__animated animate__heartBeat  m-0  whitespace-pre-wrap font-bold p-2 self-stretch relative text-center xl:text-start  text-base lg:text-xl lg:leading-9 font-cairo">
									{headerSection.content}
								</p>
								<div className="flex lg:gap-4  justify-center xl:justify-start ">
									<Link
										href="https://appgallery.huawei.com/#/app/C111639425"
										className="self-stretch flex flex-row items-center justify-center lg:justify-start main-transition hover-scale  "
										target="_blank">
										{/* <AppGallery /> */}
									</Link>
									<Link
										href="https://play.google.com/store/apps/details?id=com.ymtaz.ymtaz"
										className="self-stretch flex flex-row items-center justify-center lg:justify-start main-transition hover-scale"
										target="_blank">
										{/* <GooglePlay /> */}
									</Link>
									<Link
										href="https://apps.apple.com/us/app/ymtaz-%D9%8A%D9%85%D8%AA%D8%A7%D8%B2/id6602893553"
										className="self-stretch flex flex-row items-center justify-center lg:justify-start main-transition hover-scale"
										target="_blank">
										{/* <AppStore /> */}
									</Link>
								</div>
							</div>
							<div className="self-stretch flex flex-row items-center justify-center text-right text-xs">
								<div className="w-full flex flex-row items-start justify-center xl:justify-start gap-2">
									<Link href="/" className="outer-btn me-3">
											{t("homeSectionView.login")}
										</Link>
										<Link href="/" className="fill-btn">
											{t("homeSectionView.register")}
										</Link>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
		</>
	);
}
