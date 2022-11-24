import { NextPage } from "next";
import { useRouter } from "next/router";
import { ChangeEvent, FormEvent, useContext, useEffect, useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useSWRConfig } from "swr";
import Footer from "../../components/footer";
import Header from "../../components/header";
import { PencilSquare } from "react-bootstrap-icons";
import CustomTable from "../../components/custom-table";
import { useUsers } from "../../hooks/useUser";
import { DialogContext } from "../../components/dialog";
import { changeUserStatus, changeUserRole } from "../../services/user";

const Popup = ({ user, hideDialog, type = "Status" }: any) => {
	const { mutate } = useSWRConfig();
	const [input, setInput] = useState({
		status: user?.status ?? "",
		role: user?.role ?? "",
	});
	const handleInputChange = (e: ChangeEvent<HTMLSelectElement>) => {
		setInput((p) => ({ ...p, [e.target.name]: e.target.value }));
	};
	return (
		<>
			<Form.Group className="mb-3" controlId="formBasicRole">
				<Form.Label>{type}</Form.Label>
				<Form.Select
					id="formBasicRole"
					name={type.toLowerCase()}
					onChange={handleInputChange}
					value={type === "Status" ? input.status : input.role}
				>
					{type === "Status" ? (
						<>
							<option>active</option>
							<option>blocked</option>
							<option>delete</option>
						</>
					) : (
						<>
							<option>student</option>
							<option>instructor</option>
							<option>admin</option>
						</>
					)}
				</Form.Select>
			</Form.Group>
			<div className="d-flex justify-content-between">
				<Button variant="secondary" type="submit" onClick={hideDialog}>
					Cancel
				</Button>
				<Button
					variant="primary"
					type="submit"
					onClick={async () => {
						type === "Status"
							? await changeUserStatus(user?._id, input.status)
							: await changeUserRole(user?._id, input.role);
						hideDialog();
						mutate("users");
					}}
				>
					Update {type}
				</Button>
			</div>
		</>
	);
};

const Users: NextPage = () => {
	const router = useRouter();
	const { showDialog, hideDialog } = useContext(DialogContext);

	const [headers] = useState([
		"#",
		"Name",
		"Email",
		"Role",
		"Status",
		"Change Status",
		"Change Role",
	]);
	const users = useUsers();

	return (
		<div className="d-flex flex-column min-vh-100">
			<Header />
			<Container className="mb-3 mt-3">
				<Row className="mt-5 justify-content-md-center">
					<Col lg={8}>
						<h1 className="h1">Users</h1>
						<CustomTable
							headers={headers}
							body={users?.map((u: any, i: number) => [
								i + 1,
								u?.name,
								u?.email,
								u?.role,
								u?.status,
								<PencilSquare
									key={i}
									color="royalblue"
									onClick={() => {
										showDialog({
											title: `Change ${u?.name} Status`,
											content: (
												<Popup
													user={u}
													hideDialog={() => {
														hideDialog(1);
													}}
												/>
											),
										});
									}}
								/>,
								<PencilSquare
									key={i}
									color="royalblue"
									onClick={() => {
										showDialog({
											title: `Change ${u?.name} Role`,
											content: (
												<Popup
													user={u}
													type="Role"
													hideDialog={() => {
														hideDialog(1);
													}}
												/>
											),
										});
									}}
								/>,
							])}
						/>
					</Col>
				</Row>
			</Container>
			<Footer />
		</div>
	);
};

export default Users;
