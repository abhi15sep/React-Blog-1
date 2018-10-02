import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { validateAll } from "indicative";
import axios from "axios";
import config from "../../config/index";

class Signup extends React.Component {
	state = {
		name: "",
		email: "",
		password: "",
		password_confirmation: "",
		errors: ""
	};

	handleInputChange = event => {
		this.setState({
			[event.target.name]: event.target.value
		});
	};

	handleFormSubmit = event => {
		event.preventDefault();
		// validation by indicative package
		const data = this.state;
		const rules = {
			name: "required|string",
			email: "required",
			password: "required|string|min:6|max:30|confirmed"
		};
		const messages = {
			required: "This {{field}} is required",
			"password.confirmed": "The password confirmation did not match"
		};
		validateAll(data, rules, messages)
			.then(() => {
				this.setState({ errors: "" });
				axios
					.post(`${config.apiUrl}/auth/register`, {
						name: this.state.name,
						email: this.state.email,
						password: this.state.password
					})
					.then(response => {
						localStorage.setItem('user', JSON.stringify(response.data.data))
						this.props.history.push("/");
					})
					.catch(errors => {
						const formattedErrors = {};
						formattedErrors["email"] = errors.response.data.email[0];
						this.setState({ errors: formattedErrors });
					});
			})
			.catch(errors => {
				//show validation error to user
				const formattedErrors = {};
				errors.forEach(error => (formattedErrors[error.field] = error.message));
				this.setState({ errors: formattedErrors });
			});
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
					<h5 className="text-uppercase text-center">Register</h5>
					<br />
					<br />
					<form className="form-type-material" onSubmit={this.handleFormSubmit}>
						<div className="form-group">
							<input
								name="name"
								onChange={this.handleInputChange}
								type="text"
								className="form-control"
								placeholder="Username"
							/>
							{this.state.errors["name"] && (
								<small className="text-danger">
									{this.state.errors["name"]}
								</small>
							)}
						</div>
						<div className="form-group">
							<input
								name="email"
								onChange={this.handleInputChange}
								type="email"
								className="form-control"
								placeholder="Email address"
							/>
							{this.state.errors["email"] && (
								<small className="text-danger">
									{this.state.errors["email"]}
								</small>
							)}
						</div>
						<div className="form-group">
							<input
								name="password"
								onChange={this.handleInputChange}
								type="password"
								className="form-control"
								placeholder="Password"
							/>
							{this.state.errors["password"] && (
								<small className="text-danger">
									{this.state.errors["password"]}
								</small>
							)}
						</div>
						<div className="form-group">
							<input
								name="password_confirmation"
								onChange={this.handleInputChange}
								type="password"
								className="form-control"
								placeholder="Password (confirm)"
							/>
						</div>
						<br />
						<button
							className="btn btn-bold btn-block btn-primary"
							type="submit"
						>
							Register
						</button>
					</form>
					<hr className="w-30" />
					<p className="text-center text-muted fs-13 mt-20">
						Already have an account?
						<Link to="/login">Sign in</Link>
					</p>
				</div>
			</div>
		);
	}
}

Signup.displayName = "Signup";

Signup.propTypes = {
	className: PropTypes.string
};

export default Signup;
