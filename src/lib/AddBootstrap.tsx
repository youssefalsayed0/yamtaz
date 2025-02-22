//  AddBootstrap.js

"use client";

import { useEffect } from "react";

export default function AddBootstrap() {
    useEffect(() => {
        // @ts-expect-error no types
        import("bootstrap/dist/js/bootstrap.bundle.js");
    }, []);
    return <></>;
}
