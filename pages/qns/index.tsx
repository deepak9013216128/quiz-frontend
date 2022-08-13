import { NextPage } from "next";
import { useRouter } from "next/router";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Container, Row, Col, Form, Button, Badge } from "react-bootstrap";
import Footer from "../../components/footer";
import Header from "../../components/header";
import { createTopic, getSubTopic, getTopic } from "../../services/topic";
import Link from "next/link";
import CustomTable from "../../components/custom-table";
import TopicDrodown from "../../components/topic-dropdown";
import QnsForm from "../../components/qns-form";
import { Plus } from "react-bootstrap-icons";
import QnsList from "../../components/qns-list";
import { useQns } from "../../hooks/useQns";

const Qns: NextPage = () => {
	const router = useRouter();
	const [topics, setTopics] = useState<any>([]);
	const [subTopics, setSubTopics] = useState<any>([]);
	const [topic, setTopic] = useState("");
	const [subTopic, setSubTopic] = useState("");
	const [createQns, setCreateQns] = useState(false);

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

	return (
		<div className="d-flex flex-column min-vh-100">
			<Header />
			<Container className="mb-3 mt-3">
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
					<Col xs={12} md={2}>
						{topic && subTopic && (
							<Button onClick={() => setCreateQns(true)}>
								{" "}
								<Plus size={20} /> Create Qns
							</Button>
						)}
					</Col>
				</Row>
				<Row className="justify-content-md-center">
					<Col md={8}>
						{createQns ? (
							<QnsForm topic={topic} subTopic={subTopic} />
						) : (
							<QnsList topic={topic} subTopic={subTopic} />
						)}
					</Col>
				</Row>
			</Container>
			<Footer />
		</div>
	);
};

export default Qns;
