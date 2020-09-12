import React, { useState, useEffect } from "react";

import { database } from "./../../firebase";

const Contact = () => {
	const [formdata, setFormdata] = useState({
		email: "",
		phone: "",
		github: "",
		facebook: "",
		instagram: "",
	});

	const changeHandler = (key, value) => {
		setFormdata({ ...formdata, [key]: value });
	};

	useEffect(() => {
		database
			.ref("contacts")
			.once("value")
			.then((snapShot) => setFormdata(snapShot.val()))
			.catch((error) => console.log("Problem in fetching contact details"));
	}, []);

	const submitForm = () => {
		database
			.ref("contacts")
			.update(formdata)
			.then(() => console.log("successfully written"))
			.catch(() => console.log("Something went wrong"));
	};

	return (
		<form
			onSubmit={(e) => {
				e.preventDefault();
				console.log("submitting the form", formdata);
				submitForm();
			}}
			className="form">
			<div className="form__part">
				<label className="form__part-label" htmlFor="email">
					Email:{" "}
				</label>
				<input
					className="form__part-input"
					type="text"
					id="email"
					name="email"
					autoComplete="false"
					value={formdata.email}
					onChange={(e) => changeHandler("email", e.target.value)}
				/>
			</div>

			<div className="form__part">
				<label className="form__part-label" htmlFor="phone">
					Phone:{" "}
				</label>
				<input
					className="form__part-input"
					type="text"
					id="phone"
					name="phone"
					autoComplete="false"
					value={formdata.phone}
					onChange={(e) => changeHandler("phone", e.target.value)}
				/>
			</div>

			<div className="form__part">
				<label className="form__part-label" htmlFor="github">
					Github:{" "}
				</label>
				<input
					className="form__part-input"
					type="text"
					id="github"
					name="github"
					autoComplete="false"
					value={formdata.github}
					onChange={(e) => changeHandler("github", e.target.value)}
				/>
			</div>

			<div className="form__part">
				<label className="form__part-label" htmlFor="instagram">
					Instagram:{" "}
				</label>
				<input
					className="form__part-input"
					type="text"
					id="instagram"
					name="instagram"
					autoComplete="false"
					value={formdata.instagram}
					onChange={(e) => changeHandler("instagram", e.target.value)}
				/>
			</div>

			<div className="form__part">
				<label className="form__part-label" htmlFor="facebook">
					Facebook:
				</label>
				<input
					className="form__part-input"
					type="text"
					id="facebook"
					name="facebook"
					autoComplete="false"
					value={formdata.facebook}
					onChange={(e) => changeHandler("facebook", e.target.value)}
				/>
			</div>

			<button className="form__submit-btn" type="submit">
				Save
			</button>
		</form>
	);
};

export default Contact;
