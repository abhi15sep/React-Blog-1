import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

class Login extends React.Component {
	state = {
		email: "",
		password: "",
		errors: ""
	};

	handleInputChange = event => {
		this.setState({
			[event.target.name]: event.target.value
		});
	};

	handleSubmit = async event => {
		event.preventDefault();
		try {
			const user = await this.props.loginUser(this.state);
			localStorage.setItem("user", JSON.stringify(user));
			this.props.setAuthUser(user);
			this.props.history.push("/");
		} catch (errors) {
			this.setState({ errors });
		}
	};

	render() {
		return (
			<div
				className="mh-fullscreen bg-img center-vh p-20"
				style={{
					backgroundImage: `url(${
						process.env.PUBLIC_URL
					}/assets/img/bg-girl.jpg)`
				}}
			>
				<div
					className="card card-shadowed p-50 w-400 mb-0"
					style={{ maxWidth: "100%" }}
				>
					<h5 className="text-uppercase text-center">Login</h5>
					<br />
					<br />
					<form onSubmit={this.handleSubmit}>
						<div className="form-group">
							<input
								name="email"
								type="text"
								className="form-control"
								placeholder="Username"
								onChange={this.handleInputChange}
							/>
						</div>
						<div className="form-group">
							<input
								name="password"
								type="password"
								className="form-control"
								placeholder="Password"
								onChange={this.handleInputChange}
							/>
						</div>
						<div className="form-group flexbox py-10">
							<label className="custom-control custom-checkbox">
								<input
									type="checkbox"
									className="custom-control-input"
									defaultChecked
								/>
								<span className="custom-control-indicator" />
								<span className="custom-control-description">Remember me</span>
							</label>
							<Link className="text-muted hover-primary fs-13" to="#">
								Forgot password?
							</Link>
						</div>
						<div className="form-group">
							<button
								className="btn btn-bold btn-block btn-primary"
								type="submit"
							>
								Login
							</button>
						</div>
					</form>
					<hr className="w-30" />
					<p className="text-center text-muted fs-13 mt-20">
						Don't have an account? <Link to="/signup">Sign up</Link>
					</p>
				</div>
			</div>
		);
	}
}

Login.displayName = "Login";

Login.propTypes = {
	className: PropTypes.string
};

export default Login;
