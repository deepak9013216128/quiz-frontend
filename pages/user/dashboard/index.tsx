import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import Footer from "../../../components/footer";
import Header from "../../../components/header";
import QuizCard from "../../../components/quiz-card";
import { useQuiz } from "../../../hooks/useQuiz";

const Dashboard: NextPage = () => {
	const router = useRouter();
	const quiz = useQuiz();
	const [username, setUserName] = useState("");
	useEffect(() => {
		setUserName(localStorage.getItem("name") as string);
	}, []);
	return (
		<div className="d-flex flex-column min-vh-100">
			<Header />
			<Container className="mb-3 mt-3">
				<Row className="justify-content-md-center">
					<Col>
						<h1 className="h1">Welcome {username}</h1>
					</Col>
				</Row>
				{quiz?.map((q: any) => (
					<QuizCard key={q._id} q={q} />
				))}
			</Container>
			<Footer />
		</div>
	);
};

export default Dashboard;
