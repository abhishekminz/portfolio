import React from "react";

import Button from "../../common/Button";

const Card = ({ imageURL, links, heading }) => {
	return (
		<div className="card">
			<figure className="card__image">
				<img src={imageURL} alt="Project" />
			</figure>
			<h1 className="heading card__text">{heading}</h1>
			<div className="card__btn-container">
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
	);
};

export default Card;
