import React, { Component } from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import App from 'views/App';
import HomePage from 'views/Home';
import AboutPage from 'views/About';
import BoardPage from 'views/Board';
import AuthPage from 'views/Auth';

import NotFoundPage from 'views/NotFound';

const publicPath = '/';

export const routeCodes = {
  DASHBOARD: publicPath,
  ABOUT: `${ publicPath }about`,
  BOARD: `${ publicPath }board`,
  AUTH: `${ publicPath }auth`,
};

export default class Routes extends Component {
  render() {
    return (
      <Router history={ browserHistory }>
        <Route path={ publicPath } component={ App }>
          <IndexRoute component={ HomePage } />
          <Route path={ routeCodes.DASHBOARD } component={ HomePage } />
          <Route path={ routeCodes.ABOUT } component={ AboutPage } />
          <Route path={ routeCodes.BOARD } component={ BoardPage } />
          <Route path={ routeCodes.AUTH } component={ AuthPage } />

          <Route path='*' component={ NotFoundPage } />
        </Route>
      </Router>
    );
  }
}
