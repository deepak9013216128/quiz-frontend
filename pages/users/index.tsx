import { NextPage } from "next";
import { useRouter } from "next/router";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import Footer from "../../components/footer";
import Header from "../../components/header";
import { createTopic, getTopic } from "../../services/topic";
import Table from "react-bootstrap/Table";
import { PencilSquare } from "react-bootstrap-icons";
import Link from "next/link";
import CustomTable from "../../components/custom-table";
import { useUsers } from "../../hooks/useUser";

const Topic: NextPage = () => {
	const router = useRouter();
	const [headers] = useState([
		"#",
		"Name",
		"Email",
		"Role",
		"Status",
		"Change Status",
		"Change Role",
	]);
	const users = useUsers();

	return (
		<div className="d-flex flex-column min-vh-100">
			<Header />
			<Container className="mb-3 mt-3">
				<Row className="mt-5 justify-content-md-center">
					<Col lg={8}>
						<h1 className="h1">Users</h1>
						<CustomTable
							headers={headers}
							body={users?.map((u: any, i: number) => [
								i + 1,
								u.name,
								u.email,
								u.role,
								u.status,
								<PencilSquare key={i} color="royalblue" />,
								<PencilSquare key={i} color="royalblue" />,
							])}
						/>
					</Col>
				</Row>
			</Container>
			<Footer />
		</div>
	);
};

export default Topic;
