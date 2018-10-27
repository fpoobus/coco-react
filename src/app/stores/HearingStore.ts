import {action, observable} from 'mobx';

class HearingStore {

    @observable hearingDate: Date;

    @action
    public setHearingDate = (hearingDate: Date) => {
        this.hearingDate = hearingDate;
    }
}

export default HearingStore;
