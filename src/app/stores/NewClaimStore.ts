import {observable, action, computed} from "mobx";
import NewClaim, {PersonResponse} from "app/model/NewClaim";

export class NewClaimStore {

    public static LEGAL = 'legal';
    public static NATURAL = 'natural';

    @observable
    public newClaim: NewClaim;

    @observable
    public openSection: String;

    @observable
    public step: number;

    @observable
    public personResponse: PersonResponse;

    constructor() {
        this.step = 0;
    }

    @action
    setOpenSection = (section: String) => {
        this.openSection = section;
    };

    @action
    setOpenSectionLegal = () => {
        this.openSection = NewClaimStore.LEGAL;
    };

    @action
    setOpenSectionNatural = () => {
        this.openSection = NewClaimStore.NATURAL;
    };

    @computed
    get isLegalSection() {
      return this.openSection === NewClaimStore.LEGAL;
    }

    @computed
    get isNaturalSection() {
        return this.openSection === NewClaimStore.NATURAL;
    }

    @action
    nextStep = () => {
        this.step++;
    };

    @action
    previousStep = () => {
        if(this.step > 0) {
            this.step--;
        }
    };

    @action
    setClaim = (claim: NewClaim) => {
        this.newClaim = claim;
    };
}

export default NewClaimStore;
