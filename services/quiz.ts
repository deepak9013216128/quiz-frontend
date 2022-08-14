import { API, FETCH } from "./api";

interface qnsInterface {
	title: string;
	description: string;
}

export const createQuiz = async (qns: qnsInterface) => {
	try {
		const response: any = await FETCH({
			url: API.QUIZ_URL,
			method: "POST",
			body: { ...qns },
		});
		if (!response.status) {
			throw new Error(response.message);
		}
	} catch (err) {
		console.log(err);
	}
};

export const getQuiz = async () => {
	try {
		const response: any = await FETCH({
			url: API.QUIZ_URL,
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
