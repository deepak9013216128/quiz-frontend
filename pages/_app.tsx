import "../styles/globals.css";
import type { AppProps } from "next/app";

import "bootstrap/dist/css/bootstrap.min.css";
import { AuthProvider } from "../context/auth-context";
import DialogProvider from "../components/dialog";
import LoaderProvider from "../components/loader";
import ToastProvider from "../components/toast";

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<AuthProvider>
			<LoaderProvider>
				<ToastProvider>
					<DialogProvider>
						<Component {...pageProps} />
					</DialogProvider>
				</ToastProvider>
			</LoaderProvider>
		</AuthProvider>
	);
}

export default MyApp;

