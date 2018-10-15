import React from "react";
import PropTypes from "prop-types";
import Articles from "./Articles/Articles";

class Welcome extends React.Component {
	state = {
		articles: {}
	};

	async componentWillMount() {
		const articles = await this.props.getArticles();
		this.setState({ articles });
	}
	render() {
		return <Articles articles={this.state.articles.data}/>;
	}
}

Welcome.displayName = "Welcome";

Welcome.propTypes = {
	className: PropTypes.string
};

export default Welcome;
