import ReactDOM from 'react-dom';
import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';

import Commodities from './components/features/Commodities';

import './index.css';

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Switch>
        <Redirect exact from="/" to="/commodities" />
        <Route exact path="/commodities">
          <Commodities />
        </Route>
      </Switch>
    </Router>
  </Provider>,
  document.getElementById('root')
);

// Hot Module Replacement (HMR) - Remove this snippet to remove HMR.
// Learn more: https://www.snowpack.dev/concepts/hot-module-replacement
if (import.meta.env.MODE !== 'production' && import.meta.hot) {
  import.meta.hot.accept();
}
