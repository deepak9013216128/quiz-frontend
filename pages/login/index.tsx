import { NextPage } from "next";
import { useRouter } from "next/router";
import { ChangeEvent, FormEvent, useContext, useEffect, useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import Footer from "../../components/footer";
import Header from "../../components/header";
import { useToasts } from "../../components/toast";
import { login } from "../../services/user";

const Login: NextPage = () => {
	const router = useRouter();
	const { showToast } = useToasts();
	const [input, setInput] = useState({
		email: "",
		password: "",
	});

	const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
		setInput((p) => ({ ...p, [e.target.name]: e.target.value }));
	};

	const goToDashboard = (role: string) => {
		switch (role) {
			case "student":
				router.push("/user/dashboard");
				break;
			case "instructor":
			case "admin":
				router.push("/dashboard");
				break;
			default:
				break;
		}
	};

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const res = await login({ email: input.email, password: input.password });
		if (res?.message) {
			return showToast("danger", res?.message);
		}
		showToast("success", "Login Successful");
		goToDashboard(res?.role);
	};

	useEffect(() => {
		goToDashboard(localStorage.getItem("role") as string);
	}, []);

	return (
		<div className="d-flex flex-column min-vh-100">
			<Header />
			<Container className="mb-3 mt-3">
				<Row className="justify-content-md-center">
					<Col xs md={6} lg={4}>
						<h1 className="h1 text-center">Login</h1>
						<Form className="d-grid" onSubmit={handleSubmit}>
							<Form.Group className="mb-3" controlId="formBasicEmail">
								<Form.Label>Email address</Form.Label>
								<Form.Control
									name="email"
									type="email"
									placeholder="Enter email"
									onChange={handleInputChange}
								/>
							</Form.Group>

							<Form.Group className="mb-3" controlId="formBasicPassword">
								<Form.Label>Password</Form.Label>
								<Form.Control
									name="password"
									type="password"
									placeholder="Password"
									min="6"
									onChange={handleInputChange}
								/>
							</Form.Group>

							<Button variant="primary" type="submit">
								Login
							</Button>
						</Form>
					</Col>
				</Row>
			</Container>
			<Footer />
		</div>
	);
};

export default Login;
