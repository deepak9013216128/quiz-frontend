import { NextComponentType, NextPage } from "next";
import { useRouter } from "next/router";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";

import Dropdown from "react-bootstrap/Dropdown";

interface dropdownInterface {
	title: string;
	menu: Array<any>;
	onSelect: (item: any) => void;
}

function BasicDropdown({ title, menu, onSelect }: dropdownInterface) {
	return (
		<Dropdown onSelect={onSelect}>
			<Dropdown.Toggle variant="primary" id="dropdown-basic">
				{title}
			</Dropdown.Toggle>

			<Dropdown.Menu>
				{menu.map((item: any) => (
					<Dropdown.Item
						key={item?._id}
						eventKey={item?._id}
						value={item?.title}
					>
						{item?.title}
					</Dropdown.Item>
				))}
			</Dropdown.Menu>
		</Dropdown>
	);
}

interface Props {
	topic: any;
	subTopic: any;
	topics: Array<any>;
	subTopics: Array<any>;
	changeTopic: (topic: any) => void;
	changeSubTopic: (subTopic: any) => void;
}

const TopicDrodown = ({
	topic,
	subTopic,
	topics,
	subTopics,
	changeTopic,
	changeSubTopic,
}: Props) => {
	const router = useRouter();

	return (
		<div className="d-flex justify-content-around">
			<BasicDropdown title="Topic" menu={topics} onSelect={changeTopic} />
			<BasicDropdown
				title="Sub Topic"
				menu={subTopics}
				onSelect={changeSubTopic}
			/>
		</div>
	);
};

export default TopicDrodown;
