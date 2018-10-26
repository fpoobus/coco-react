import * as React from 'react';
import {hot} from 'react-hot-loader';
import {Route, Router, Switch} from 'react-router';
import {Root} from 'app/containers/Root';
import {IndexPage} from 'app/pages/IndexPage';
import Dashboard from 'app/containers/Dashboard/dashboard';

import {NewClaimPage} from "app/pages/NewClaimPage";

// render react DOM
export const App = hot(module)(({history}) => (
    <Root>
        <Router history={history}>
            <Switch>
                <Route exact path="/" component={IndexPage}/>
                <Route path="/new-claim" component={NewClaimPage}/>
                <Route path="/testing" component={Dashboard}/>
            </Switch>
        </Router>
    </Root>
));
