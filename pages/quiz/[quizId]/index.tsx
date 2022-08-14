import { NextPage } from "next";
import { useRouter } from "next/router";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Container, Row, Col, Form, Button, Badge } from "react-bootstrap";
import Footer from "../../../components/footer";
import Header from "../../../components/header";
import CustomTable from "../../../components/custom-table";
import { PencilSquare, Plus } from "react-bootstrap-icons";
import { useQuiz } from "../../../hooks/useQuiz";
import Link from "next/link";
import { useQnsFromQuiz } from "../../../hooks/useQuiz";

const Quiz: NextPage = () => {
	const router = useRouter();
	const [headers] = useState(["#", "Title", "Description", "Points", "Time"]);
	const quizQns = useQnsFromQuiz(router.query.quizId as string);

	return (
		<div className="d-flex flex-column min-vh-100">
			<Header />
			<Container className="mb-3 mt-3">
				<Row className="justify-content-md-center">
					<Col xs={8} md={6} lg={8}>
						<h1 className="h1 ">Quiz</h1>
					</Col>

					<Col xs={4} md={3} lg={2}>
						<Button
							onClick={() => router.push(`/quiz/${router.query.quizId}/qns`)}
						>
							<Plus size={20} /> Add Qns
						</Button>
					</Col>
				</Row>
				<Row className="justify-content-md-center">
					<Col md={12} lg={10}>
						<CustomTable
							headers={headers}
							body={quizQns?.map((q: any, i: number) => [
								i + 1,
								q?.qns?.title,
								q?.qns?.description,
								q?.qns?.points,
								q?.qns?.durationOfQns + "Sec",
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
