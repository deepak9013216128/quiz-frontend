import { NextPage } from "next";
import { useRouter } from "next/router";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import CustomTable from "../../components/custom-table";
import Footer from "../../components/footer";
import Header from "../../components/header";
import UsersList from "../../components/result/usersList";
import { useQuiz, useQuizInvitation } from "../../hooks/useQuiz";
import { sendQuizInvitations } from "../../services/quiz";
import { sendInvitation } from "../../services/user";

const Dashboard: NextPage = () => {
	const router = useRouter();

	return (
		<div className="d-flex flex-column min-vh-100">
			<Header />
			<Container className="mb-3 mt-3">
				<Row className="justify-content-md-center">
					<Col xs md={6} lg={6}>
						<h1 className="h1 text-center">Dashboard</h1>
					</Col>
				</Row>
				<UsersList />
			</Container>
			<Footer />
		</div>
	);
};

export default Dashboard;
