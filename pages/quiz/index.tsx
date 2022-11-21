import { NextPage } from "next";
import { useRouter } from "next/router";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Container, Row, Col, Form, Button, Badge } from "react-bootstrap";
import Footer from "../../components/footer";
import Header from "../../components/header";
import CustomTable from "../../components/custom-table";
import { PencilSquare, Plus } from "react-bootstrap-icons";
import { useQuiz } from "../../hooks/useQuiz";
import Link from "next/link";

const Quiz: NextPage = () => {
	const router = useRouter();
	const [headers] = useState([
		"#",
		"Title",
		"Description",
		"No of qns",
		"Quiz attempted",
		"User invited",
		"Add Qns",
	]);
	const quiz = useQuiz();

	return (
		<div className="d-flex flex-column min-vh-100">
			<Header />
			<Container className="mb-3 mt-3">
				<Row className="justify-content-md-center">
					<Col xs={8} md={6} lg={6}>
						<h1 className="h1 ">Quiz</h1>
					</Col>

					<Col xs={4} md={3} lg={2}>
						<Button onClick={() => router.push("/quiz/create")}>
							<Plus size={20} /> Create Quiz
						</Button>
					</Col>
				</Row>
				<Row className="justify-content-md-center">
					<Col md={8}>
						<CustomTable
							headers={headers}
							body={quiz?.map((q: any, i: number) => [
								i + 1,
								<Link key={i} href={"/result?quizId=" + q?._id}>
									<a>{q?.title}</a>
								</Link>,
								q?.description,
								q?.noOfQns,
								q?.quizAttempted,
								q?.noOfInvitation,
								<Link key={q._id} href={`/quiz/${q._id}`}>
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

export default Quiz;
