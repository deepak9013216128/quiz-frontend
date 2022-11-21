import { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import CustomTable from "../custom-table";
import { useUsersResults } from "../../hooks/useResult";

const UsersList: NextPage = () => {
	const router = useRouter();
	const headers = ["S. No.", "name", "Email", "Quiz Attempted", "Quiz Invited"];
	const users = useUsersResults();
	if (!users) return null;

	return (
		<Row className="mt-3 justify-content-md-center">
			<Col xs={12}>
				<h1 className="h1 ">Results</h1>
			</Col>
			<Col xs={12}>
				<CustomTable
					headers={headers}
					body={users?.map((r: any, i: number) => [
						i + 1,
						<Link key={i} href={`/result?userId=${r?.user?._id}`}>
							{r?.user?.name}
						</Link>,
						r?.user?.email,
						r?.quizAttempted,
						r?.quizInvited,
					])}
				/>
			</Col>
		</Row>
	);
};

export default UsersList;
