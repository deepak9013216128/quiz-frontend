import { NextPage } from "next";
import { useRouter } from "next/router";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Container, Row, Col, Form, Button, Badge } from "react-bootstrap";
import Footer from "../../../components/footer";
import Header from "../../../components/header";
import CustomTable from "../../../components/custom-table";
import { PencilSquare, Plus, Trash } from "react-bootstrap-icons";
import { useQuiz } from "../../../hooks/useQuiz";
import Link from "next/link";
import { useQnsFromQuiz } from "../../../hooks/useQuiz";
import { removeQnsInQuiz } from "../../../services/quiz";
import { useSWRConfig } from "swr";
import { useLoader } from "../../../components/loader";
import { useToasts } from "../../../components/toast";

const Quiz: NextPage = () => {
	const router = useRouter();
	const { showLoader, hideLoader } = useLoader();
	const { showToast } = useToasts();
	const { mutate } = useSWRConfig();
	const [headers] = useState(["#", "Title", "Description", "Points", "Time"]);
	const quizQns = useQnsFromQuiz(router.query.quizId as string);

	const removeQns = async (id: string) => {
		showLoader();
		const res = await removeQnsInQuiz(router.query.quizId as string, id);
		await mutate(router.query.quizId as string);
		hideLoader();
		if (res?.status) showToast("success", res?.message);
		else showToast("danger", res?.message);
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
								<Trash
									className="text-danger"
									key={i}
									style={{ cursor: "pointer" }}
									onClick={() => removeQns(q?.qns?._id)}
								/>,
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
