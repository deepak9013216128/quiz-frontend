import { NextPage } from "next";
import { useRouter } from "next/router";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useSWRConfig } from "swr";
import CustomTable from "../../components/custom-table";
import Footer from "../../components/footer";
import Header from "../../components/header";
import UserResult from "../../components/result/user";
import { useQuiz, useQuizInvitation } from "../../hooks/useQuiz";
import { API } from "../../services/api";
import { sendQuizInvitations } from "../../services/quiz";
import { sendInvitation } from "../../services/user";

const Results: NextPage = () => {
	const router = useRouter();
	let children = null;
	if (router.query.userId && router.query.quizId) {
		children = <UserResult />;
	}

	return (
		<div className="d-flex flex-column min-vh-100">
			<Header />
			<Container className="mb-3 mt-3">
				<Row className="justify-content-md-center">
					<Col xs md={6} lg={6}>
						<h1 className="h1 text-center">Results</h1>
					</Col>
				</Row>
				{children}
			</Container>
			<Footer />
		</div>
	);
};

export default Results;
