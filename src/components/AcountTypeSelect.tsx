"use client"
import React from "react";
import { Link, usePathname } from "@/i18n/routing";
import Image from "next/image";
import user from "@/assets/images/user.svg";
import judge from "@/assets/images/judge.svg";
import { useTranslations } from "next-intl";

interface AccountTypeSelectProps {
  title: string;
  description: string;
  linktitle: string;
  link: string;
  linktype: string;
}

const AccountTypeSelect: React.FC<AccountTypeSelectProps> = ({ title, description, linktitle, link, linktype }) => {
  const t = useTranslations("accountType");
  const pathname = usePathname();
  const providerpath = `${pathname}/provider`;
  const clientpath = `${pathname}/client`;
  return (
    <div className="flex flex-col gap-[20px] w-full md:w-[70%] text-center justify-center items-center">
      <h4 className="font-bold text-[20px] lg:text-[20px] 2xl:text-[30px] text-center">
        {title}
        <p className="text-center text-[20px] font-normal mt-5 text-gray">{description}</p>
      </h4>
      <div className="w-full px-8 md:px-0 flex flex-col gap-4 my-4">
        <Link
          className="bg-white shadow-md hover:shadow-lg transition-all duration-[0.5s] flex w-full p-3 2xl:p-5 justify-between items-center flex-row rounded-md"
          href={clientpath}
        >
          <div className="flex w-full gap-[10px] 2xl:text-[23px] items-center">
            <div className="relative w-10 h-10 flex items-center justify-center pentagon !bg-[#b2c6cb]">
              <Image src={user} alt="user icon" width={0} height={0} />
            </div>
            {t("serviceSeeker")}
          </div>
        </Link>
        <Link
          className="bg-white shadow-md hover:shadow-lg transition-all duration-[0.5s] flex w-full p-3 2xl:p-6 justify-between items-center flex-row rounded-md"
          href={providerpath}
        >
          <div className="flex w-full gap-[10px] 2xl:text-[23px] items-center">
            <div className="relative w-10 h-10 flex items-center justify-center pentagon !bg-[#E4D2A9]">
              <Image src={judge} alt="judge icon" width={0} height={0} />
            </div>
            {t("serviceProvider")}
          </div>
        </Link>
        <div className="flex flex-row mx-auto mt-4 gap-[5px]">
          <p className="text-black text-[16px] font-semibold">{linktitle}</p>
          <Link href={link} className="color-main underline font-semibold">
            {linktype}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AccountTypeSelect;
