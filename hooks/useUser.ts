import useSWR from "swr";
import { getUsers } from "../services/user";

export const useUsers = () => {
	const { data, error } = useSWR("users", getUsers, {
		revalidateIfStale: false,
		revalidateOnFocus: false,
		revalidateOnReconnect: false,
	});

	return data;
};
