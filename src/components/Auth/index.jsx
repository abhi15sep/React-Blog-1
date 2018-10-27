import React from "react";
import PropTypes from "prop-types";
import { Route, Redirect } from "react-router-dom";

const Auth = ({ path, props, component: Component, isAuthenticated }) => {
	return (
		<Route
			path={path}
			render={routerProps => {
				if (isAuthenticated) {
					return <Component {...props} {...routerProps} />;
				}
				return <Redirect to="/login" />;
			}}
		/>
	);
};

Auth.displayName = "Auth";

Auth.propTypes = {
	className: PropTypes.string
};

export default Auth;
