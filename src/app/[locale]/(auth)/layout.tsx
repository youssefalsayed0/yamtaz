// app/locale/layout.tsx (LocaleLayout)
import Image from "next/image";
import logo from "@/assets/images/logo.svg";
import vectorTop from "@/assets/images/Vector-top.svg";
import vectorButtom from "@/assets/images/Vector-buttom.svg";
import { useTranslations } from "next-intl";

export default  function Layout({ children }: { children: React.ReactNode }) {
	const t = useTranslations("accountType");
	return (
		<>
			<div className="flex  flex-wrap flex-row w-full min-h-[100dvh] mx-auto shadow-md  mt-[-82px]">
				{/* Left Section (Content) */}

					<div className="flex  justify-center items-center w-full md:w-1/2 bg-white flex-col p-2 ">{children}</div>
	

				{/* Right Section (Sidebar with Logo and Text) */}
				<div className="md:flex justify-center items-start hidden  w-0 md:w-1/2 p-2 bg-[#00262F] py-[10rem] text-white flex-col sticky top-0  h-[100vh]   ">
					<div className="relative w-fit">
						{/* Top Vector Image */}
						<Image className="relative rtl:right-[90%] ltr:left-[10%]" src={vectorTop} alt="vector" />

						{/* Logo and Text */}
						<div className="mx-auto flex items-center justify-center flex-col relative w-fit">
							<Image loading="lazy" src={logo} alt="logo" />
							<p className="text-center w-[80%] md:w-[60%] my-2 md:my-3 lg:my-5 font-[900] text-[14px] leading-[35px] md:text-[24px] lg:text-[26px] ymtaz">{t("form")} </p>
						</div>

						{/* Bottom Vector Image */}
						<Image className="relative rtl:right-[10%] ltr:left-[90%] top-[20px]" src={vectorButtom} alt="vector" />
					</div>
				</div>
			</div>
		</>
	);
}
