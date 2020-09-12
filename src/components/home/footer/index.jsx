import React from "react";

const Footer = () => {
	return (
		<footer className="footer">
			<div className="footer__text">
				&copy; Copyright {new Date().getFullYear()}. Designed And Coded By
				Abhishek Minz.
			</div>
		</footer>
	);
};

export default Footer;
