"use client";

import { useIsFetching } from "@tanstack/react-query";
import { useEffect, useState } from "react";

export default function LoadingProvider({ children }: { children: React.ReactNode }) {
  const isFetching = useIsFetching();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(isFetching > 0);
  }, [isFetching]);

  return (
    <>
      {loading && (
        <div></div>
        // <div className="w-screen h-screen flex items-center justify-center absolute top-0 left-0 bg-base-100 bg-opacity-100 z-50">
        //   <span className="loading loading-dots loading-lg"></span>
        // </div>
      )}
      {children}
    </>
  );
}