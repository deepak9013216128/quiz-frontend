import { useRouter } from "next/router";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import {
	Container,
	Row,
	Col,
	Form,
	Button,
	Badge,
	Stack,
} from "react-bootstrap";
import Link from "next/link";
export default function QuizCard({ q }: any) {
	const router = useRouter();
	return (
		<Stack
			className={`justify-content-md-center shadow p-3 mb-5 rounded ${
				q?.isAttempted ? "bg-secondary" : "white"
			}`}
		>
			<Row>
				<Col
					xs={12}
					lg={q?.isAttempted && q?.successfullAttempted >= 0 ? 6 : 8}
				>
					<h3 className="h3">{q?.quiz?.title}</h3>
					<h4 className="h4">{q?.quiz?.description}</h4>
					<p className="p">Invited by: {q?.invitedBy?.name}</p>
				</Col>
				{q?.isAttempted && q?.successfullAttempted >= 0 && (
					<Col xs={6} lg={2}>
						<h6 className="h6 text-md-center">Score</h6>

						<h4 className="h4 text-md-center">
							<Badge bg="success" pill>
								{q?.successfullAttempted}
							</Badge>
						</h4>
					</Col>
				)}
				<Col xs={6} lg={2}>
					<h6 className="h6 text-md-center">No of Qns</h6>

					<h4 className="h4 text-md-center">
						<Badge bg="dark" pill>
							{q?.noOfQns}
						</Badge>
					</h4>
				</Col>
				<Col
					lg={2}
					className="d-flex justify-content-md-end align-items-center"
				>
					<Button
						onClick={() => {
							router.push(
								(q?.isAttempted ? "/user/result/" : "/user/start-quiz/") +
									q?.quiz?._id
							);
						}}
					>
						{q?.isAttempted ? "See Score" : "Start Quiz"}
					</Button>
				</Col>
			</Row>
		</Stack>
	);
}
