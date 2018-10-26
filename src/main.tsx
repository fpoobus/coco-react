import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { configure } from 'mobx';
import { Provider } from 'mobx-react';
import { createBrowserHistory } from 'history';
import { createStores } from 'app/stores/createStore';
import { App } from 'app';

// enable MobX strict mode
configure({
  enforceActions: true
});

// prepare MobX stores
const history = createBrowserHistory();
const rootStore = createStores(history);

// render react DOM
ReactDOM.render(
  <Provider {...rootStore}>
    <App history={history} />
  </Provider>,
  document.getElementById('root')
);
