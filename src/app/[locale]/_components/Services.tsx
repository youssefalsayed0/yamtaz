import React from "react";
import GuestCard from "./GuestCard";

export default function Services() {
	return (
		<section className="main-p">
			<div className="container">
				<div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1  gap-5">
					<GuestCard />
				</div>
			</div>
		</section>
	);
}
