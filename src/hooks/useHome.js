"use client";

import { useQuery } from "@tanstack/react-query";
import { api } from "../services/api";

const fetchHomeData = async () => {
	const { data } = await api.get("v1/general-data/homepage");
	return data.data;
};

export const useHome = () => {
	return useQuery({ queryKey: ["home"], queryFn: fetchHomeData  });
};
