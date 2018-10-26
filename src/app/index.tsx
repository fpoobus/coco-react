import * as React from 'react';
import { hot } from 'react-hot-loader';
import { Route, Router, Switch } from 'react-router';
import { Root } from 'app/containers/Root';
import Dashboard from 'app/containers/Dashboard/dashboard';
import { NewClaimPage } from 'app/pages/NewClaimPage';
import CaseForm from 'app/pages/CaseForm/CaseForm';
import CaseForm from 'app/containers/CaseForm/caseForm';

import Login from 'app/containers/Login/Login';

// render react DOM
export const App = hot(module)(({ history }) => (
  <Root>
    <Router history={history}>
      <Switch>
        <Route exact path="/" component={IndexPage} />
        <Route path="/testing" component={Dashboard} />
        <Route path="/login" component={Login} />
        <Route exact path="/" component={Dashboard} />
        <Route path="/new-claim" component={NewClaimPage} />
        <Route path="/case" component={CaseForm} />
      </Switch>
    </Router>
  </Root>
));
