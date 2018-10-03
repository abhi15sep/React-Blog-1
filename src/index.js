import React from "react";
import ReactDOM from "react-dom";
import Navbar from "./components/Navbar/Navbar";
import Login from "./components/Login/Login";
import SingleArticle from "./components/SingleArticle/SingleArticle";
import Footer from "./components/Footer/Footer";
import Signup from "./components/Signup/Signup";
import { BrowserRouter, Route, withRouter } from "react-router-dom";
import registerServiceWorker from "./registerServiceWorker";
import Welcome from "./components/Welcome/Welcome";
import CreateArticle from "./components/CreateArticle/CreateArticle";
import AuthService from "./services/auth";

class App extends React.Component {
	state = {
		authUser: null
	};
	componentDidMount() {
		const user = localStorage.getItem("user");
		if (user) {
			this.setState({ authUser: JSON.parse(user) });
		}
	}
	setAuthUser = authUser => {
		this.setState({
			authUser
		});
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
				<Route path="/login" component={Login} />
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
				<Route exact path="/" component={Welcome} />
				<Route path="/articles/create" component={CreateArticle} />
				<Route path="/article/:slug" component={SingleArticle} />
				{location.pathname !== "/login" &&
					location.pathname !== "/signup" && <Footer />}
			</React.Fragment>
		);
	}
}

const Main = withRouter(props => (
	<App authService={new AuthService()} {...props} />
));

ReactDOM.render(
	<BrowserRouter>
		<Main />
	</BrowserRouter>,
	document.getElementById("root")
);
registerServiceWorker();
