import React from "react";

import { firebaseAuth } from "./../../firebase";

const NavList = ({ active, handler }) => {
	const nav = [
		"Published",
		"Not Published",
		"Add/Edit Project",
		"Resume",
		"Contact",
	];

	const logoutUser = () => {
		firebaseAuth.signOut().then(
			() => {
				console.log("Logged out");
			},
			(error) => {
				console.log("Error");
			}
		);
	};

	return (
		<ul className="admin__nav-list">
			{nav.map((n) => (
				<li
					key={n}
					className={`${active === n ? "list-active-btn" : ""}`}
					onClick={() => {
						if (n === "Add/Edit Project") handler.projectHandler("");
						handler.activeHandler(n);
					}}>
					{n}
				</li>
			))}
			<li onClick={() => logoutUser()}>Logout</li>
		</ul>
	);
};

export default NavList;
