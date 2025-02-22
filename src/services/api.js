import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://api.ymtaz.sa/api/";

const getLocale = () => {
	if (typeof document !== "undefined") {
		const match = document.cookie.match(/NEXT_LOCALE=([^;]*)/);
		return match ? match[1] : "en"; // Default to English
	}
	return "en";
};

export const api = axios.create({
	baseURL: API_URL,
	headers: {
		"Content-Type": "application/json",
	},
});

// Dynamically update the language header before every request
api.interceptors.request.use((config) => {
	config.headers["Accept-Language"] = getLocale();
	return config;
});
