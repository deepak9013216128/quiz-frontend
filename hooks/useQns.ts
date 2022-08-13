import useSWR from "swr";
import { getQns } from "../services/qns";

interface getQnsInterface {
	topic: string;
	subTopic: string;
}
export const useQns = (props: getQnsInterface) => {
	console.log(props);
	const { data, error } = useSWR(props, (props) => getQns(props), {
		revalidateIfStale: false,
		revalidateOnFocus: false,
		revalidateOnReconnect: false,
	});

	return data;
};
