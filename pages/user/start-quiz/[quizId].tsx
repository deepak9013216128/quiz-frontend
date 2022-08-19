import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Badge, Button, Col, Container, Row, Stack } from "react-bootstrap";
import { ArrowRightShort } from "react-bootstrap-icons";
import Countdown from "../../../components/countdown";
import Footer from "../../../components/footer";
import Header from "../../../components/header";
import { useQnsFromQuiz, useQuiz } from "../../../hooks/useQuiz";
import { updateQnsResponse } from "../../../services/quiz";

const QuizTest: NextPage = () => {
	const router = useRouter();
	const [qnsNo, setQnsNo] = useState(1);
	const quizQns = useQnsFromQuiz(router.query.quizId as string);
	const [ans, setAns] = useState<any>([]);

	const updateAns = (ans: number) => {
		setAns((p: any) => [
			...p.map((_: any, i: number) => (qnsNo - 1 === i ? ans : _)),
		]);
		updateQnsResponse({
			quizId: quizQns[qnsNo - 1]?.quiz,
			qnsId: quizQns[qnsNo - 1]?.qns?._id,
			ans: ans + 1,
			timeTaken: 0,
		});
	};

	const nextQns = () => {
		setQnsNo((p) => p + 1);
	};

	useEffect(() => {
		setAns(new Array(quizQns?.length).fill(-1));
	}, [quizQns]);

	if (!quizQns) return <div></div>;
	return (
		<div className="d-flex bg-gradient-primary flex-column min-vh-100">
			<Container className="mb-3 mt-3">
				<div className="d-flex justify-content-between align-items-center">
					<h3 className="h3">
						Question {qnsNo}/{quizQns?.length}
					</h3>

					<Countdown
						key={qnsNo}
						time={quizQns[qnsNo - 1]?.qns?.durationOfQns ?? 0}
						onComplete={() => {
							if (ans[qnsNo - 1] === -1) updateAns(-1);
							nextQns();
						}}
					/>
				</div>
				<Row className="justify-content-center">
					<Col lg={7}>
						<h1 className="h2 mt-3">
							<ArrowRightShort /> {quizQns[qnsNo - 1]?.qns?.title}
						</h1>
						<h6 className="h6 mt-2">{quizQns[qnsNo - 1]?.qns?.description}</h6>
					</Col>
					{quizQns[qnsNo - 1]?.qns?.options?.map((o: any, i: number) => (
						<Col key={o} lg={7} className="m-2">
							<Stack>
								<button
									className={`btn ${
										ans[qnsNo - 1] === i ? "btn-primary" : "btn-outline-primary"
									} py-3`}
									onClick={() => updateAns(i)}
								>
									{o}
								</button>
							</Stack>
						</Col>
					))}
				</Row>
				<Row>
					<Col xs={12} className="d-flex justify-content-center">
						<Button className="bg-success" onClick={nextQns}>
							Next
						</Button>
					</Col>
				</Row>
			</Container>
		</div>
	);
};

export default QuizTest;
