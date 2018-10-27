import * as React from 'react';
import {hot} from 'react-hot-loader';
import {Route, Router, Switch} from 'react-router';
import {Root} from 'app/containers/Root';
import Dashboard from 'app/containers/Dashboard/dashboard';
import {NewClaimPage} from 'app/pages/NewClaimPage';

import Login from 'app/containers/Login/Login';
import CaseForm from "app/pages/CaseForm/CaseForm";
import Hearing from 'app/containers/HearingForm/HearingForm'

// render react DOM
export const App = hot(module)(({ history }) => (
  <Root>
    <Router history={history}>
      <Switch>
        <Route path="/testing" component={Dashboard} />
        <Route path="/login" component={Login} />
        <Route exact path="/" component={Dashboard} />
        <Route path="/new-claim" component={NewClaimPage} />
        <Route path="/case" component={CaseForm} />
        <Route path="/hearing" component={Hearing} />
      </Switch>
    </Router>
  </Root>
));
