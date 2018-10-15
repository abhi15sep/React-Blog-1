import React from "react";
import PropTypes from "prop-types";
import Banner from "../../Banner/Banner";

const CreateArticleForm = ({
	handleInputChange,
	categories,
	handleSubmit,
	errors
}) => {
	return (
		<React.Fragment>
			<Banner
				backgroundImage={`url(${
					process.env.PUBLIC_URL
				}/assets/img/bg-laptop.jpg)`}
				title="Write an article"
			/>
			<main className="main-content">
				<section className="section">
					<div className="container">
						<div className="row">
							<div className="col-12 col-lg-12">
								<ul className="list-group">
									{errors.map((error, i) => (
										<li key={i} className="list-group-item text-danger">
											{error.message}
										</li>
									))}
								</ul>
								<form className="p-30 bg-gray rounded" onSubmit={handleSubmit}>
									<div className="row">
										<div className="form-group col-md-12 my-5">
											<input
												name="image"
												type="file"
												className="form-control"
												onChange={handleInputChange}
											/>
										</div>
										<div className="form-group col-12 col-md-6">
											<input
												onChange={handleInputChange}
												className="form-control form-control-lg"
												type="text"
												name="title"
												placeholder="Title"
											/>
										</div>
										<div className="form-group col-12 col-md-6">
											<select
												name="category"
												onChange={handleInputChange}
												className="form-control form-control-lg"
											>
												<option value>Select category</option>
												{categories.map(category => {
													return (
														<option key={category.id} value={category.id}>
															{category.name}
														</option>
													);
												})}
											</select>
										</div>
									</div>
									<div className="form-group">
										<textarea
											className="form-control form-control-lg"
											rows={4}
											placeholder="Content"
											name="content"
											defaultValue={""}
											onChange={handleInputChange}
										/>
									</div>
									<div className="text-center">
										<button className="btn btn-lg btn-primary" type="submit">
											Create Article
										</button>
									</div>
								</form>
							</div>
						</div>
					</div>
				</section>
			</main>
		</React.Fragment>
	);
};

CreateArticleForm.displayName = "CreateArticleForm";

CreateArticleForm.propTypes = {
	handleInputChange: PropTypes.func.isRequired
};

export default CreateArticleForm;
