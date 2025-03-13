"use client"
import { useSocial } from "@/hooks/useHome";
import { Link } from "@/i18n/routing";
import Image from "next/image";
import React from "react";

export default function Social() {
	type SocialLink = {
		name: string;
		url: string;
		logo: string;
	  };
	  
        const { data, isLoading, error } = useSocial();
        if (isLoading) return null;
        if (error) return <p>Error loading home data</p>;
        const links = data ;

	return (
		<>
		<div className="flex lg:flex items-start gap-[25px] justify-start text-white">
        {links?.map((item: SocialLink) => (
          <Link
            className="border border-main bg-white rounded-full"
            key={item.name}
            href={item.url}
            target="_blank"
          >
            <Image
              src={item.logo}
              width={60}
              height={60}
              alt="image"
              className="w-[32px] h-[32px]"
            />
          </Link>
        ))}
      </div>
		</>
	);
}
