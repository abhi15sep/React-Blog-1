import React, { Component } from "react";
import PropTypes from "prop-types";
import Navbar from "../Navbar/Navbar";
import { Route } from "react-router-dom";
import Login from "../Login/Login";
import Signup from "../Signup/Signup";
import Welcome from "../Welcome/Welcome";
import SingleArticle from "../SingleArticle/SingleArticle";
import CreateArticle from "../CreateArticle/CreateArticle";
import Footer from "../Footer/Footer";

class App extends Component {
	state = {
		authUser: null
	};
	componentWillMount() {
		const user = localStorage.getItem("user");
		if (user) {
			this.setState({ authUser: JSON.parse(user) });
		}
	}
	setAuthUser = authUser => {
		this.setState(
			{
				authUser
			},
			() => {
				localStorage.setItem("user", JSON.stringify(authUser));
				this.props.history.push("/");
			}
		);
	};
	render() {
		const { location } = this.props;
		return (
			// hide navbar and footer login and signup page
			<React.Fragment>
				{location.pathname !== "/login" &&
					location.pathname !== "/signup" && (
						<Navbar authUser={this.state.authUser} />
					)}
				<Route
					path="/login"
					render={props => (
						<Login
							{...props}
							setAuthUser={this.setAuthUser}
							loginUser={this.props.authService.loginUser}
						/>
					)}
				/>
				<Route
					path="/signup"
					render={props => (
						<Signup
							{...props}
							registerUser={this.props.authService.registerUser}
							setAuthUser={this.setAuthUser}
						/>
					)}
				/>
				<Route
					exact
					path="/"
					render={props => (
						<Welcome
							{...props}
							getArticles={this.props.articlesService.getArticles}
						/>
					)}
				/>
				<Route
					path="/articles/create"
					render={props => (
						<CreateArticle
							{...props}
							getArticleCategories={
								this.props.articlesService.getArticleCategories
							}
							createArticle={this.props.articlesService.createArticle}
							token={this.state.authUser.token}
						/>
					)}
				/>
				<Route
					path="/article/:slug"
					render={props => (
						<SingleArticle
							{...props}
							getArticle={this.props.articlesService.getArticle}
						/>
					)}
				/>
				{location.pathname !== "/login" &&
					location.pathname !== "/signup" && <Footer />}
			</React.Fragment>
		);
	}
}

App.displayName = "App";

App.propTypes = {
	location: PropTypes.shape({
		pathname: PropTypes.string.isRequired
	}).isRequired,
	history: PropTypes.shape({
		push: PropTypes.func.isRequired
	}).isRequired,
	authService: PropTypes.objectOf(PropTypes.func).isRequired
};
export default App;
