import React from "react";

import { database } from "./../../firebase";

const Table = ({ data, handler }) => {
	const styles = { cursor: "pointer" };

	const handleDelete = (projectId) => {
		database
			.ref("projects")
			.update({ [projectId]: null })
			.then(() => console.log("successfully deleted"))
			.catch((error) => console.log("Could not delete the project"));
	};

	return (
		<table className="table">
			<thead>
				<tr className="head-row">
					<th className="head-row__title">Title</th>
					<th className="head-row__description">description</th>
					<th className="head-row__technologies">Technologies</th>
					<th className="head-row__delete"></th>
				</tr>
			</thead>
			<tbody className="table__body">
				{data.map((d, i) => (
					<tr key={i}>
						<td
							style={styles}
							onClick={() => {
								handler.setProject(d.title);
								handler.setActive("Add/Edit Project");
							}}>
							{d.title}
						</td>
						<td>{d.description}</td>
						<td>{d.technologies}</td>
						<td>
							<button
								onClick={() => handleDelete(d.projectId)}
								style={styles}
								className="table__btn">
								Delete
							</button>
						</td>
					</tr>
				))}
			</tbody>
		</table>
	);
};

export default Table;
