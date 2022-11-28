import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Badge, Button, Col, Container, Row, Stack } from "react-bootstrap";
import { ArrowRightShort } from "react-bootstrap-icons";
import Countdown from "../../../components/countdown";
import Footer from "../../../components/footer";
import Header from "../../../components/header";
import { useLoader } from "../../../components/loader";
import { useToasts } from "../../../components/toast";
import { useQnsFromQuiz, useQuiz } from "../../../hooks/useQuiz";
import { updateQnsResponse, submitQuiz } from "../../../services/quiz";

const QuizTest: NextPage = () => {
	const router = useRouter();
	const { showLoader, hideLoader } = useLoader();
	const { showToast } = useToasts();
	const [qnsNo, setQnsNo] = useState(1);
	const quizQns = useQnsFromQuiz(router.query.quizId as string);
	const [ans, setAns] = useState<any>([]);
	const [shouldDisplayNextBtn, setShouldDisplayNextBtn] = useState(false);

	const updateAns = async (ans: number) => {
		setAns((p: any) => [
			...p.map((_: any, i: number) => (qnsNo - 1 === i ? ans : _)),
		]);
		// showLoader();
		const res = await updateQnsResponse({
			quizId: quizQns[qnsNo - 1]?.quiz,
			qnsId: quizQns[qnsNo - 1]?.qns?._id,
			ans: ans + 1,
			timeTaken: 0,
		});
		// hideLoader();
		if (res?.status) {
			setShouldDisplayNextBtn(true);
			localStorage.setItem("quizId", router.query.quizId as any);
			localStorage.setItem("qnsNo", (qnsNo + 1) as any);
		} else {
			showToast("danger", res?.message);
		}
	};

	const nextQns = () => {
		setQnsNo((p) => p + 1);
		setShouldDisplayNextBtn(false);
	};

	useEffect(() => {
		const qnsNo: number = localStorage.getItem("qnsNo") as any;
		if (+qnsNo > 0 && router.query.quizId === localStorage.getItem("quizId")) {
			setQnsNo(+qnsNo);
		}
	}, [router.query.quizId]);

	useEffect(() => {
		setAns(new Array(quizQns?.length).fill(-1));
	}, [quizQns]);

	useEffect(() => {
		if (qnsNo && quizQns && qnsNo >= quizQns.length) {
			//=============================== SUBMIT QUIZ ======================================
			showLoader();
			submitQuiz(router.query.quizId as string);
			hideLoader();
		}
	}, [qnsNo]);

	if (!quizQns) return <div></div>;
	if (quizQns.length === 0) {
		return (
			<div className="d-flex  flex-column min-vh-100">
				<Container className="mb-3 mt-3 text-center">
					<h2 className="h3 m-3">Quiz link is expired!</h2>
					<button
						className="btn btn-success px-5"
						onClick={() => router.push("/user/dashboard")}
					>
						Go to Home
					</button>
				</Container>
			</div>
		);
	}
	if (qnsNo && qnsNo > quizQns.length) {
		return (
			<div className="d-flex  flex-column min-vh-100">
				<Container className="mb-3 mt-3 text-center">
					<h1 className="display-2 m-5">Thank You for participation!</h1>
					<h2 className="h3 m-3">Click below buttion to see your score here</h2>
					<button
						className="btn btn-success px-5"
						onClick={() => router.push("/user/result")}
					>
						See Score
					</button>
				</Container>
			</div>
		);
	}
	return (
		<div className="d-flex  flex-column min-vh-100">
			<Container className="mb-3 mt-3">
				<div className="mb-2 d-flex justify-content-between align-items-center ">
					<h3 className="h3 border shadow bg-light p-3">
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
				<Row className="justify-content-center  rounded border bg-light">
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

					<Col xs={12} className="d-flex justify-content-center">
						<Button
							className="bg-success px-5 mb-5"
							onClick={nextQns}
							disabled={!shouldDisplayNextBtn}
						>
							Next
						</Button>
					</Col>
				</Row>
			</Container>
		</div>
	);
};

export default QuizTest;
