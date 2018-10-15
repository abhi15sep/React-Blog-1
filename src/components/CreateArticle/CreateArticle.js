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
		categories:[],
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
			categories:categories
		})
	}

	render() {
		return <CreateArticleForm 
		handleInputChange={this.handleInputChange}
		categories={this.state.categories} />;
	}
}

CreateArticle.displayName = "CreateArticle";

CreateArticle.propTypes = {
	className: PropTypes.string
};

export default CreateArticle;
