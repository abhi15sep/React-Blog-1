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
import Auth from "../Auth";
import RedirectIfAuth from "../RedirectIfAuth";
import UserArticles from "../UserArticles/UserArticles";

class App extends Component {
	state = {
		authUser: null,
		articles: []
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
				this.props.notyService.success("Successfully logged in!");
				this.props.history.push("/");
			}
		);
	};

	removeAuthUser = () => {
		localStorage.removeItem("user");
		this.props.notyService.success("Successfully logged out!");
		this.setState({ authUser: null });
	};

	setArticles = articles => {
		this.setState({ articles });
	};

	render() {
		const { location } = this.props;
		return (
			// hide navbar and footer login and signup page
			<React.Fragment>
				{location.pathname !== "/login" && location.pathname !== "/signup" && (
					<Navbar
						authUser={this.state.authUser}
						removeAuthUser={this.removeAuthUser}
					/>
				)}
				<RedirectIfAuth
					path="/login"
					component={Login}
					props={{
						setAuthUser: this.setAuthUser,
						loginUser: this.props.authService.loginUser
					}}
					isAuthenticated={this.state.authUser !== null}
				/>
				<RedirectIfAuth
					path="/signup"
					component={Signup}
					props={{
						setAuthUser: this.setAuthUser,
						registerUser: this.props.authService.registerUser
					}}
					isAuthenticated={this.state.authUser !== null}
				/>
				<Route
					exact
					path="/"
					render={props => (
						<Welcome
							{...props}
							setArticles={this.setArticles}
							getArticles={this.props.articlesService.getArticles}
						/>
					)}
				/>
				<Auth
					path="/articles/create"
					component={CreateArticle}
					props={{
						getArticleCategories: this.props.articlesService
							.getArticleCategories,
						createArticle: this.props.articlesService.createArticle,
						token: this.state.authUser ? this.state.authUser.token : null,
						notyService: this.props.notyService
					}}
					isAuthenticated={this.state.authUser !== null}
				/>
				<Auth
					path="/user/articles"
					component={UserArticles}
					props={{
						getUserArticles: this.props.articlesService.getUserArticles,
						setArticles: this.setArticles,
						token: this.state.authUser ? this.state.authUser.token : null,
						deleteArticle: this.props.articlesService.deleteArticle
					}}
					isAuthenticated={this.state.authUser !== null}
				/>
				<Auth
					path="/article/edit/:slug"
					component={CreateArticle}
					props={{
						getArticleCategories: this.props.articlesService
							.getArticleCategories,
						createArticle: this.props.articlesService.createArticle,
						token: this.state.authUser ? this.state.authUser.token : null,
						articles: this.state.articles,
						updateArticle: this.props.articlesService.updateArticle
					}}
					isAuthenticated={this.state.authUser !== null}
				/>
				<Route
					path="/article/:slug"
					exact
					render={props => (
						<SingleArticle
							{...props}
							articles={this.state.articles}
							getArticle={this.props.articlesService.getArticle}
						/>
					)}
				/>
				{location.pathname !== "/login" && location.pathname !== "/signup" && (
					<Footer />
				)}
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
	authService: PropTypes.objectOf(PropTypes.func).isRequired,
	articlesService: PropTypes.objectOf(PropTypes.func).isRequired
};
export default App;
