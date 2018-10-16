import React from "react";
import PropTypes from "prop-types";
import Article from "./Article/Article";

class SingleArticleContainer extends React.Component {
	state = {
		article: null,
		loading: true
	};
	async componentWillMount() {
		const article = await this.props.getArticle(this.props.match.params.slug);
		this.setState({ article, loading:false });
	}
	render() {
		return <React.Fragment>
		{
			!this.state.loading &&
			 <Article article={this.state.article} />
		}
		{
			this.state.loading && 
			<p className="text-center">LOADING ...</p>
		}
		</React.Fragment>;
	}
}

SingleArticleContainer.displayName = "SingleArticleContainer";

export default SingleArticleContainer;
