import { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import { BoxArrowUpRight } from "react-bootstrap-icons";
import { useSWRConfig } from "swr";
import CustomTable from "../custom-table";
import { useUserQuizResult, useUsersResults } from "../../hooks/useResult";

const UsersList: NextPage = () => {
	const router = useRouter();
	const headers = ["S. No.", "name", "Email", "Quiz Attempted", "Quiz Invited"];
	const users = useUsersResults();
	if (!users) return null;

	return (
		<Row className="mt-3 justify-content-md-center">
			<CustomTable
				headers={headers}
				body={users?.map((r: any, i: number) => [
					i + 1,
					r?.user?.name,
					r?.user?.email,
					r?.quizAttempted,
					r?.quizInvited,
				])}
			/>
		</Row>
	);
};

export default UsersList;
