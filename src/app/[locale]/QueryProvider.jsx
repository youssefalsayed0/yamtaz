"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useState } from "react";

export default function QueryProvider({ children }) {
	const [queryClient] = useState(() => 
		new QueryClient({
			defaultOptions: {
				queries: {
					refetchOnWindowFocus: false, // Prevent refetching on tab focus
				},
			},
		})
	);

	return (
		<QueryClientProvider client={queryClient}>
			{children}
			<ReactQueryDevtools initialIsOpen={false} />
		</QueryClientProvider>
	);
}
