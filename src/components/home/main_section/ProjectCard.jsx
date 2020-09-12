import React from "react";

import Button from "../../common/Button";

const ProjectCard = ({ imageURL, links, heading, description, details }) => {
	return (
		<div className="project-card">
			<div className="project-card__left-part">
				<figure className="project-card__image">
					<img src={imageURL} alt="project image" />
				</figure>
				<div className="project-card__button-container">
					<Button
						classes={[
							`btn btn--smallest btn--navigation btn--navigation-1`,
							"btn__navigation-label",
						]}
						text={{
							val: "USE APP",
						}}
						href={links.useApp}
						target="_blank"
					/>
					<Button
						classes={[
							`btn btn--smallest btn--navigation btn--navigation-2`,
							"btn__navigation-label",
						]}
						text={{
							val: "CODE REPO",
						}}
						href={links.codeRepo}
						target="_blank"
					/>
				</div>
			</div>
			<div className="project-card__right-part">
				<h1 className="heading">{heading}</h1>
				<p className="description">{description}</p>
				<p className="details">{details}</p>
			</div>
		</div>
	);
};

export default ProjectCard;
