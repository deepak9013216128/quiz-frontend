import { NextPage } from "next";
import { useRouter } from "next/router";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Footer from "../../../components/footer";
import Header from "../../../components/header";
import Link from "next/link";
import {
	useStudentQuizResult,
	useStudentResults,
} from "../../../hooks/useResult";
import QuizCard from "../../../components/quiz-card";
import CustomTable from "../../../components/custom-table";

const QuizResult: NextPage = () => {
	const router = useRouter();
	const result = useStudentQuizResult(router.query.quizId as string);
	const headers = ["S. No.", "Qns", "Options", "Your Ans", "Points"];

	return (
		<div className="d-flex flex-column min-vh-100">
			<Header />
			<Container className="mb-3 mt-3">
				<Row className="mt-1 justify-content-md-center">
					<Col lg={12}>
						<h1 className="h1">
							Your Score{" "}
							<span className="text-primary">
								{result?.filter((r: any) => r.points > 0).length}
							</span>
						</h1>
					</Col>
				</Row>{" "}
				<CustomTable
					headers={headers}
					body={result?.map((r: any, i: number) => [
						i + 1,
						r?.qns?.title,
						<>
							{r?.qns?.options?.map((o: any, i: number) => (
								<p
									className={
										i + 1 === r?.ans
											? r?.points > 0
												? "p-1 text-light bg-success rounded-2"
												: "p-1 text-light bg-danger rounded-2"
											: ""
									}
									key={i}
								>
									{o}
								</p>
							))}
						</>,
						r?.ans,
						r?.points,
					])}
				/>
			</Container>
			<Footer />
		</div>
	);
};

export default QuizResult;
