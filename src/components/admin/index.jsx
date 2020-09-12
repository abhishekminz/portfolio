import React, { useState, useEffect } from "react";

import AddEditProject from "./AddEditProject";
import Contact from "./Contact";
import NavList from "./NavList";
import Resume from "./Resume";
import Table from "./Table";

import { snapShotLooper } from "./../../utils/reusable";
import { database } from "./../../firebase";

const Admin = () => {
	//  Left Side should be comprised of :-
	//  1. Published Handler
	//  2. Not Published Handler
	//  3. New Project
	//  4. Logout

	//  Right side section will depend upon the option activated on the left hand side
	//  With basic form:- made up of image, title, description, technologies stack used & publication activation button
	//  The form on right side will get populated if its an old project or else an empty one will get generated if no record will be found related to it
	const [active, setActive] = useState("");
	const [project, setProject] = useState("");
	const [projectList, setProjectList] = useState([]);

	useEffect(() => {
		// Make an API call to fetch projects only once at the first render
		database.ref("projects").on("value", (snapShot) => {
			const projectArray = snapShotLooper(snapShot);
			setProjectList(projectArray);
		});
	}, []);

	let greetings = "";
	if (active === "") {
		greetings = getGreetings();
	}

	const getData = (type) => projectList.filter((p) => p.published === type);

	const getActivatedContent = () => {
		if (active === "Published")
			return (
				<Table
					data={getData("yes")}
					handler={{ setProject: setProject, setActive: setActive }}
				/>
			);

		if (active === "Not Published")
			return (
				<Table
					data={getData("no")}
					handler={{ setProject: setProject, setActive: setActive }}
				/>
			);

		if (active === "Add/Edit Project") {
			let p = null;
			if (project) p = projectList.filter((p) => p.title === project)[0];
			return <AddEditProject project={p} />;
		}
		if (active === "Contact") return <Contact />;
		if (active === "Resume") return <Resume />;
		if (active === "Logout") return "Logging out please wait...";
	};

	return (
		<div className="admin">
			<NavList
				active={active}
				handler={{ activeHandler: setActive, projectHandler: setProject }}
			/>
			<div className="admin__work-panel">
				{active === "" ? greetings : null}
				{active ? (
					<div style={{ fontSize: "50px" }}>{getActivatedContent()}</div>
				) : null}
			</div>
		</div>
	);
};

const getGreetings = () => {
	const hour = new Date().getHours();
	const styles = { textAlign: "center", marginTop: "20px", fontSize: "50px" };

	if (hour < 12) return <div style={styles}>Good Morning, Abhishek!</div>;
	else if (hour < 16)
		return <div style={styles}>Good Afternoon, Abhishek!</div>;
	else return <div style={styles}>Good Evening, Abhishek!</div>;
};

export default Admin;
