import { API, FETCH } from "./api";

interface topicInterface {
	title: string;
	description: string;
}

interface subTopicInterface {
	title: string;
	description: string;
	topicId: string;
}

export const createTopic = async ({ title, description }: topicInterface) => {
	try {
		const response: any = await FETCH({
			url: API.TOPIC_URL,
			method: "POST",
			body: { title, description },
		});
		if (!response.status) {
			throw new Error(response.message);
		}
	} catch (err) {
		console.log(err);
	}
};

export const getTopic = async () => {
	try {
		const response: any = await FETCH({
			url: API.TOPIC_URL,
		});
		const { status, topic, message } = response;
		if (!status) {
			throw new Error(message);
		}
		return topic;
	} catch (err) {
		console.log(err);
	}
};
