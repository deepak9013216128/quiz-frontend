import { NextPage } from "next";
import { useRouter } from "next/router";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Footer from "../../../components/footer";
import Header from "../../../components/header";
import Link from "next/link";
import { useStudentResults } from "../../../hooks/useResult";
import QuizCard from "../../../components/quiz-card";

const Result: NextPage = () => {
	const router = useRouter();
	const results = useStudentResults();

	return (
		<div className="d-flex flex-column min-vh-100">
			<Header />
			<Container className="mb-3 mt-3">
				<Row className="mt-1 justify-content-md-center">
					<Col lg={12}>
						<h1 className="h1">Results</h1>
					</Col>
				</Row>{" "}
				{results?.map((q: any) => (
					<QuizCard key={q._id} q={q} />
				))}
			</Container>
			<Footer />
		</div>
	);
};

export default Result;
