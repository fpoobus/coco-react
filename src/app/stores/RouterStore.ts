import { History } from 'history';
import { RouterStore as BaseRouterStore, syncHistoryWithStore } from 'mobx-react-router';
import { action, observable } from 'mobx';

export class RouterStore extends BaseRouterStore {
  @observable currentTab: string;

  constructor(history?: History) {
    super();
    this.currentTabMapper();
    if (history) {
      this.history = syncHistoryWithStore(history, this);
    }
  }

  @action
  currentTabMapper() {
    const path = window.location.pathname;
    if (path === '/') {
      this.currentTab = 'dashboard';
    }
    else if (path === '/new-claim') {
      this.currentTab = 'newClaim';
    }
  }

  @action
  public setCurrentTab(tab: string) {
    this.currentTab = tab;
  }

}

export default RouterStore;
