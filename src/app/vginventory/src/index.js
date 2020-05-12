import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter as Router } from 'react-router-dom';

import { Auth0Provider } from "./react-auth0-spa";
import history from "./utils/history";

// styles
//import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/bootstrap.min.css';
import './styles/paper-kit.css';
// import "assets/css/paper-kit.min.css";
// import "assets/css/paper-kit.css.map";
import './styles/demo.css';

// A function that routes the user to the right place
// after login
const onRedirectCallback = appState => {
  history.push(
    appState && appState.targetUrl
      ? appState.targetUrl
      : window.location.pathname
  );
};


ReactDOM.render(
    <Auth0Provider
        domain={process.env.REACT_APP_AUTH_DOMAIN}
        client_id={process.env.REACT_APP_AUTH_CLIENT_ID}
        redirect_uri={window.location.origin}
        onRedirectCallback={onRedirectCallback}
        cacheLocation='localstorage'>

        <Router>
            <App />
        </Router>

    </Auth0Provider>, 
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
