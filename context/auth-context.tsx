import React, { useEffect } from "react";
import { useRouter } from "next/router";

const AuthContext = React.createContext({
	authState: { token: "", role: "", name: "", email: "" },
	setAuthState: (userAuthInfo: AuthUser) => {},
	isUserAuthenticated: () => {},
});

interface AuthUser {
	name: string;
	role: string;
	email: string;
	token: string;
}
type Props = { children?: React.ReactNode };

const { Provider } = AuthContext;
const AuthProvider: React.FC<Props> = ({ children }) => {
	const [authState, setAuthState] = React.useState<AuthUser>({
		token: "",
		role: "",
		name: "",
		email: "",
	});

	const setUserAuthInfo = ({ token, email, name, role }: AuthUser) => {
		setAuthState({
			token,
			email,
			name,
			role,
		});
	};

	// checks if the user is authenticated or not
	const isUserAuthenticated = () => {
		if (!authState.token) {
			return false;
		}
		return true;
	};

	return (
		<Provider
			value={{
				authState,
				setAuthState: (userAuthInfo: AuthUser) => setUserAuthInfo(userAuthInfo),
				isUserAuthenticated,
			}}
		>
			{children}
		</Provider>
	);
};

export { AuthContext, AuthProvider };
