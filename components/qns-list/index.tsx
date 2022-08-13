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
}

function QnsList({ topic, subTopic }: Props) {
	const qns: any = useQns({ topic, subTopic });

	return (
		<Stack gap={3}>
			{qns?.map((q: any) => (
				<Qns key={q._id} qns={q} />
			))}
		</Stack>
	);
}
export default memo(QnsList);
