import * as React from 'react';
import { hot } from 'react-hot-loader';
import { Route, Router, Switch } from 'react-router';
import { Root } from 'app/containers/Root';
import Dashboard from 'app/containers/Dashboard/dashboard';
import { NewClaimPage } from 'app/pages/NewClaimPage';

import Login from 'app/containers/Login/Login';
import CaseForm from 'app/pages/CaseForm/CaseForm';
import Header from 'app/components/Header/Header';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';

export const theme = createMuiTheme({
  palette: {
    primary: { main: '#e8d598', light: '#f4f4f4', dark: '#131b23' },
    secondary: { main: '#6d6160', light: '#e7dfc6', dark: '#816c61' }
  }
});

document.body.style.backgroundColor = theme.palette.primary.light;

// render react DOM
export const App = hot(module)(({ history }) => (

  <MuiThemeProvider theme={theme}>
    <Root>
      <Header />
      <Router history={history}>
        <Switch>
          <Route path="/login" component={Login} />
          <Route exact path="/" component={Dashboard} />
          <Route path="/new-claim" component={NewClaimPage} />
          <Route path="/case" component={CaseForm} />
        </Switch>
      </Router>
    </Root>

  </MuiThemeProvider>
));
