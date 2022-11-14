import { API, FETCH } from "./api";

export const getStudentResults = async () => {
	try {
		const response: any = await FETCH({
			url: API.STUDENT_QUIZ_RESULT_URL,
		});
		if (!response?.status) {
			throw new Error(response.message);
		}
		return response?.results;
	} catch (err) {
		console.log(err);
		return [];
	}
};

export const getStudentQuizResults = async (quizId: string) => {
	try {
		const response: any = await FETCH({
			url: API.STUDENT_QUIZ_RESULT_URL + "/" + quizId,
		});
		if (!response?.status) {
			throw new Error(response.message);
		}
		return response?.result;
	} catch (err) {
		console.log(err);
		return [];
	}
};

export const getUserQuizResult = async (quizId: string, userId: string) => {
	try {
		const response: any = await FETCH({
			url: API.RESULT_URL + "/" + quizId + "/" + userId,
		});
		if (!response?.status) {
			throw new Error(response.message);
		}
		return response?.result;
	} catch (err) {
		console.log(err);
		return [];
	}
};
