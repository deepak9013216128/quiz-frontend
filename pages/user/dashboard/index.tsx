import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Badge, Button, Col, Container, Row, Stack } from "react-bootstrap";
import Footer from "../../../components/footer";
import Header from "../../../components/header";
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
					<Stack
						key={q?._id}
						className={`justify-content-md-center shadow p-3 mb-5 rounded ${
							q?.isAttempted ? "bg-secondary" : "white"
						}`}
					>
						<Row>
							<Col lg={8}>
								<h3 className="h3">{q?.quiz?.title}</h3>
								<h4 className="h4">{q?.quiz?.description}</h4>
								<p className="p">Invited by: {q?.invitedBy?.name}</p>
							</Col>
							<Col lg={2}>
								<h6 className="h6 text-md-center">No of Qns</h6>

								<h4 className="h4 text-md-center">
									<Badge bg="dark" pill>
										{q?.noOfQns}
									</Badge>
								</h4>
							</Col>
							<Col
								lg={2}
								className="d-flex justify-content-md-end align-items-center"
							>
								<Button
									onClick={() =>
										router.push("/user/start-quiz/" + q?.quiz?._id)
									}
								>
									{q?.isAttempted ? "See Score" : "Start Quiz"}
								</Button>
							</Col>
						</Row>
					</Stack>
				))}
			</Container>
			<Footer />
		</div>
	);
};

export default Dashboard;
