import { validateAll } from "indicative";
import axios from "axios";
import config from "../config/index";

export default class AuthService {
	async registerUser(data) {
		// validation by indicative package
		const rules = {
			name: "required|string",
			email: "required",
			password: "required|string|min:6|max:30|confirmed"
		};
		const messages = {
			required: "This {{field}} is required",
			"password.confirmed": "The password confirmation did not match"
		};

		try {
			await validateAll(data, rules, messages);
			const response = await axios.post(`${config.apiUrl}/auth/register`, {
				name: data.name,
				email: data.email,
				password: data.password
			});
			return response.data.data;
		} catch (errors) {
			const formattedErrors = {};
			if (errors.state === 422) {
				formattedErrors["email"] = errors.response.data.email[0];
				return Promise.reject(formattedErrors);
			}
			errors.forEach(error => (formattedErrors[error.field] = error.message));
			return Promise.reject(formattedErrors);
		}
	}
}
