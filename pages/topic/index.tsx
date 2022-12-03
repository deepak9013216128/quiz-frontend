import { NextPage } from "next";
import { useRouter } from "next/router";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import Footer from "../../components/footer";
import Header from "../../components/header";
import { createTopic, getTopic } from "../../services/topic";
import Table from "react-bootstrap/Table";
import { PencilSquare, Plus, PlusSquare } from "react-bootstrap-icons";
import Link from "next/link";
import CustomTable from "../../components/custom-table";
import { useLoader } from "../../components/loader";

const Topic: NextPage = () => {
	const router = useRouter();
	const { showLoader, hideLoader } = useLoader();
	const [headers] = useState([
		"#",
		"Title",
		"Description",
		"No of SubTopic",
		"Add SubTopic",
	]);
	const [showTopicFrom, setShowTopicForm] = useState(false);
	const [topics, setTopics] = useState([]);
	const [input, setInput] = useState({
		title: "",
		description: "",
	});
	const [validated, setValidated] = useState(false);

	const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
		setInput((p) => ({ ...p, [e.target.name]: e.target.value }));
	};

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setValidated(true);
		if (input.title) {
			showLoader();
			await createTopic({ ...input });
			const topics = await getTopic();
			hideLoader();
			setTopics(topics ?? []);
			setShowTopicForm(false);
		}
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
				<Row>
					{!showTopicFrom && (
						<Col xs={6} sm={8} md={9} lg={8}>
							<h1 className="h1">Topic</h1>
						</Col>
					)}
					<Col xs={6} sm={4} md={3} lg={2}>
						{showTopicFrom ? (
							<Button variant="dark" onClick={() => setShowTopicForm(false)}>
								Go Back
							</Button>
						) : (
							<Button onClick={() => setShowTopicForm(true)}>
								<Plus size={20} /> Create Topic
							</Button>
						)}
					</Col>
				</Row>
				<Row className="justify-content-md-center">
					{showTopicFrom && (
						<Col xs md={6} lg={6}>
							<h1 className="h1 text-center">Create Topic</h1>
						</Col>
					)}
				</Row>
				<Row className="justify-content-md-center">
					{showTopicFrom ? (
						<Col xs md={6} lg={4}>
							<Form
								noValidate
								validated={validated}
								className="d-grid"
								onSubmit={handleSubmit}
							>
								<Form.Group className="mb-3" controlId="formBasicTitle">
									<Form.Label>Title</Form.Label>
									<Form.Control
										name="title"
										type="text"
										placeholder="Enter title"
										onChange={handleInputChange}
										required
									/>
									<Form.Control.Feedback type="invalid">
										Please enter topic title.
									</Form.Control.Feedback>
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
					) : (
						<Col lg={8}>
							<CustomTable
								headers={headers}
								body={topics.map((topic: any, i) => [
									i + 1,
									topic?.title,
									topic?.description,
									topic?.subTopicCount,
									<Link key={topic?._id} href={`/topic/${topic?._id}`}>
										<a>
											<PencilSquare color="royalblue" />
										</a>
									</Link>,
								])}
							/>
						</Col>
					)}
				</Row>
			</Container>
			<Footer />
		</div>
	);
};

export default Topic;
