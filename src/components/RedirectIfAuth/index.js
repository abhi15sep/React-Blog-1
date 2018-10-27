import React from "react";
import PropTypes from "prop-types";
import { Route, Redirect } from "react-router-dom";

const RedirectIfAuth = ({ path, props, component: Component, isAuthenticated }) => {
	return (
		<Route
			path={path}
			render={routerProps => {
				if (!isAuthenticated) {
					return <Component {...props} {...routerProps} />;
				}
				return <Redirect to="/" />;
			}}
		/>
	);
};

RedirectIfAuth.displayName = "RedirectIfAuth";

RedirectIfAuth.propTypes = {
	className: PropTypes.string
};

export default RedirectIfAuth;
