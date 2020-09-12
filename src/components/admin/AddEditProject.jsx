import React, { useState, useEffect } from "react";
import FileUploader from "react-firebase-file-uploader";

import { database, storage } from "./../../firebase";

const AddEditProject = ({ project }) => {
	// Photo
	// Title
	// description
	// technologies
	// code Repo link
	// use App link
	// publication
	// w/ save button and discard btn
	// const [image, setImage] = useState("");

	const [formdata, setFormdata] = useState({
		projectId: !project ? "" : project.projectId,
		imageURL: !project ? "" : project.imageURL,
		title: !project ? "" : project.title,
		description: !project ? "" : project.description,
		technologies: !project ? "" : project.technologies,
		codeRepo: !project ? "" : project.codeRepo,
		useApp: !project ? "" : project.useApp,
		published: !project ? "no" : project.published,
	});

	const [isUploading, setIsUploading] = useState(false);

	const changeHandler = (key, value) => {
		setFormdata({ ...formdata, [key]: value });
	};

	const emptyProject = {
		projectId: "",
		imageURL: "",
		title: "",
		description: "",
		technologies: "",
		codeRepo: "",
		useApp: "",
		published: "no",
	};

	useEffect(() => {
		if (project === null) {
			setFormdata(emptyProject);
		}
	}, [project]);

	useEffect(() => {
		if (!formdata.image) {
			setFormdata({ ...formdata });
		}
	}, [formdata.image]);

	const handleUploadStart = () => {
		console.log("Upload started");
		setIsUploading(true);
	};

	const handleUploadSuccess = (filename) => {
		console.log("File successfully uploaded");

		storage
			.ref("projects")
			.child(filename)
			.getDownloadURL()
			.then((url) => {
				setFormdata({ ...formdata, imageURL: url });
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
		console.log("submitting the form");
		const projectId = formdata.projectId;
		const submissionData = { ...formdata };
		delete submissionData.projectId;

		if (!projectId) {
			database
				.ref("projects")
				.push(submissionData)
				.then(() => setFormdata(emptyProject))
				.catch((error) => {
					console.log("Could not able to save the changes");
				});
		} else {
			database
				.ref("projects")
				.update({ [projectId]: submissionData })
				.then(() => setFormdata(emptyProject))
				.catch((error) => {
					console.log("Could not able to save the changes");
				});
		}
	};

	const template = (
		<form onSubmit={submitForm} className="form">
			{!isUploading ? (
				!formdata.imageURL ? (
					<div className="form__part">
						<label className="form__part-label" htmlFor="image">
							Select a Image:
						</label>
						<FileUploader
							accept="image/*"
							name="project picture"
							randomizeFilename
							storageRef={storage.ref("projects")}
							onUploadStart={handleUploadStart}
							onUploadError={handleUploadError}
							onUploadSuccess={handleUploadSuccess}
						/>
					</div>
				) : (
					<figure className="form__part-figure">
						<img src={formdata.imageURL} alt="Project picture" />
						<span
							onClick={() => changeHandler("imageURL", "")}
							className="form__part-remove">
							Remove
						</span>
					</figure>
				)
			) : (
				<div
					style={{
						fontSize: "25px",
						color: "limegreen",
						marginBottom: "25px",
					}}>
					Wait file is uploading...
				</div>
			)}

			<div className="form__part">
				<label className="form__part-label" htmlFor="title">
					Title:{" "}
				</label>
				<input
					className="form__part-input"
					type="text"
					id="title"
					name="title"
					autoComplete="off"
					value={formdata.title}
					onChange={(e) => changeHandler("title", e.target.value)}
				/>
			</div>

			<div className="form__part">
				<label className="form__part-label" htmlFor="description">
					Description:{" "}
				</label>
				<textarea
					rows="5"
					cols="33"
					className="form__part-input"
					type="text"
					id="description"
					name="description"
					autoComplete="off"
					value={formdata.description}
					onChange={(e) => changeHandler("description", e.target.value)}
				/>
			</div>

			<div className="form__part">
				<label className="form__part-label" htmlFor="technologies">
					Technologies:{" "}
				</label>
				<textarea
					rows="5"
					cols="33"
					className="form__part-input"
					type="text"
					id="technologies"
					name="technologies"
					autoComplete="off"
					value={formdata.technologies}
					onChange={(e) => changeHandler("technologies", e.target.value)}
				/>
			</div>

			<div className="form__part">
				<label className="form__part-label" htmlFor="codeRepo">
					Repository link:{" "}
				</label>
				<input
					className="form__part-input"
					type="text"
					id="codeRepo"
					name="codeRepo"
					autoComplete="off"
					value={formdata.codeRepo}
					onChange={(e) => changeHandler("codeRepo", e.target.value)}
				/>
			</div>

			<div className="form__part">
				<label className="form__part-label" htmlFor="useApp">
					App link:
				</label>
				<input
					className="form__part-input"
					type="text"
					id="useApp"
					name="useApp"
					autoComplete="off"
					value={formdata.useApp}
					onChange={(e) => changeHandler("useApp", e.target.value)}
				/>
			</div>

			<div className="form__part">
				<div className="form__part-label">
					<label>Publication:</label>
				</div>
				<div
					name="published"
					onChange={(e) => {
						changeHandler("published", e.target.value);
					}}
					className="form__part-input">
					<div className="form__part-input-radio">
						<input
							type="radio"
							id="yes"
							value="yes"
							checked={formdata.published === "yes"}
							name="publication-grp"
						/>
						<label htmlFor="yes">Yes</label>
					</div>
					<div className="form__part-input-radio">
						<input
							type="radio"
							id="no"
							value="no"
							checked={formdata.published === "no"}
							name="publication-grp"
						/>
						<label htmlFor="no">No</label>
					</div>
				</div>
			</div>
			<button className="form__submit-btn" type="submit">
				Save
			</button>
		</form>
	);
	return template;
};

export default AddEditProject;
