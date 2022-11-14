import { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import { BoxArrowUpRight } from "react-bootstrap-icons";
import { useSWRConfig } from "swr";
import CustomTable from "../custom-table";
import { useUserQuizResult } from "../../hooks/useResult";

const UserResult: NextPage = () => {
	const router = useRouter();
	const headers = ["S. No.", "Qns", "Options", "Your Ans", "Points"];
	const { mutate } = useSWRConfig();
	const result = useUserQuizResult(
		router.query.quizId as string,
		router.query.userId as string
	);

	return (
		<Row className="mt-3 justify-content-md-center">
			<Col lg={12}>
				<h3 className="h3">
					{result[0]?.user?.name} has Score{" "}
					<span className="text-primary">
						{result?.filter((r: any) => r.points > 0).length}
					</span>
				</h3>
			</Col>
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
		</Row>
	);
};

export default UserResult;
