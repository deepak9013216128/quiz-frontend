export const baseURL = "http://localhost:5000/api/";

export const API = {
	LOGIN_URL: baseURL + "users/login",
	REGISTER_URL: baseURL + "users/register",
	PROFILE_URL: baseURL + "users/profile",
	SEND_INVITE_URL: baseURL + "users/invitation",
	GET_USERS_URL: baseURL + "users",
	TOPIC_URL: baseURL + "qns/topics",
	QNS_URL: baseURL + "qns",
	QUIZ_URL: baseURL + "quiz",
	QUIZ_INVITATION_URL: baseURL + "quiz/invitation",
	STUDENT_QUIZ_URL: baseURL + "student/quiz",
	STUDENT_QUIZ_RESULT_URL: baseURL + "student/results",
};

interface ApiInterface {
	url: string;
	method?: string;
	body?: any;
	params?: any;
	isFile?: boolean;
}

export const FETCH = ({
	url,
	method,
	body,
	params,
	isFile = false,
}: ApiInterface) => {
	const Url = new URL(url);

	if (params) {
		Url.search = new URLSearchParams(params).toString();
	}
	return fetch(Url, {
		method: method ? method : "GET",
		headers: {
			Authorization:
				"Bearer " + (localStorage.getItem("token") as string) ?? "",
			"Content-Type": isFile ? "multipart/form-data" : "application/json",
		},
		body: isFile ? body : JSON.stringify(body),
	})
		.then((res) => {
			// console.log(res);
			if ([400, 401, 402, 403].includes(res.status)) {
				// return logout();
			}
			return res.json();
		})
		.then((data) => {
			if (data.error) {
				throw Error(data?.error);
			}
			// console.log(data);
			return data;
		})
		.catch((err) => {
			console.log(err);
			// localStorage.clear();
			// window.location.href = "/";
		});
};

function logout() {
	localStorage.clear();
	window.location.href = "/";
}
