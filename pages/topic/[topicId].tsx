import { NextPage } from "next";
import { useRouter } from "next/router";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import Footer from "../../components/footer";
import Header from "../../components/header";
import {
	createSubTopic,
	createTopic,
	getSubTopic,
	getTopic,
} from "../../services/topic";
import Table from "react-bootstrap/Table";
import { PencilSquare, Plus } from "react-bootstrap-icons";
import Link from "next/link";
import CustomTable from "../../components/custom-table";

const SubTopic: NextPage = () => {
	const router = useRouter();
	const [headers] = useState(["#", "Title", "Description", "Topic"]);
	const [topicId, setTopicId] = useState("");
	const [subTopics, setSubTopics] = useState([]);
	const [input, setInput] = useState({
		title: "",
		description: "",
	});
	const [showSubTopicFrom, setShowSubTopicForm] = useState(false);
	const [validated, setValidated] = useState(false);

	const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
		setInput((p) => ({ ...p, [e.target.name]: e.target.value }));
	};

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setValidated(true);
		if (input.title) {
			await createSubTopic({ ...input, topicId });
			fetchSubTopics();
			setShowSubTopicForm(false);
		}
	};

	const fetchSubTopics = async () => {
		const subTopics = await getSubTopic(topicId);
		setSubTopics(subTopics ?? []);
	};
	useEffect(() => {
		if (topicId) {
			fetchSubTopics();
		}
	}, [topicId]);

	useEffect(() => {
		if (router.query.topicId) {
			setTopicId(router.query.topicId as string);
		}
	}, [router.query.topicId]);

	return (
		<div className="d-flex flex-column min-vh-100">
			<Header />
			<Container className="mb-3 mt-3">
				<Row>
					{!showSubTopicFrom && (
						<>
							<Col xs={12}>
								<Button variant="dark" onClick={() => router.push("/topic")}>
									Go Back
								</Button>
							</Col>
							<Col xs={6} sm={7} md={8} lg={8}>
								<h1 className="h1">Subtopic</h1>
							</Col>
						</>
					)}
					<Col xs={6} sm={5} md={4} lg={2}>
						{showSubTopicFrom ? (
							<Button variant="dark" onClick={() => setShowSubTopicForm(false)}>
								Go Back
							</Button>
						) : (
							<Button onClick={() => setShowSubTopicForm(true)}>
								<Plus size={20} /> Create Subtopic
							</Button>
						)}
					</Col>
				</Row>
				<Row className="justify-content-md-center">
					{showSubTopicFrom && (
						<Col xs md={6} lg={6}>
							<h1 className="h1 text-center">Create Subtopic</h1>
						</Col>
					)}
				</Row>
				<Row className="justify-content-md-center">
					{showSubTopicFrom ? (
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
										Please enter subtopic title.
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
								body={subTopics.map((subTopic: any, i) => [
									i + 1,
									subTopic?.title,
									subTopic?.description,
									subTopic?.topic.title,
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

export default SubTopic;
