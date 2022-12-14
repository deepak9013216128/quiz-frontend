import { NextPage } from "next";
import { useRouter } from "next/router";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useSWRConfig } from "swr";
import CustomTable from "../../components/custom-table";
import Footer from "../../components/footer";
import Header from "../../components/header";
import QuizsResult from "../../components/result/quizResult";
import UserResult from "../../components/result/userResult";
import UserResults from "../../components/result/userResults";
import UsersList from "../../components/result/usersList";
import { useQuiz, useQuizInvitation } from "../../hooks/useQuiz";
import { API } from "../../services/api";
import { sendQuizInvitations } from "../../services/quiz";
import { sendInvitation } from "../../services/user";

const Results: NextPage = () => {
	const router = useRouter();
	let children = null;
	if (router.query.userId && router.query.quizId) {
		children = <UserResult />;
	} else if (router.query.quizId) {
		children = <QuizsResult />;
	} else if (router.query.userId) {
		children = <UserResults />;
	} else {
		children = <UsersList />;
	}

	return (
		<div className="d-flex flex-column min-vh-100">
			<Header />
			<Container className="mb-3 mt-3">{children}</Container>
			<Footer />
		</div>
	);
};

export default Results;
