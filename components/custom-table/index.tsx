import { Table } from "react-bootstrap";

interface Props {
	headers: Array<string>;
	body: Array<Array<string>>;
}

export default function CustomTable({ headers, body }: Props) {
	return (
		<Table striped>
			<thead>
				<tr>
					{headers.map((header, i) => (
						<th key={i}>{header}</th>
					))}
				</tr>
			</thead>
			<tbody>
				{body?.map((row, i) => (
					<tr key={row[0]}>
						{row?.map((col, i) => (
							<td key={i}>{col}</td>
						))}
					</tr>
				))}
			</tbody>
		</Table>
	);
}
