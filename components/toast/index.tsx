import * as React from "react";
import Alert from "react-bootstrap/Alert";

export const ToastContext = React.createContext({
	showToast: (type: string, msg: string) => {},
	hideToast: (id: string) => {},
});

const ToastContainer = (props: any) => (
	<div
		className=" mx-3 pt-5"
		style={{ position: "fixed", zIndex: 20000000, right: 0, top: 0 }}
		{...props}
	/>
);

const ToastMessage = ({ type, msg, onHide }: any) => {
	const [show, setShow] = React.useState(true);
	if (show) {
		return (
			<Alert
				key={type}
				variant={type}
				onClose={() => {
					setShow(false);
					onHide();
				}}
				dismissible
			>
				{msg}
			</Alert>
		);
	}
	return null;
};

let toastCount = 0;

export default function ToastProvider({ children }: any) {
	const [toasts, setToasts] = React.useState<any>([]);

	const showToast = (type: string, msg: string) => {
		const id = toastCount++;
		const toast = { type, msg, id };
		setToasts((t: any) => [...t, toast]);
		return id;
	};
	const hideToast = (id: string) => {
		const newToasts = toasts.filter((t: any) => t.id !== id);
		setToasts(newToasts);
	};
	// avoid creating a new fn on every render
	const onHide = (id: string) => () => hideToast(id);

	return (
		<>
			<ToastContext.Provider value={{ showToast, hideToast }}>
				{children}
			</ToastContext.Provider>
			<ToastContainer position="top-center">
				{toasts.map(({ msg, type, id }: any) => (
					<ToastMessage key={id} msg={msg} type={type} onHide={onHide} />
				))}
			</ToastContainer>
			{/* <Stack spacing={2} sx={{ width: "100%" }}>
				<Snackbar
					open={open}
					autoHideDuration={5000}
					onClose={hideAlert}
					anchorOrigin={{ vertical: "top", horizontal: "right" }}
				>
					<Alert onClose={hideAlert} severity={type} sx={{ width: "100%" }}>
						{msg}
					</Alert>
				</Snackbar>
			</Stack> */}
		</>
	);
}

export const useToasts = () => React.useContext(ToastContext);
