"use client";
import React, { JSX } from "react";
import whyus1 from "@/assets/images/home/whyus.svg";
import { useTranslations } from "next-intl";
import { useHome } from "@/hooks/useHome";
import Image from "next/image";

// Define API response types
interface WhyUsItem {
	id: number;
	text: string;
}


export default function WhyUS(): JSX.Element | null {
	const t = useTranslations("landingPage");
	const { data, isLoading, error } = useHome(); // Use generics for typed API response

	if (isLoading) return null;
	if (error) return <p>Error loading home data</p>;

	const whyus = data?.["why-chose-us"] ?? [];

	return (
		<section className="main-p">
			<div className="container">
				<div className="flex flex-col lg:flex-row-reverse lg:items-center lg:justify-between gap-4">
					<div className="flex justify-center">
						<Image src={whyus1} width={350} height={350} alt="phone" className="mt-[-20px] bounce main-transition" />
					</div>
					<div className="flex flex-col text-start mt-5 lg:mt-0 gap-4">
						<p className="font-bold text-start text-[28px] color-pr">{t("about.why")}</p>
						{whyus.map((point: WhyUsItem) => (
							<div className="flex gap-4 md:items-center " key={point.id}>
								<i className="fa-solid fa-shield-check color-main fa-lg mt-4 md:mt-0"></i>
                                 <p className="font-semibold color-sec text-start text-xl">{point.text}</p>
							</div>
						))}
					</div>
				</div>
			</div>
		</section>
	);
}
