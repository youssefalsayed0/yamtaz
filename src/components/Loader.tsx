"use client";


import { usePathname } from "@/i18n/routing";
import { useEffect, useState } from "react";

export default function Loader() {
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 200); // Simulate loading delay
    return () => clearTimeout(timer);
  }, [pathname]);

  if (!loading) return null; // Hide loader when not loading

  return (
    <div className="w-screen h-screen flex items-center justify-center absolute top-0 left-0 bg-base-100 bg-opacity-100 z-50">
    <span className="loading loading-dots loading-lg"></span>
  </div>
  );
}
