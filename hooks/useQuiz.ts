import useSWR from "swr";
import { getQuiz } from "../services/quiz";

export const useQuiz = () => {
	const { data, error } = useSWR("get quiz", getQuiz, {
		revalidateIfStale: false,
		revalidateOnFocus: false,
		revalidateOnReconnect: false,
	});

	return data;
};
