import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect } from "react";

const User: NextPage = () => {
	const router = useRouter();
	useEffect(() => {
		router.push("/user/dashboard");
	}, []);
	return <div></div>;
};

export default User;
