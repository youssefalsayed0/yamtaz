import axios from "axios";
import Cookies from "js-cookie";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://api.ymtaz.sa/api/";
const locale = Cookies.get("NEXT_LOCALE");

export const api = axios.create({
	baseURL: API_URL,
	headers: {
		"Accept-Language": locale || "ar",
		"Content-Type": "application/json",
	},
});

// Dynamically update the language header before every request
api.interceptors.request.use((config) => {
	config.headers["Accept-Language"] = Cookies.get("NEXT_LOCALE");
	return config;
});
