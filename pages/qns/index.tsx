import { NextPage } from "next";
import { useRouter } from "next/router";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import Footer from "../../components/footer";
import Header from "../../components/header";
import { createTopic, getSubTopic, getTopic } from "../../services/topic";
import Table from "react-bootstrap/Table";
import { PencilSquare } from "react-bootstrap-icons";
import Link from "next/link";
import CustomTable from "../../components/custom-table";
import TopicDrodown from "../../components/topic-dropdown";

const Qns: NextPage = () => {
	const router = useRouter();
	const [topics, setTopics] = useState([]);
	const [subTopics, setSubTopics] = useState([]);
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

	return (
		<div className="d-flex flex-column min-vh-100">
			<Header />
			<Container className="mb-3 mt-3">
				<Row className="justify-content-md-center">
					<Col xs md={6} lg={6}>
						<h1 className="h1 ">Qns</h1>
					</Col>
					<Col xs md={6} lg={6}>
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
			</Container>
			<Footer />
		</div>
	);
};

export default Qns;
