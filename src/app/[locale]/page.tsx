import Hero from "./_components/Hero";
import { setRequestLocale } from "next-intl/server";

export default async function HomePage({
    params,
}: {
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;
    setRequestLocale(locale);
	return (
		<>
		<h1 className="wow animate__animated animate__rotateOut">
dsadasdasdasa
		</h1>
			<Hero />
		</>
	);
}
