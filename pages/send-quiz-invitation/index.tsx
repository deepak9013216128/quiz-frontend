import { NextPage } from "next";
import { useRouter } from "next/router";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import Footer from "../../components/footer";
import Header from "../../components/header";
import { sendInvitation } from "../../services/user";

const SendQuizInvitation: NextPage = () => {
	const router = useRouter();
	const [input, setInput] = useState({
		email: "",
		name: "",
		role: "",
	});
	const [url, setUrl] = useState("");

	const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
		setInput((p) => ({ ...p, [e.target.name]: e.target.value }));
	};

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const invitationToken = await sendInvitation({
			email: input.email,
			role: input.role,
			name: input.name,
		});
		setUrl(window.location.origin + "/invitation?token=" + invitationToken);
	};
	return (
		<div className="d-flex flex-column min-vh-100">
			<Header />
			<Container className="mb-3 mt-3">
				<Row className="justify-content-md-center">
					<Col xs md={6} lg={6}>
						<h1 className="h1 text-center">Send Quiz Invitation</h1>
						{url && (
							<Form.Group className="mb-3" controlId="formBasicurl">
								<Form.Label>Url</Form.Label>
								<Form.Control type="text" value={url} />
							</Form.Group>
						)}
						<Form className="d-grid" onSubmit={handleSubmit}>
							<Form.Group className="mb-3" controlId="formBasicName">
								<Form.Label>Name</Form.Label>
								<Form.Control
									type="text"
									name="name"
									onChange={handleInputChange}
									placeholder="Enter name"
								/>
							</Form.Group>

							<Form.Group className="mb-3" controlId="formBasicEmail">
								<Form.Label>Email address</Form.Label>
								<Form.Control
									type="email"
									name="email"
									onChange={handleInputChange}
									placeholder="Enter email"
								/>
							</Form.Group>

							<Form.Group className="mb-3" controlId="formBasicRole">
								<Form.Label>Role</Form.Label>
								<Form.Select
									id="formBasicRole"
									name="role"
									onChange={(e: ChangeEvent<HTMLSelectElement>) =>
										setInput((p) => ({ ...p, [e.target.name]: e.target.value }))
									}
								>
									<option>student</option>
									<option>instructor</option>
									<option>admin</option>
								</Form.Select>
							</Form.Group>

							<Button variant="primary" type="submit">
								Send Invite
							</Button>
						</Form>
					</Col>
				</Row>
			</Container>
			<Footer />
		</div>
	);
};

export default SendQuizInvitation;
