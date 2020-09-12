import React, { useState, useEffect } from "react";
import FileUploader from "react-firebase-file-uploader";

import { database, storage } from "./../../firebase";

const Resume = () => {
	// Resume file upload or prv-one

	const [resumeLink, setResumeLink] = useState("");
	const [isUploading, setIsUploading] = useState(false);

	useEffect(() => {
		// Make a network request to fetch resumeLink from the database
		// then setResumeLink
		// setResumeLink(pdf);
		database
			.ref("resume")
			.once("value")
			.then((snapShot) => setResumeLink(snapShot.val().resumeLink))
			.catch((error) => console.log("something went sorry!"));
	}, []);

	const handleUploadStart = () => {
		console.log("Upload started");
		setIsUploading(true);
	};

	const handleUploadSuccess = (filename) => {
		console.log("File successfully uploaded");

		storage
			.ref("resume")
			.child(filename)
			.getDownloadURL()
			.then((url) => {
				setResumeLink(url);
				setIsUploading(false);
			});
	};

	const handleUploadError = (error) => {
		console.log("Uploading failed!");
		setIsUploading(false);
		console.error(error);
	};

	const submitForm = (e) => {
		e.preventDefault();
		database
			.ref("resume")
			.update({ resumeLink: resumeLink })
			.then(() => console.log("Successfully written on the database"))
			.catch((error) => console.log(console.log(error.message)));
	};

	return (
		<form onSubmit={submitForm} className="form">
			<div className="form__part">
				{!isUploading ? (
					!resumeLink ? (
						<React.Fragment>
							<label className="form__part-label" htmlFor="resume">
								Resume:
							</label>
							<FileUploader
								name="resume"
								randomizeFilename
								storageRef={storage.ref("resume")}
								onUploadStart={handleUploadStart}
								onUploadError={handleUploadError}
								onUploadSuccess={handleUploadSuccess}
							/>
						</React.Fragment>
					) : (
						<React.Fragment>
							<a
								style={{
									backgroundColor: "limegreen",
									padding: "4px 10px",
									color: "white",
									textDecoration: "none",
									fontSize: "20px",
								}}
								href={resumeLink}
								download="Resume-AbhishekMinz">
								<span className="btn__label">Resume</span>
							</a>
							<button
								onClick={() => {
									setResumeLink("");
								}}
								style={{
									backgroundColor: "indianred",
									padding: "4px 10px",
									color: "white",
									textDecoration: "none",
									fontSize: "20px",
									border: "none",
									marginLeft: "50px",
								}}>
								Discard
							</button>
						</React.Fragment>
					)
				) : (
					<div
						style={{
							fontSize: "25px",
							color: "limegreen",
							marginBottom: "25px",
						}}>
						Wait, file is uploading...
					</div>
				)}
			</div>
			<button className="form__submit-btn" type="submit">
				Save
			</button>
		</form>
	);
};

export default Resume;
