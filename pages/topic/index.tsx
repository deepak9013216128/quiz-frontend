import { NextPage } from "next";
import { useRouter } from "next/router";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import Footer from "../../components/footer";
import Header from "../../components/header";
import { createTopic, getTopic } from "../../services/topic";
import Table from "react-bootstrap/Table";
import { PencilSquare } from "react-bootstrap-icons";
import Link from "next/link";
import CustomTable from "../../components/custom-table";

const Login: NextPage = () => {
	const router = useRouter();
	const [headers] = useState(["#", "Title", "Description", "Add SubTopic"]);
	const [topics, setTopics] = useState([]);
	const [input, setInput] = useState({
		title: "",
		description: "",
	});

	const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
		setInput((p) => ({ ...p, [e.target.name]: e.target.value }));
	};

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		await createTopic({ ...input });
		const topics = await getTopic();
		setTopics(topics ?? []);
	};

	useEffect(() => {
		const fetchTopics = async () => {
			const topics = await getTopic();
			setTopics(topics ?? []);
		};
		fetchTopics();
	}, []);

	return (
		<div className="d-flex flex-column min-vh-100">
			<Header />
			<Container className="mb-3 mt-3">
				<Row className="justify-content-md-center">
					<Col xs md={6} lg={4}>
						<h1 className="h1 text-center">Create Topic</h1>
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
				<Row className="mt-5 justify-content-md-center">
					<Col lg={8}>
						<CustomTable
							headers={headers}
							body={topics.map((topic: any, i) => [
								i + 1,
								topic.title,
								topic.description,
								<Link key={topic._id} href={`/topic/${topic._id}`}>
									<a>
										<PencilSquare color="royalblue" />
									</a>
								</Link>,
							])}
						/>
					</Col>
				</Row>
			</Container>
			<Footer />
		</div>
	);
};

export default Login;
