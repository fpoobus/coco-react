import * as React from 'react';
import { hot } from 'react-hot-loader';
import { Route, Router, Switch } from 'react-router';
import { Root } from 'app/containers/Root';
import Dashboard from 'app/containers/Dashboard/dashboard';
import { NewClaimPage } from 'app/pages/NewClaimPage';

import Login from 'app/containers/Login/Login';
import CaseForm from 'app/pages/CaseForm/CaseForm';

import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import {NewClaimPaymentCompletePage} from "app/pages/NewClaimPaymentCompletePage";
import JudgmentForm from 'app/components/JudgmentForm/JudgmentForm';

export const theme = createMuiTheme({
  palette: {
    primary: { main: '#e8d598', light: '#f4f4f4', dark: '#e8d081' },
    secondary: { main: '#6d6160', light: '#e7dfc6', dark: '#816c61' }
  }
});

document.body.style.backgroundColor = theme.palette.primary.light;

// render react DOM
export const App = hot(module)(({ history }) => (

  <MuiThemeProvider theme={theme}>
    <Root>
      <Router history={history}>
        <Switch>
          <Route path="/login" component={Login} />
          <Route exact path="/" component={Dashboard} />
            <Route exact path="/new-claim" component={NewClaimPage} />
            <Route exact path="/new-claim/payment-complete" component={NewClaimPaymentCompletePage} />
          <Route path="/case" component={CaseForm} />
          <Route path="/judgment-form" component={JudgmentForm} />
        </Switch>
      </Router>
    </Root>

  </MuiThemeProvider>
));
