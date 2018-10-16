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

	handlePagination = async url => {
		const articles = await this.props.getArticles(url);
		this.setState({ articles });
	};

	render() {
		return (
			<Articles
				nextUrl={this.state.articles.next_page_url}
				previousUrl={this.state.articles.prev_page_url}
				handlePagination={this.handlePagination}
				articles={this.state.articles.data}
			/>
		);
	}
}

Welcome.displayName = "Welcome";

Welcome.propTypes = {
	className: PropTypes.string
};

export default Welcome;
