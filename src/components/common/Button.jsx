import React from "react";

const Button = ({ href, text, classes, handler, ...rest }) => {
	let markup;
	if (href) {
		markup = (
			<a href={href} className={classes[0]} {...rest}>
				<span className={classes[1]}>{text.val}</span>
			</a>
		);
	} else {
		markup = (
			<button className={classes[0]} onClick={() => handler(text)}>
				<span className={classes[1]}>
					{text.icon ? <i className={text.iconName}></i> : text.val}
				</span>
			</button>
		);
	}
	return markup;
};

export default Button;
