import { NextPage } from "next";
import { useRouter } from "next/router";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Container, Row, Col, Form, Button, Badge } from "react-bootstrap";
import Footer from "../../../components/footer";
import Header from "../../../components/header";
import { createQuiz } from "../../../services/quiz";

const QuizFrom: NextPage = () => {
	const router = useRouter();
	const [input, setInput] = useState({
		title: "",
		description: "",
	});
	const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
		setInput((p) => ({ ...p, [e.target.name]: e.target.value }));
	};

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		await createQuiz({ ...input });
		router.push("/quiz");
	};
	return (
		<div className="d-flex flex-column min-vh-100">
			<Header />
			<Container className="mb-3 mt-3">
				<Row className="justify-content-md-center">
					<Col xs md={6} lg={4}>
						<h1 className="h1 text-center">Create Quiz</h1>
						<Form className="d-grid" onSubmit={handleSubmit}>
							<Form.Group className="mb-3" controlId="formBasicTitle">
								<Form.Label>Title</Form.Label>
								<Form.Control
									name="title"
									type="text"
									placeholder="Enter title"
									onChange={handleInputChange}
								/>
							</Form.Group>

							<Form.Group className="mb-3" controlId="formBasicDescription">
								<Form.Label>Description</Form.Label>
								<Form.Control
									name="description"
									type="text"
									placeholder="Enter description"
									onChange={handleInputChange}
								/>
							</Form.Group>

							<Button variant="primary" type="submit">
								Submit
							</Button>
						</Form>
					</Col>
				</Row>
			</Container>
			<Footer />
		</div>
	);
};

export default QuizFrom;
