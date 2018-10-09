import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, withRouter } from "react-router-dom";
import registerServiceWorker from "./registerServiceWorker";
import AuthService from "./services/auth";
import App from "./components/App/App";

const Main = withRouter(props => (
	<App authService={new AuthService()} {...props} />
));

ReactDOM.render(
	<BrowserRouter>
		<Main />
	</BrowserRouter>,
	document.getElementById("root")
);
registerServiceWorker();
