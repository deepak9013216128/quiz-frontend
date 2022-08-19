import { API, FETCH } from "./api";

export const getStudentQuiz = async () => {
	try {
		const response: any = await FETCH({
			url: API.STUDENT_QUIZ_URL,
		});
		if (!response?.status) {
			throw new Error(response.message);
		}
		return response?.quiz;
	} catch (err) {
		console.log(err);
		return [];
	}
};

// export const getQnsFromQuiz = async (quizId: string) => {
// 	try {
// 		const response: any = await FETCH({
// 			url: API.QUIZ_URL + "/" + quizId,
// 		});
// 		if (!response?.status) {
// 			throw new Error(response.message);
// 		}
// 		return response?.quizQns;
// 	} catch (err) {
// 		console.log(err);
// 		return [];
// 	}
// };
