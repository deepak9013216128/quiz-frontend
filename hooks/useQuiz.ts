import useSWR from "swr";
import { API } from "../services/api";
import { getQnsFromQuiz, getQuiz, getQuizInvitations } from "../services/quiz";

export const useQuiz = () => {
	const { data, error } = useSWR(API.QUIZ_URL, getQuiz, {
		// revalidateIfStale: false,
		refreshInterval: 0,
		revalidateOnFocus: false,
		revalidateOnReconnect: false,
	});

	return data;
};
export const useQnsFromQuiz = (quizId: string) => {
	const { data, error } = useSWR(quizId, (quizId) => getQnsFromQuiz(quizId), {
		// revalidateIfStale: false,
		refreshInterval: 0,
		revalidateOnFocus: false,
		revalidateOnReconnect: false,
	});

	return data;
};

export const useQuizInvitation = () => {
	const { data, error } = useSWR(API.QUIZ_INVITATION_URL, getQuizInvitations, {
		// revalidateIfStale: false,
		refreshInterval: 0,
		revalidateOnFocus: false,
		revalidateOnReconnect: false,
	});

	return data;
};
