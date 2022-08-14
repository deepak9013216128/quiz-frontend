import { NextPage } from "next";
import { useRouter } from "next/router";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import CustomTable from "../../components/custom-table";
import Footer from "../../components/footer";
import Header from "../../components/header";
import { useQuiz, useQuizInvitation } from "../../hooks/useQuiz";
import { sendQuizInvitations } from "../../services/quiz";
import { sendInvitation } from "../../services/user";

const SendQuizInvitation: NextPage = () => {
	const router = useRouter();
	const [headers] = useState(["#", "Name", "Email", "Is attemped"]);
	const quizInvitation = useQuizInvitation();
	const quiz = useQuiz();
	const [validated, setValidated] = useState(false);
	const [input, setInput] = useState({
		email: "",
		quizId: "",
	});

	const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
		setInput((p) => ({ ...p, [e.target.name]: e.target.value }));
	};

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setValidated(true);
		if (Object.values(input).every((v) => !!v)) {
			const invitationToken = await sendQuizInvitations({
				...input,
			});
		}
	};
	return (
		<div className="d-flex flex-column min-vh-100">
			<Header />
			<Container className="mb-3 mt-3">
				<Row className="justify-content-md-center">
					<Col xs md={6} lg={6}>
						<h1 className="h1 text-center">Send Quiz Invitation</h1>

						<Form
							noValidate
							validated={validated}
							className="d-grid"
							onSubmit={handleSubmit}
						>
							<Form.Group className="mb-3" controlId="formBasicName">
								<Form.Label>Quiz</Form.Label>
								<Form.Select
									name="quizId"
									required
									onChange={(e: ChangeEvent<HTMLSelectElement>) =>
										setInput((p) => ({ ...p, [e.target.name]: e.target.value }))
									}
									aria-label="Default select example"
								>
									<option value="" selected disabled>
										Open this select menu
									</option>
									{quiz?.map((q: any) => (
										<option key={q?._id} value={q?._id}>
											{q?.title}
										</option>
									))}
								</Form.Select>
								<Form.Control.Feedback type="invalid">
									Please select quiz.
								</Form.Control.Feedback>
							</Form.Group>

							<Form.Group className="mb-3" controlId="formBasicEmail">
								<Form.Label>Email address</Form.Label>
								<Form.Control
									type="email"
									name="email"
									onChange={handleInputChange}
									placeholder="Enter email"
									value={input.email}
									required
								/>
								<Form.Control.Feedback type="invalid">
									Please enter email.
								</Form.Control.Feedback>
							</Form.Group>

							<Button variant="primary" type="submit">
								Send Invite
							</Button>
						</Form>
					</Col>
				</Row>
				<Row className="mt-3 justify-content-md-center">
					<Col xs md={6} lg={6}>
						<CustomTable
							headers={headers}
							body={quizInvitation?.map((q: any, i: number) => [
								i + 1,
								q?.invitedTo?.name,
								q?.invitedTo?.email,
								q?.isAttempted ? "Yes" : "No",
							])}
						/>
					</Col>
				</Row>
			</Container>
			<Footer />
		</div>
	);
};

export default SendQuizInvitation;
