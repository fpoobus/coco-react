import { action, computed, observable } from 'mobx';

class ClaimsDataStore {

  @observable
  hasClaims: boolean = false;

  @computed
  get hasAnyClaims() {
    return this.hasClaims;
  }

  @action.bound
  setHasClaims = (hasClaims: boolean) => {
    this.hasClaims = hasClaims;
  };
}


export default ClaimsDataStore;
