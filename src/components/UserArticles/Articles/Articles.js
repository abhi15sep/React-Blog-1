import React from "react";
import Banner from "../../Banner/Banner";
import Article from "../../Article/Article";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const Articles = ({
	articles,
	handlePagination,
	nextUrl,
	previousUrl,
	deleteArticle,
	editArticle
}) => {
	return (
		<React.Fragment>
			<Banner
				backgroundImage={`url(${
					process.env.PUBLIC_URL
				}/assets/img/bg-gift.jpg)`}
				title="My Articles"
				paragraph="Here are the articles created by you."
			/>
			<main className="main-content bg-gray">
				<div className="row">
					<div className="col-12 col-lg-6 offset-lg-3">
						{articles &&
							articles.map(article => (
								<div key={article.id}>
									<Article article={article} />
									<div className="text-center">
										<button
											onClick={() => {
												editArticle(article);
											}}
											className="btn btn-info mr-5"
										>
											Edit Article
										</button>
										<button
											onClick={() => deleteArticle(article.id)}
											className="btn btn-danger"
										>
											Delete Article
										</button>
									</div>
									<hr />
								</div>
							))}
						<nav className="flexbox mb-50 mt-50">
							<Link
								className={`btn btn-white ${previousUrl ? "" : "disabled"}`}
								to="#"
								onClick={() => handlePagination(previousUrl)}
							>
								<i className="ti-arrow-left fs-9 ml-4" />
								Previous Page
							</Link>
							<Link
								className={`btn btn-white ${nextUrl ? "" : "disabled"}`}
								to="#"
								onClick={() => handlePagination(nextUrl)}
							>
								Next Page
								<i className="ti-arrow-right fs-9 mr-4" />
							</Link>
						</nav>
					</div>
				</div>
			</main>
		</React.Fragment>
	);
};

Articles.propTypes = {
	articles: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.number.isRequired
		})
	).isRequired,
	handlePagination: PropTypes.func.isRequired,
	nextUrl: PropTypes.string,
	previousUrl: PropTypes.string,
	deleteArticle: PropTypes.func.isRequired,
	editArticle: PropTypes.func.isRequired
};

Articles.defaultProps = {
	articles: [],
	nextUrl: null,
	previousUrl: null
};

export default Articles;
