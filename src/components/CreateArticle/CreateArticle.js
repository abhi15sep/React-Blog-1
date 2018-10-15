import React from "react";
import PropTypes from "prop-types";
import CreateArticleForm from "./CreateArticleForm/CreateArticleForm";

class CreateArticle extends React.Component {
	state = {
		title: "",
		image: null,
		content: "",
		category: 0,
		errors: {},
		categories: []
	};

	handleSubmit = async event => {
		event.preventDefault();
		await this.props.createArticle(this.state);
	};

	handleInputChange = event => {
		console.log(event.target.files);
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
			/>
		);
	}
}

CreateArticle.displayName = "CreateArticle";

CreateArticle.propTypes = {
	className: PropTypes.string
};

export default CreateArticle;
