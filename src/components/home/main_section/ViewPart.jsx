import React from "react";

import Button from "../../common/Button";

const ViewPart = ({ view, toggleHandler }) => {
	return (
		<div className="project-box__view-part">
			<div className="project-box__view-part__container">
				<Button
					classes={[
						`btn btn--small btn--navigation btn--navigation-1 ${
							view === "LIST VIEW" ? "btn-active" : ""
						}`,
						"btn__navigation-label",
					]}
					text={{
						key: "view",
						val: "LIST VIEW",
						icon: true,
						iconName: "icon ion-md-list",
					}}
					handler={toggleHandler}
				/>
				<Button
					classes={[
						`btn btn--small btn--navigation btn--navigation-2 ${
							view === "GRID VIEW" ? "btn-active" : ""
						}`,
						"btn__navigation-label",
					]}
					text={{
						key: "view",
						val: "GRID VIEW",
						icon: true,
						iconName: "icon ion-md-grid",
					}}
					handler={toggleHandler}
				/>
			</div>
		</div>
	);
};

export default ViewPart;
