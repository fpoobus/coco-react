import {History} from 'history';
import {RouterStore} from './RouterStore';
import NewClaimStore from 'app/stores/NewClaimStore';
import ClaimsDataStore from 'app/stores/ClaimsDataStore';
import UserStore from 'app/stores/UserStore';
import HearingsDataStore from 'app/stores/HearingsDataStore';
import CaseStore from "app/stores/CaseStore";

export function createStores(history: History) {

    const routerStore = new RouterStore(history);
    return {
        ['routerStore']: routerStore,
        ['userStore']: new UserStore(),
        ['newClaimStore']: new NewClaimStore(),
        ['claimsDataStore']: new ClaimsDataStore(),
        ['hearingsDataStore']: new HearingsDataStore(),
        ['caseStore']: new CaseStore()
    };
}
