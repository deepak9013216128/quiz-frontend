import { useRouter } from "next/router";
import { Col, Image, Nav, Navbar, Row, Container } from "react-bootstrap";

export default function Header() {
	const router = useRouter();
	return (
		<Navbar bg="dark" variant="dark">
			<Container>
				<Navbar.Brand href="/">
					<Image
						src="/assets/logo.svg"
						alt="logo"
						width="30"
						height="30"
						className="d-inline-block align-top"
					/>{" "}
					Home
				</Navbar.Brand>
				<Nav
					activeKey="/home"
					onSelect={(selectedKey) => router.push(selectedKey as string)}
				>
					<Nav.Item>
						<Nav.Link eventKey="/qns">Qns</Nav.Link>
					</Nav.Item>
					<Nav.Item>
						<Nav.Link eventKey="/topic">Topic</Nav.Link>
					</Nav.Item>
					<Nav.Item>
						<Nav.Link eventKey="/send-invitation">Send Invitation</Nav.Link>
					</Nav.Item>
					<Nav.Item>
						<Nav.Link eventKey="/invitation">Invitation</Nav.Link>
					</Nav.Item>
					<Nav.Item>
						<Nav.Link eventKey="/history">History</Nav.Link>
					</Nav.Item>
					<Nav.Item>
						<Nav.Link eventKey="/performance">Performance</Nav.Link>
					</Nav.Item>
				</Nav>
			</Container>
		</Navbar>
	);
}
