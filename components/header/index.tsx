import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Col, Image, Nav, Navbar, Row, Container } from "react-bootstrap";

export default function Header() {
	const router = useRouter();
	const [role, setRole] = useState("");
	useEffect(() => {
		setRole(localStorage.getItem("role") as string);
	}, []);

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
					{role === "student" && (
						<>
							<Nav.Item>
								<Nav.Link eventKey="/invitation">Invitation</Nav.Link>
							</Nav.Item>
							<Nav.Item>
								<Nav.Link eventKey="/history">History</Nav.Link>
							</Nav.Item>
							<Nav.Item>
								<Nav.Link eventKey="/performance">Performance</Nav.Link>
							</Nav.Item>
						</>
					)}
					{role === "instructor" ||
						(role === "admin" && (
							<>
								<Nav.Item>
									<Nav.Link eventKey="/quiz">Quiz</Nav.Link>
								</Nav.Item>
								<Nav.Item>
									<Nav.Link eventKey="/qns">Qns</Nav.Link>
								</Nav.Item>
								<Nav.Item>
									<Nav.Link eventKey="/topic">Topic</Nav.Link>
								</Nav.Item>
								<Nav.Item>
									<Nav.Link eventKey="/send-quiz-invitation">
										Send Invitation
									</Nav.Link>
								</Nav.Item>
							</>
						))}
					{role === "admin" && (
						<>
							<Nav.Item>
								<Nav.Link eventKey="/invite-user">Invitate User</Nav.Link>
							</Nav.Item>
							<Nav.Item>
								<Nav.Link eventKey="/users">Users</Nav.Link>
							</Nav.Item>
						</>
					)}
					{role && (
						<>
							<Nav.Item>
								<Nav.Link eventKey="/logout">Logout</Nav.Link>
							</Nav.Item>
						</>
					)}
				</Nav>
			</Container>
		</Navbar>
	);
}
