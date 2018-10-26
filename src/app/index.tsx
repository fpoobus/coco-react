import * as React from 'react';
import { hot } from 'react-hot-loader';
import { Route, Router, Switch } from 'react-router';
import { Root } from 'app/containers/Root';
import { IndexPage } from 'app/pages/IndexPage';
import Dashboard from 'app/containers/Dashboard/dashboard';
import CaseForm from 'app/containers/CaseForm/caseForm';


// render react DOM
export const App = hot(module)(({ history }) => (
  <Root>
    <Router history={history}>
      <Switch>
        <Route exact path="/" component={IndexPage} />
        <Route path="/testing" component={Dashboard} />
        <Route path="/case" component={CaseForm} />
      </Switch>
    </Router>
  </Root>
));
