import "../styles/globals.css";
import type { AppProps } from "next/app";

import "bootstrap/dist/css/bootstrap.min.css";
import { AuthProvider } from "../context/auth-context";
import DialogProvider from "../components/dialog";

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<AuthProvider>
			<DialogProvider>
				<Component {...pageProps} />
			</DialogProvider>
		</AuthProvider>
	);
}

export default MyApp;

