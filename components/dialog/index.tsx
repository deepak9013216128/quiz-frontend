import * as React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

interface showDialogInterface {
	title: string;
	content?: any;
	cancelBtnText?: string;
	okBtnText?: string;
	handleCancelBtn?: () => void;
	handleOkBtn?: () => void;
}

interface dialogInterface {
	showDialog: (props: showDialogInterface) => void;
	hideDialog: (props: any) => void;
}

export const DialogContext = React.createContext<dialogInterface>({
	showDialog: (props: showDialogInterface) => {},
	hideDialog: (prosp: any) => {},
});

export default function DialogProvider({ children }: any) {
	const [open, setOpen] = React.useState(false);
	const [dialog, setDialog] = React.useState<any>({
		title: "",
		content: "",
		imageUrl: "",
		cancelBtnText: "",
		okBtnText: "",
		handleCancelBtn: () => {},
		handleOkBtn: () => {},
	});

	const showDialog = ({
		title = "",
		content = "",
		imageUrl = "",
		cancelBtnText = "",
		okBtnText = "",
		handleCancelBtn = () => {},
		handleOkBtn = () => {},
	}) => {
		setOpen((p) => !p);
		setDialog({
			title,
			content,
			imageUrl,
			cancelBtnText,
			okBtnText,
			handleCancelBtn,
			handleOkBtn,
		});
	};
	const hideDialog = (isOkay: any) => {
		if (isOkay === 1) {
			dialog.handleOkBtn();
		} else if (isOkay === 0) {
			dialog.handleCancelBtn();
		}
		setOpen((p) => !p);
		setDialog({
			title: "",
			content: "",
			imageUrl: "",
			cancelBtnText: "",
			okBtnText: "",
			handleCancelBtn: () => {},
			handleOkBtn: () => {},
		});
	};

	return (
		<>
			<DialogContext.Provider
				value={{ showDialog: showDialog, hideDialog: hideDialog }}
			>
				{children}
			</DialogContext.Provider>
			<Modal
				show={open}
				onHide={() => hideDialog(0)}
				backdrop="static"
				keyboard={false}
			>
				<Modal.Header>
					<Modal.Title>{dialog.title}</Modal.Title>{" "}
				</Modal.Header>
				<Modal.Body>{dialog.content}</Modal.Body>{" "}
				{dialog.okBtnText && (
					<Modal.Footer>
						{dialog.cancelBtnText && (
							<Button onClick={() => hideDialog(0)} variant="outlined">
								{dialog.cancelBtnText}
							</Button>
						)}
						{dialog.okBtnText && (
							<Button onClick={() => hideDialog(1)}>{dialog.okBtnText}</Button>
						)}
					</Modal.Footer>
				)}
			</Modal>
		</>
	);
}
