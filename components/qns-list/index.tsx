import { ChangeEvent, FormEvent, memo, useEffect, useState } from "react";
import { Button, Form, Stack } from "react-bootstrap";
import * as yup from "yup";
import { Formik } from "formik";
import { createQns, getQns } from "../../services/qns";
import Qns from "./qns";
import { useQns } from "../../hooks/useQns";

interface Props {
	topic: string;
	subTopic: string;
	addQnsInQuiz?: (qnsId: string) => void;
}

function QnsList({ topic, subTopic, addQnsInQuiz }: Props) {
	const qns: any = useQns({ topic, subTopic });

	return (
		<Stack gap={3}>
			{qns?.map((q: any) => (
				<Qns key={q._id} qns={q} addQnsInQuiz={addQnsInQuiz} />
			))}
		</Stack>
	);
}
export default memo(QnsList);
