import { API, FETCH } from "./api";

interface qnsInterface {
	title: string;
	description: string;
}

export const createQns = async (qns: qnsInterface) => {
	try {
		const response: any = await FETCH({
			url: API.QNS_URL,
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

interface getQnsInterface {
	topic: string;
	subTopic: string;
}

export const getQns = async ({ topic, subTopic }: getQnsInterface) => {
	try {
		const response: any = await FETCH({
			url: API.QNS_URL,
			params: {
				topicId: topic,
				subTopicId: subTopic,
			},
		});
		if (!response?.status) {
			throw new Error(response.message);
		}
		return response?.qns;
	} catch (err) {
		console.log(err);
	}
};
