import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect } from "react";

const User: NextPage = () => {
	const router = useRouter();
	useEffect(() => {
		switch (localStorage.getItem("role")) {
			case "admin":
			case "instructor":
				router.push("/dashboard");
				break;
			case "student":
				router.push("/user/dashboard");
				break;
			default:
				router.push("/login");
				break;
		}
	}, []);
	return <div></div>;
};

export default User;
