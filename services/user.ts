import { API, FETCH } from "./api";

interface loginInterface {
	email: string;
	password: string;
}

interface sendInvitationInterface {
	name: string;
	email: string;
	role: string;
}

const saveUser = (res: any) => {
	const { email, token, name, role } = res;
	localStorage.setItem("email", email);
	localStorage.setItem("token", token);
	localStorage.setItem("name", name);
	localStorage.setItem("role", role);
};

export const login = async ({ email, password }: loginInterface) => {
	try {
		const response: any = await FETCH({
			url: API.LOGIN_URL,
			method: "POST",
			body: { email, password },
		});
		saveUser(response);
	} catch (err) {
		console.log(err);
	}
};

export const sendInvitation = async ({
	name,
	email,
	role,
}: sendInvitationInterface) => {
	try {
		const response: any = await FETCH({
			url: API.SEND_INVITE_URL,
			method: "POST",
			body: { email, name, role },
		});
		const { invitationToken } = response;
		return invitationToken;
	} catch (err) {
		console.log(err);
	}
};

export const register = async (password: string, token: string) => {
	try {
		const response: any = await FETCH({
			url: API.REGISTER_URL,
			method: "POST",
			body: { password, token },
		});
		saveUser(response);
	} catch (err) {
		console.log(err);
	}
};

export const getUsers = async () => {
	try {
		const response: any = await FETCH({
			url: API.GET_USERS_URL,
		});
		if (!response?.status) {
			throw new Error(response?.error);
		}
		return response?.users;
	} catch (err) {
		console.log(err);
		return [];
	}
};
