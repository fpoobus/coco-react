import { DemoStore } from './DemoStore';
import { History } from 'history';
import { RouterStore } from './RouterStore';
import NewClaimStore from 'app/stores/NewClaimStore';
import ClaimsDataStore from 'app/stores/ClaimsDataStore';

export function createStores(history: History) {

  const routerStore = new RouterStore(history);
  return {
    ['routerStore']: routerStore,
    ['demoStore']: new DemoStore(),
    ['newClaimStore']: new NewClaimStore(),
    ['claimsDataStore']: new ClaimsDataStore()
  };
}
