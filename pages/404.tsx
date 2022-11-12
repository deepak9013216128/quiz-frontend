import { NextPage } from "next";
import { Container } from "react-bootstrap";
import Footer from "../components/footer";
import Header from "../components/header";
import Link from "next/link";

const Topic: NextPage = () => {
	return (
		<div className="d-flex flex-column min-vh-100">
			<Header />
			<Container className="mb-3 mt-3">
				<h1 className="text-center">404 - Page Not Found</h1>
			</Container>
			<Footer />
		</div>
	);
};

export default Topic;
