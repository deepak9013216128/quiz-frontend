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

export const addQnsInQuiz = async (quizId: string, qnsId: string) => {
	try {
		const response: any = await FETCH({
			url: API.QUIZ_URL + "/" + quizId,
			method: "POST",
			body: { qnsId },
		});
		// if (!response.status) {
		// 	throw new Error(response.message);
		// }
		return response;
	} catch (err) {
		console.log(err);
	}
};

export const removeQnsInQuiz = async (quizId: string, qnsId: string) => {
	try {
		const response: any = await FETCH({
			url: API.QUIZ_URL + "/" + quizId,
			method: "DELETE",
			body: { qnsId },
		});
		// if (!response.status) {
		// 	throw new Error(response.message);
		// }
		return response;
	} catch (err) {
		console.log(err);
	}
};

export const getQnsFromQuiz = async (quizId: string) => {
	try {
		const response: any = await FETCH({
			url: API.QUIZ_URL + "/" + quizId,
		});
		if (!response?.status) {
			throw new Error(response.message);
		}
		return response?.quizQns;
	} catch (err) {
		console.log(err);
		return [];
	}
};

export const getQuizInvitations = async () => {
	try {
		const response: any = await FETCH({
			url: API.QUIZ_INVITATION_URL,
		});
		if (!response?.status) {
			throw new Error(response.message);
		}
		return response?.quizInvitation;
	} catch (err) {
		console.log(err);
		return [];
	}
};

interface sqiInterface {
	email: string;
	quizId: string;
}

export const sendQuizInvitations = async (body: sqiInterface) => {
	try {
		const response: any = await FETCH({
			url: API.QUIZ_INVITATION_URL,
			method: "POST",
			body,
		});
		if (!response?.status) {
			throw new Error(response.message);
		}
	} catch (err) {
		console.log(err);
	}
};

export const updateQnsResponse = async ({ quizId, qnsId, ...body }: any) => {
	try {
		const response: any = await FETCH({
			url: API.QUIZ_URL + `/${quizId}/${qnsId}`,
			method: "POST",
			body: {
				...body,
			},
		});
		// if (!response?.status) {
		// 	throw new Error(response.message);
		// }
		return response;
	} catch (err) {
		console.log(err);
	}
};

export const submitQuiz = async (quizId: string) => {
	try {
		const response: any = await FETCH({
			url: API.STUDENT_QUIZ_URL + `/${quizId}/`,
			method: "POST",
		});
		// if (!response?.status) {
		// 	throw new Error(response.message);
		// }
		return response;
	} catch (err) {
		console.log(err);
	}
};
