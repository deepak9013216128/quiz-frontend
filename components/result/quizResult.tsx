import { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import { BoxArrowUpRight } from "react-bootstrap-icons";
import { useSWRConfig } from "swr";
import CustomTable from "../custom-table";
import { useQuizResults } from "../../hooks/useResult";

const QuizsResult: NextPage = () => {
	const router = useRouter();
	const headers = ["S. No.", "Quiz", "Name", "Email", "isAttempted"];
	const { mutate } = useSWRConfig();
	const results = useQuizResults(router.query.quizId as string);
	if (!results) return null;

	return (
		<Row className="mt-3 justify-content-md-center">
			<CustomTable
				headers={headers}
				body={results?.map((r: any, i: number) => [
					i + 1,
					r?.quiz?.title,

					r?.invitedTo?.name,
					r?.invitedTo?.email,
					r?.isAttempted ? (
						<Link
							href={`/result?quizId=${r?.quiz?._id}&userId=${r?.invitedTo?._id}`}
						>
							<a target="_blank">
								<BoxArrowUpRight color="royalblue" />
							</a>
						</Link>
					) : (
						<BoxArrowUpRight color="gray" />
					),
				])}
			/>
		</Row>
	);
};

export default QuizsResult;
