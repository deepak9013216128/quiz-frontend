import useSWR from "swr";
import { API } from "../services/api";
import {
	getStudentQuizResults,
	getStudentResults,
	getUserQuizResult,
	getQuizResults,
	getUsersResults,
	getUserResults,
} from "../services/result";

export const useStudentResults = () => {
	const { data, error } = useSWR(
		API.STUDENT_QUIZ_RESULT_URL,
		getStudentResults,
		{
			// revalidateIfStale: false,
			refreshInterval: 0,
			revalidateOnFocus: false,
			revalidateOnReconnect: false,
		}
	);

	return data;
};
export const useStudentQuizResult = (quizId: string) => {
	const { data, error } = useSWR(
		quizId,
		(quizId) => getStudentQuizResults(quizId),
		{
			// revalidateIfStale: false,
			refreshInterval: 0,
			revalidateOnFocus: false,
			revalidateOnReconnect: false,
		}
	);

	return data;
};

export const useUserQuizResult = (quizId: string, userId: string) => {
	const { data, error } = useSWR(
		quizId,
		(quizId) => getUserQuizResult(quizId, userId),
		{
			// revalidateIfStale: false,
			refreshInterval: 0,
			revalidateOnFocus: false,
			revalidateOnReconnect: false,
		}
	);

	return data;
};

export const useQuizResults = (quizId: string) => {
	const { data, error } = useSWR(quizId, (quizId) => getQuizResults(quizId), {
		// revalidateIfStale: false,
		refreshInterval: 0,
		revalidateOnFocus: false,
		revalidateOnReconnect: false,
	});

	return data;
};

export const useUsersResults = () => {
	const { data, error } = useSWR("users result list", getUsersResults, {
		// revalidateIfStale: false,
		refreshInterval: 0,
		revalidateOnFocus: false,
		revalidateOnReconnect: false,
	});

	return data;
};

export const useUserResults = (userId: string) => {
	const { data, error } = useSWR(userId, (userId) => getUserResults(userId), {
		// revalidateIfStale: false,
		refreshInterval: 0,
		revalidateOnFocus: false,
		revalidateOnReconnect: false,
	});

	return data;
};
