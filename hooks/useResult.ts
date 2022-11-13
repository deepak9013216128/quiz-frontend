import useSWR from "swr";
import { API } from "../services/api";
import { getStudentQuizResults, getStudentResults } from "../services/result";

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
