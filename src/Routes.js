import React from "react";
import { Switch, Redirect } from "react-router-dom";

import Admin from "./components/admin";
import Home from "./components/home";
import SignIn from "./components/sign_in";
import NotFound from "./components/not_found";

import PrivateRoute from "./auth_routes/PrivateRoute";
import PublicRoute from "./auth_routes/PublicRoute";

const Routes = (props) => {
	return (
		<Switch>
			<PrivateRoute user={props.user} path="/admin" exact component={Admin} />
			<PublicRoute
				user={props.user}
				restricted={true}
				path="/sign_in"
				exact
				component={SignIn}
			/>
			<PublicRoute
				user={props.user}
				restricted={false}
				path="/not_found"
				exact
				component={NotFound}
			/>
			<PublicRoute
				user={props.user}
				restricted={false}
				path="/"
				exact
				component={Home}
			/>
			<Redirect to="/not_found" />
		</Switch>
	);
};

export default Routes;
