import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect } from "react";

const Logout: NextPage = () => {
	const router = useRouter();
	useEffect(() => {
		localStorage.clear();
		router.push("/login");
	}, []);
	return <div></div>;
};

export default Logout;
