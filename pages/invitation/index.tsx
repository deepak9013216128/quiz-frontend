import { NextPage } from "next";
import { useRouter } from "next/router";
import { FormEvent, useEffect, useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import Footer from "../../components/footer";
import Header from "../../components/header";
import { register } from "../../services/user";

const Invitation: NextPage = () => {
	const router = useRouter();

	const [validated, setValidated] = useState(false);
	const [token, setToken] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");

	useEffect(() => {
		if (router.query.token) {
			setToken(router.query.token as string);
		}
	}, [router.query.token]);

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setValidated(true);
		if (password && password === confirmPassword) {
			const res = await register(password, token);
			router.push("/login");
		}
	};
	return (
		<div className="d-flex flex-column min-vh-100">
			<Header />
			<Container className="mb-3 mt-3">
				<Row className="justify-content-md-center">
					<Col xs md={6} lg={4}>
						<h1 className="h1 text-center">Invitation</h1>
						<Form
							noValidate
							validated={validated}
							className="d-grid"
							onSubmit={handleSubmit}
						>
							<Form.Group className="mb-3" controlId="formBasicPassword">
								<Form.Label>Password</Form.Label>
								<Form.Control
									type="password"
									placeholder="Password"
									onChange={(e) => setPassword(e.target.value)}
									required
								/>
								<Form.Control.Feedback type="invalid">
									Password is required
								</Form.Control.Feedback>
							</Form.Group>

							<Form.Group className="mb-3" controlId="formBasicConfirmPassword">
								<Form.Label>Confirm Password</Form.Label>
								<Form.Control
									type="password"
									placeholder="Confirm Password"
									onChange={(e) => setConfirmPassword(e.target.value)}
									required
								/>
								<Form.Control.Feedback type="invalid">
									Confirm Password is required
								</Form.Control.Feedback>
							</Form.Group>

							<Button variant="primary" type="submit">
								Submit
							</Button>
						</Form>
					</Col>
				</Row>
			</Container>
			<Footer />
		</div>
	);
};

export default Invitation;
