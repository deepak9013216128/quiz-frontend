import useSWR from "swr";
import { getQnsFromQuiz, getQuiz } from "../services/quiz";

export const useQuiz = () => {
	const { data, error } = useSWR("get quiz", getQuiz, {
		revalidateIfStale: false,
		revalidateOnFocus: false,
		revalidateOnReconnect: false,
	});

	return data;
};
export const useQnsFromQuiz = (quizId: string) => {
	const { data, error } = useSWR(quizId, (quizId) => getQnsFromQuiz(quizId), {
		revalidateIfStale: false,
		revalidateOnFocus: false,
		revalidateOnReconnect: false,
	});

	return data;
};
