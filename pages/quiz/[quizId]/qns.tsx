import { NextPage } from "next";
import { useRouter } from "next/router";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Container, Row, Col, Form, Button, Badge } from "react-bootstrap";
import Footer from "../../../components/footer";
import Header from "../../../components/header";
import { createTopic, getSubTopic, getTopic } from "../../../services/topic";
import Link from "next/link";
import TopicDrodown from "../../../components/topic-dropdown";
import QnsList from "../../../components/qns-list";
import { useQns } from "../../../hooks/useQns";
import { addQnsInQuiz } from "../../../services/quiz";

const Qns: NextPage = () => {
	const router = useRouter();
	const [topics, setTopics] = useState<any>([]);
	const [subTopics, setSubTopics] = useState<any>([]);
	const [topic, setTopic] = useState("");
	const [subTopic, setSubTopic] = useState("");

	useEffect(() => {
		const fetchTopics = async () => {
			const topics = await getTopic();
			setSubTopic("");
			setSubTopics([]);
			setTopics(topics ?? []);
		};
		fetchTopics();
	}, []);

	useEffect(() => {
		const fetchSubTopics = async () => {
			const subTopics = await getSubTopic(topic);
			setSubTopics(subTopics ?? []);
		};
		if (topic) {
			fetchSubTopics();
		}
	}, [topic]);

	const addQns = async (qnsId: string) => {
		await addQnsInQuiz(router.query.quizId as string, qnsId);
	};

	return (
		<div className="d-flex flex-column min-vh-100">
			<Header />
			<Container className="mb-3 mt-3">
				<Row>
					<Col>
						<Button variant="dark" onClick={() => router.back()}>
							Go Back
						</Button>
					</Col>
				</Row>
				<Row className="justify-content-md-center">
					<Col xs md={4} lg={6}>
						<h1 className="h1 ">Qns</h1>
						<Badge bg="dark" className="m-1">
							{topics.find((t: any) => t._id === topic)?.title}
						</Badge>
						<Badge bg="dark" className="m-1">
							{subTopics.find((st: any) => st._id === subTopic)?.title}
						</Badge>
					</Col>
					<Col xs md={6} lg={4}>
						<TopicDrodown
							topic={topic}
							subTopic={subTopic}
							topics={topics}
							subTopics={subTopics}
							changeTopic={(topic: any) => {
								setTopic(topic);
							}}
							changeSubTopic={(subTopic: any) => {
								setSubTopic(subTopic);
							}}
						/>
					</Col>
				</Row>
				<Row className="justify-content-md-center">
					<Col md={8}>
						<QnsList topic={topic} subTopic={subTopic} addQnsInQuiz={addQns} />
					</Col>
				</Row>
			</Container>
			<Footer />
		</div>
	);
};

export default Qns;
