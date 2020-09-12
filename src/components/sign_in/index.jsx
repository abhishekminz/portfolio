import React, { useState } from "react";

import { firebaseAuth } from "./../../firebase";

const SignIn = (props) => {
	const [formdata, setFormdata] = useState({
		email: "",
		password: "",
		error: false,
	});

	const changeHandler = (key, value) => {
		setFormdata({ ...formdata, [key]: value, error: false });
	};

	const submitForm = (e) => {
		e.preventDefault();

		// Make a network request here to login
		firebaseAuth
			.signInWithEmailAndPassword(formdata.email, formdata.password)
			.then(() => {
				props.history.replace("/admin");
			})
			.catch((error) => {
				setFormdata({ ...formdata, error: true });
			});
	};

	return (
		<div className="signin-page">
			<div className="signin">
				<h1 className="signin__text">Login</h1>
				<form onSubmit={submitForm} className="signin__form">
					<input
						className="signin__field"
						type="text"
						placeholder="Enter your email"
						onChange={(e) => changeHandler("email", e.target.value)}
					/>
					<input
						className="signin__field"
						type="password"
						placeholder="Enter your password"
						onChange={(e) => changeHandler("password", e.target.value)}
					/>
					<button className="signin__btn" type="submit">
						Login
					</button>
					{formdata.error ? (
						<div
							style={{
								fontSize: "16px",
								color: "red",
								fontWeight: "bold",
								marginTop: "10px",
							}}>
							Invalid email or password
						</div>
					) : null}
				</form>
			</div>
		</div>
	);
};

export default SignIn;
