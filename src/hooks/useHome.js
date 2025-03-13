"use client";

import { useQuery } from "@tanstack/react-query";
import { api } from "../services/api";


/* fetch home data (sections , cards , etc...)  */
const fetchHomeData = async () => {
	const { data } = await api.get("v1/general-data/homepage");
	return data.data;
};

export const useHome = () => {
	return useQuery({ queryKey: ["home"], queryFn: fetchHomeData  });
};


/* fetch lawyer slider */
const fetchLawyers = async () => {
	const { data } = await api.get("v1/recentlyJoinedLawyers");
	return data;
};

export const useLawyerSlider = () => {
	return useQuery({ queryKey: ["lawyer"], queryFn: fetchLawyers  });
};


/* fetch social media data   */
const fetchSocial = async () => {
	const { data } = await api.get("v1/general-data/static-page/social-media");
	return data.data;
};

export const useSocial = () => {
	return useQuery({ queryKey: ["social"], queryFn: fetchSocial  });
};
