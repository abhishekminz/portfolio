import React from "react";

import Button from "../../common/Button";

const NavigationPart = ({ navigation, toggleHandler }) => {
	return (
		<div style={{ textAlign: "center" }}>
			<Button
				classes={[
					`btn btn--big btn--navigation btn--navigation-1 ${
						navigation === "MY WORKS" ? "btn-active" : ""
					}`,
					"btn__navigation-label",
				]}
				text={{ key: "navigation", val: "MY WORKS" }}
				handler={toggleHandler}
			/>
			<Button
				classes={[
					`btn btn--big btn--navigation btn--navigation-2 ${
						navigation === "CONTACT" ? "btn-active" : ""
					}`,
					"btn__navigation-label",
				]}
				text={{ key: "navigation", val: "CONTACT" }}
				handler={toggleHandler}
			/>
		</div>
	);
};

export default NavigationPart;
