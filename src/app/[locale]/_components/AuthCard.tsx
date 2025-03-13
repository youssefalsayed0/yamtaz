"use client"
import { useHome } from "@/hooks/useHome";
import { Link } from "@/i18n/routing";
import React from "react";

export default function AuthCard() {
	interface Card {
		name: string;
		description: string;
		text: string;
	}

	
	const { data, isLoading, error } = useHome();

	if (isLoading) return null;
	if (error) return <p>Error loading home data</p>;

	const AuthCards: Card[] = data?.cards || [];

	return (
		<>
			{AuthCards.map((card, index) => (
				<div key={index} className="shadow-md rounded-md flex flex-col py-6 px-4 gap-4 main-transition hover-scale">
					<div className="flex flex-row items-center font-bold text-[#00262F] gap-4">
						<Link href="!#" className="main-transition hover-main">
							<p>{card.name}</p>
						</Link>
					</div>
					<p className="text-start text-md leading-6 color-pr font-medium">{card.text}</p>
				</div>
			))}
		</>
	);
}
