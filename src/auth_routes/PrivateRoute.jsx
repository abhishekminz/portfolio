import React from "react";
import { Route, Redirect } from "react-router-dom";

const PrivateRoute = ({ user, component: Comp, ...rest }) =>
	user ? <Route {...rest} component={Comp} /> : <Redirect to="/sign_in" />;

export default PrivateRoute;
