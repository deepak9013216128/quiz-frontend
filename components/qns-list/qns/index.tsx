import { Badge, Card, ListGroup } from "react-bootstrap";
import { PencilSquare } from "react-bootstrap-icons";

const Qns = ({ qns }: any) => {
	console.log(qns);
	return (
		<Card>
			<Card.Header>
				<Badge className="m-1" bg="dark">
					{qns?.topic?.title}
				</Badge>
				<Badge className="m-1" bg="dark">
					{qns?.subTopic?.title}
				</Badge>
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
				<Card.Link className="ml-auto">
					<PencilSquare />
				</Card.Link>
			</Card.Footer>
		</Card>
	);
};

export default Qns;
