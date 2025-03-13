import Hero from "./_components/Hero";
import { setRequestLocale } from "next-intl/server";
import Newsletter from "./_components/Newsletter";
import Services from "./_components/Services";
import LawyersSlider from "./_components/LawyersSlider";
import WhyUS from "./_components/WhyUS";

export default async function HomePage({ params }: { params: { locale: string } }) {
    setRequestLocale(params.locale);


    return (
        <>
            <Hero />
            <Newsletter />
            <Services />
            <LawyersSlider />
            <WhyUS />
        </>
    );
}
