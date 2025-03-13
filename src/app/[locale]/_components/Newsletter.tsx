"use client";

import { useHome } from "@/hooks/useHome";
import { api } from "@/services/api";
import { ErrorAlert, SuccessAlert } from "@/components/sweetAlert";
import { useTranslations } from "next-intl";
import React, { useState } from "react";

export default function Newsletter() {
	interface Section {
		title: string;
	}
	const t = useTranslations("landingPage");
	const [email, setEmail] = useState("");
	const [isLoading, setIsLoading] = useState(false); // Loading state

	const { data, isLoading: isHomeLoading, error } = useHome();
	if (isHomeLoading) return null;
	if (error) return <p>Error loading home data</p>;

	const newsletterSection = data?.sections.find((sec: Section) => sec.title === "newsletter");
	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		setIsLoading(true); // Start loading
		api
			.post("v1/mailer/subscribe", { email })
			.then(() => {
				SuccessAlert({
					text: "شكراً لاشتراكك في النشرة البريدية",
				});
				setEmail(""); // Clear input after success
			})
			.catch((error: unknown) => {
				if (
					typeof error === "object" &&
					error !== null &&
					"response" in error &&
					typeof error.response === "object" &&
					error.response !== null &&
					"status" in error.response &&
					error.response.status === 422
				) {
					ErrorAlert({
						text: "هذا البريد الإلكتروني مشترك بالفعل",
					});
				} else {
					ErrorAlert({
						text: "يرجى المحاولة مرة أخرى لاحقًا",
					});
				}
			})
			.finally(() => {
				setIsLoading(false); // Stop loading
			});
	};

	return (
		<section className="main-p text-center [background:radial-gradient(50%_50%_at_50%_50%,_#033d4a,_#00262f)]">
			<div className="container">
				<div className="flex flex-col text-white justify-center items-center">
					<span className="font-bold text-center text-[20px] lg:text-[28px]">{newsletterSection?.content}</span>
					<p className="font-semibold text-gray lg:hidden my-4">{t("subscribeSection.info")}</p>
					<form onSubmit={handleSubmit} className="flex flex-row px-2 w-full lg:w-1/2 justify-center py-2 rounded-lg gap-2">
						<div className="relative w-[90%] flex md:p-4 justify-center gap-x-[10px] items-center">
							<div className="relative w-full">
								<input
									type="email"
									name="email"
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									placeholder="email@example.com"
									className="py-5 md:py-5 placeholder:text-xs md:placeholder:text-sm w-full rounded-md outline-none h-12 ps-4 pe-24 text-black"
									required
									disabled={isLoading} // Disable input while loading
								/>
								<div className="absolute inset-y-0 ltr:!right-2 rtl:!left-2 flex items-center pr-2">
									<button type="submit" className="fill-btn px-5 !py-1 !rounded-md" disabled={isLoading}>
										{isLoading ? <span className="loading loading-dots loading-xs"></span> : t("subscribeSection.subscribe")}
									</button>
								</div>
							</div>
						</div>
					</form>
				</div>
			</div>
		</section>
	);
}
