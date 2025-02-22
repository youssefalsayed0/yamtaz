"use client";

import { useEffect } from "react";
export default function AddWow() {
    useEffect(() => {
        const importWow = async () => {
            if (typeof window !== "undefined") {
                // @ts-expect-error no types
                const WOW = await import("wow.js");
                // Initialize Wow.js with custom settings
                const wow = new WOW.default({
                    offset: 100,
                    mobile: true,
                    live: true,
                });
                wow.init();
            }
        };

        importWow();
    }, []);

    return <></>; // This component doesn't render anything
}
