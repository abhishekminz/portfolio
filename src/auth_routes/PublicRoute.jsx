import React from "react";
import { Route, Redirect } from "react-router-dom";

const PublicRoute = ({ user, component: Comp, restricted, ...rest }) =>
	user && restricted ? (
		<Redirect to="/admin" />
	) : (
		<Route {...rest} component={Comp} />
	);

export default PublicRoute;
