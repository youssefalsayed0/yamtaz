"use client";
import { useLawyerSlider } from "@/hooks/useHome";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { JSX } from "react";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

interface Lawyer {
	id: number;
	name: string;
	profile_photo: string;
	city: {
		title: string;
	};
}

export default function LawyersSlider(): JSX.Element | null {
	const t = useTranslations("landingPage");

	// Define API response type
	const { data, isLoading, error } = useLawyerSlider();
	if (isLoading) return null;
	if (error) return <p>Error loading home data</p>;

	// Ensure `lawyers` is properly typed
	const lawyers: Lawyer[] = data?.data?.newAdvisories ?? [];

	return (
		<section className="bg-white main-p w-full lawyers" dir="ltr">
			<div className="w-full flex justify-center items-center my-3">
				<Link href="/" className="font-bold mx-auto my-4 color-pr w-full text-center text-[25px]">
					{t("title")}
				</Link>
			</div>

			<Swiper
				autoplay={{
					delay: 2000,
					disableOnInteraction: false,
				}}
				modules={[Autoplay]}
				loop={true}
				slidesPerView={1}
				spaceBetween={0}
				breakpoints={{
					480: { slidesPerView: 2 },
					768: { slidesPerView: 3 },
					1025: { slidesPerView: 4 },
					1300: { slidesPerView: 5 },
					1400: { slidesPerView: 6 },
				}}
				className="mySwiper">
				{lawyers.map((user: Lawyer) => (
					<SwiperSlide key={user.id}>
						<div className="p-3">
							<div className="py-[25px] px-2 shadow-cus rounded-lg text-center hover-scale main-transition">
								<Image alt="image" width={70} height={70} src={user.profile_photo} priority className="rounded-full aspect-[1:1] mx-auto w-16 h-16 cursor-pointer hover-scale main-transition" />
								<p className="text-lg mt-2 truncate text-center font-bold cursor-pointer main-transition hover-main inline-block">{user.name}</p>
								<div className="flex flex-row items-center justify-center w-full gap-1">
									<p className="text-lg mt-1 font-semibold">{user.city.title}</p>
									<i className="fa-solid fa-location-dot color-main"></i>
								</div>
							</div>
						</div>
					</SwiperSlide>
				))}
			</Swiper>
		</section>
	);
}
