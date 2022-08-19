import useSWR from "swr";
import { API } from "../services/api";
import { getStudentQuiz } from "../services/student";

export const useStudentQuiz = () => {
	const { data, error } = useSWR(API.STUDENT_QUIZ_URL, getStudentQuiz, {
		revalidateIfStale: false,
		revalidateOnFocus: false,
		revalidateOnReconnect: false,
	});

	return data;
};
