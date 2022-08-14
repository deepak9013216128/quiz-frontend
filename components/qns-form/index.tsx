import { ChangeEvent, FormEvent, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { createQns } from "../../services/qns";

interface qnsFormInterface {
	topic: string;
	subTopic: string;
	hideForm: () => void;
}

export default function QnsForm({
	topic,
	subTopic,
	hideForm,
}: qnsFormInterface) {
	const [input, setInput] = useState({
		title: "",
		description: "",
		noOfOptions: 2,
		correctOption: "",
		points: 1,
		durationOfQns: 30,
	});
	const [validated, setValidated] = useState(false);

	const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
		setInput((p) => ({ ...p, [e.target.name]: e.target.value }));
	};

	const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
		const form = event.currentTarget;
		event.preventDefault();
		event.stopPropagation();

		setValidated(true);

		const body = {
			title: input.title,
			description: input.description,
			topic: topic,
			subTopic: subTopic,
			correctChoice: Number(input.correctOption),
			points: Number(input.points),
			durationOfQns: Number(input.durationOfQns),
			options: new Array(Number(input.noOfOptions))
				.fill(0)
				.map((_, i) => input[`option${i + 1}` as keyof typeof input]),
		};
		if (
			Object.values(body).filter((v) => v).length === 8 &&
			body.options.filter((o) => o).length === Number(input.noOfOptions)
		) {
			const res = await createQns(body);
			hideForm();
		}
	};
	return (
		<Form
			noValidate
			validated={validated}
			className="d-grid"
			onSubmit={handleSubmit}
		>
			<Form.Group className="mb-3" controlId="formBasicTitle">
				<Form.Label>Title</Form.Label>
				<Form.Control
					name="title"
					type="text"
					placeholder="Enter title"
					onChange={handleInputChange}
					required
				/>{" "}
				<Form.Control.Feedback type="invalid">
					Please enter title of question.
				</Form.Control.Feedback>
			</Form.Group>

			<Form.Group className="mb-3" controlId="formBasicDescription">
				<Form.Label>Description</Form.Label>
				<Form.Control
					name="description"
					as="textarea"
					rows={3}
					placeholder="Enter description"
					onChange={handleInputChange}
					required
				/>
				<Form.Control.Feedback type="invalid">
					Please enter subtitle of question.
				</Form.Control.Feedback>
			</Form.Group>

			<Form.Group className="mb-3" controlId="formBasicOptions">
				<Form.Label>No Of Options</Form.Label>
				<Form.Select
					name="noOfOptions"
					placeholder="Enter no of option"
					onChange={(e: ChangeEvent<HTMLSelectElement>) =>
						setInput((p) => ({ ...p, [e.target.name]: e.target.value }))
					}
				>
					<option>2</option>
					<option>3</option>
					<option>4</option>
					<option>5</option>
					<option>6</option>
					<option>7</option>
				</Form.Select>
			</Form.Group>
			{new Array(Number(input.noOfOptions)).fill(0).map((_, i) => (
				<Form.Group key={i} className="mb-3" controlId={`formBasicOption${i}`}>
					<Form.Label>Option {i + 1}</Form.Label>
					<Form.Control
						name={`option${i + 1}`}
						as="textarea"
						rows={1}
						required
						placeholder={`Enter option ${i + 1}`}
						onChange={handleInputChange}
					/>
					<Form.Control.Feedback type="invalid">
						Please enter option details of question.
					</Form.Control.Feedback>
				</Form.Group>
			))}

			<Form.Group className="mb-3" controlId="formBasicCorrectOption">
				<Form.Label>Correct Option</Form.Label>
				<Form.Control
					name="correctOption"
					type="Number"
					max={input.noOfOptions}
					min={1}
					required
					placeholder="Enter description"
					onChange={handleInputChange}
				/>
				<Form.Control.Feedback type="invalid">
					Please enter correct option of the question.
				</Form.Control.Feedback>
			</Form.Group>

			<Form.Group className="mb-3" controlId="formBasicPoints">
				<Form.Label>Points</Form.Label>
				<Form.Select
					name="points"
					placeholder="Enter no of option"
					onChange={(e: ChangeEvent<HTMLSelectElement>) =>
						setInput((p) => ({ ...p, [e.target.name]: e.target.value }))
					}
				>
					<option>1</option>
					<option>2</option>
					<option>3</option>
					<option>4</option>
					<option>5</option>
				</Form.Select>
			</Form.Group>

			<Form.Group className="mb-3" controlId="formBasicDuration">
				<Form.Label>Time (in Second)</Form.Label>
				<Form.Select
					name="durationOfQns"
					placeholder="Enter no of option"
					onChange={(e: ChangeEvent<HTMLSelectElement>) =>
						setInput((p) => ({ ...p, [e.target.name]: e.target.value }))
					}
				>
					<option>30</option>
					<option>60</option>
					<option>90</option>
					<option>120</option>
					<option>300</option>
				</Form.Select>
			</Form.Group>

			<Button variant="primary" type="submit">
				Submit
			</Button>
		</Form>
	);
}
