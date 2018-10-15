import React from "react";
import PropTypes from "prop-types";
import CreateArticleForm from "./CreateArticleForm/CreateArticleForm";

class CreateArticle extends React.Component {
	state = {
		title: "",
		image: null,
		content: "",
		category: null,
		errors: [],
		categories: []
	};

	handleSubmit = async event => {
		event.preventDefault();
		try {
			const article = await this.props.createArticle(this.state, this.props.token);
			this.props.history.push("/");
		} catch (errors) {
			this.setState({ errors });
		}
	};

	handleInputChange = event => {
		this.setState({
			[event.target.name]:
				event.target.type === "file"
					? event.target.files[0]
					: event.target.value
		});
	};

	async componentWillMount() {
		const categories = await this.props.getArticleCategories();
		this.setState({
			categories
		});
	}

	render() {
		return (
			<CreateArticleForm
				handleInputChange={this.handleInputChange}
				categories={this.state.categories}
				handleSubmit={this.handleSubmit}
				errors={this.state.errors}
			/>
		);
	}
}

CreateArticle.displayName = "CreateArticle";

CreateArticle.propTypes = {
	getArticleCategories: PropTypes.func.isRequired,
	createArticle: PropTypes.func.isRequired,
	token: PropTypes.string.isRequired
};

export default CreateArticle;
