import { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Row, Col, Button } from "react-bootstrap";
import { BoxArrowUpRight } from "react-bootstrap-icons";
import { useSWRConfig } from "swr";
import CustomTable from "../custom-table";
import { useUserResults } from "../../hooks/useResult";

const UserResults: NextPage = () => {
	const router = useRouter();
	const headers = [
		"S. No.",
		"Quiz",
		"isAttempted",
		"No of Qns Attempted",
		"Successfull Attempted",
	];
	const results = useUserResults(router.query.userId as string);
	if (!results) return null;

	return (
		<Row className="mt-3 justify-content-md-center">
			<Col xs={12}>
				<Button variant="dark" onClick={() => router.push("/result")}>
					Go Back
				</Button>
			</Col>
			<Col xs md={6} lg={6} className="justify-content-md-center">
				<h1 className="h1 text-center">Results</h1>
			</Col>

			<CustomTable
				headers={headers}
				body={results?.map((r: any, i: number) => [
					i + 1,
					r?.isAttempted ? (
						<Link
							href={`/result?quizId=${r?.quiz?._id}&userId=${router.query.userId}`}
						>
							<a target="_blank">{r?.quiz?.title}</a>
						</Link>
					) : (
						<>{r?.quiz?.title}</>
					),
					r?.isAttempted ? "Submitted" : "Pending",
					r?.noOfQns,
					r?.successfullAttempted,
				])}
			/>
		</Row>
	);
};

export default UserResults;
