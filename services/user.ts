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
		return response?.role;
	} catch (err) {
		console.log(err);
		return undefined;
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

export const changeUserStatus = async (userId: string, status: string) => {
	try {
		const response: any = await FETCH({
			url: API.GET_USERS_URL + "/status",
			method: "PUT",
			body: { userId, status },
		});
		if (!response?.status) {
			throw new Error(response?.error);
		}
		return response?.user;
	} catch (err) {
		console.log(err);
		return [];
	}
};

export const changeUserRole = async (userId: string, role: string) => {
	try {
		const response: any = await FETCH({
			url: API.GET_USERS_URL + "/role",
			method: "PUT",
			body: { userId, role },
		});
		if (!response?.status) {
			throw new Error(response?.error);
		}
		return response?.user;
	} catch (err) {
		console.log(err);
		return [];
	}
};
