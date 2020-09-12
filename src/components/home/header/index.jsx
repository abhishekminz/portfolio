import React, { useState, useEffect } from "react";

import mainPicture from "../../../resources/logo1.jpg";
import { database } from "./../../../firebase";

const Header = () => {
	const [resumeLink, setResumeLink] = useState("");

	useEffect(() => {
		database
			.ref("resume")
			.once("value")
			.then((snapShot) => setResumeLink(snapShot.val().resumeLink))
			.catch(() =>
				console.log("could not get the resume link. Something is wrong")
			);
	}, []);

	return (
		<header className="header">
			<div className="row">
				<div className="col-3-of-4">
					<div className="header__text-box">
						<h1 className="heading__primary">
							<span className="heading__primary--main">
								Hello, I am Abhishek{" "}
							</span>
							<span className="heading__primary--sub">
								I am a{" "}
								<span className="text-background"> Full Stack Developer. </span>
							</span>
						</h1>
					</div>
				</div>
				<div className="col-1-of-4">
					<div className="header__side-box">
						<div className="header__image-box  u-margin-bottom-large">
							<img
								src={mainPicture}
								alt="Abhishek Minz"
								className="header__image"
							/>
						</div>
						<div className="header__resume-box">
							<a
								href={resumeLink}
								className="btn btn--big btn--downloadable-resume"
								target="_blank">
								<span className="btn__label">Resume</span>
							</a>
							<i className="icon ion-md-download download-icon"></i>
						</div>
					</div>
				</div>
			</div>
		</header>
	);
};

export default Header;
