import * as React from "react";
import Spinner from "react-bootstrap/Spinner";

export const LoaderContext = React.createContext({
	showLoader: () => {},
	hideLoader: () => {},
});

export default function LoaderProvider({ children }: any) {
	const [open, setOpen] = React.useState(0);

	const showLoader = () => {
		setOpen((p) => p + 1);
	};
	const hideLoader = () => {
		setOpen((p) => p - 1);
	};

	return (
		<>
			<LoaderContext.Provider value={{ showLoader, hideLoader }}>
				{children}
			</LoaderContext.Provider>
			{open ? (
				<div
					style={{
						position: "fixed",
						top: "0",
						width: " 100vw",
						height: " 100vh",
						zIndex: " 999",
						backgroundColor: " rgb(0,0,0,0.2)",
					}}
				>
					<div className="h-100 d-flex align-items-center justify-content-center">
						<Spinner animation="border" variant="info" />
					</div>
				</div>
			) : null}
		</>
	);
}

export const useLoader = () => React.useContext(LoaderContext);
