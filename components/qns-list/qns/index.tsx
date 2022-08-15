import { Badge, Button, Card, ListGroup } from "react-bootstrap";
import { PencilSquare } from "react-bootstrap-icons";

const Qns = ({ qns, addQnsInQuiz }: any) => {
	return (
		<Card>
			<Card.Header className="d-flex justify-content-between">
				<div>
					<Badge className="m-1" bg="dark">
						{qns?.topic?.title}
					</Badge>
					<Badge className="m-1" bg="dark">
						{qns?.subTopic?.title}
					</Badge>
				</div>
				<div>
					{qns?.qnsUsed ? (
						<Badge
							className="m-1 text-capitalize"
							bg="secondary"
						>{`Qns used ${qns?.qnsUsed}`}</Badge>
					) : null}
					<Badge
						className="m-1 text-capitalize"
						bg={qns?.status === "active" ? "primary" : "danger"}
					>
						{qns?.status}
					</Badge>
					<Badge
						className="m-1 text-capitalize"
						bg="info"
					>{`points ${qns?.points}`}</Badge>
				</div>
			</Card.Header>
			<Card.Body>
				<Card.Title>{qns?.title}</Card.Title>
				<Card.Text>{qns?.description}</Card.Text>
			</Card.Body>
			<ListGroup className="list-group-flush">
				{qns?.options?.map((o: string, i: number) => (
					<ListGroup.Item
						key={o}
						variant={i + 1 === qns?.correctChoice ? "success" : "light"}
					>
						{o}
					</ListGroup.Item>
				))}
			</ListGroup>
			<Card.Footer className="d-flex justify-content-between">
				<Card.Text>
					Duration of Qns <strong>{qns?.durationOfQns} </strong>sec
				</Card.Text>
				{addQnsInQuiz ? (
					<Button onClick={() => addQnsInQuiz(qns._id)}>Add Qns</Button>
				) : (
					<Card.Link className="ml-auto">
						<PencilSquare />
					</Card.Link>
				)}
			</Card.Footer>
		</Card>
	);
};

export default Qns;
