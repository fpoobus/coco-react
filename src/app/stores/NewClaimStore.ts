import { action, computed, observable } from 'mobx';
import NewClaim, { ClaimDocument, DefendantResponse, PersonResponse } from 'app/model/NewClaim';

export class NewClaimStore {

  public static LEGAL = 'legal';
  public static NATURAL = 'natural';

  @observable
  public newClaim: NewClaim;

  @observable
  public openSection: string;

  @observable
  public step: number;

  @observable
  public personResponse: PersonResponse;

  @observable
  public defendantResponse: DefendantResponse;

  @observable
  public defendantRegistryCode: string;

  @observable
  public loading: boolean;

  @observable
  public summaryLoading: boolean;

  @observable
  public nextButtonDisabled: boolean;

  @observable
  public noLegalEntities: boolean;

  @observable
  public attachedFiles: ClaimDocument[];

  constructor() {
    this.step = 0;
    this.attachedFiles = [];
  }

  @action
  reset() {
    this.step = 0;
    this.newClaim = new NewClaim();
    this.openSection = '';
    this.personResponse = null;
    this.defendantResponse = null;
    this.defendantRegistryCode = '';
    this.loading = false;
    this.summaryLoading = false;
    this.nextButtonDisabled = false;
    this.attachedFiles = [];
  }

  @action
  setOpenSection = (section: string) => {
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

  @action
  setDefendant = (defendant: DefendantResponse) => {
    this.defendantResponse = defendant;
  };

  @action
  setPerson = (person: PersonResponse) => {
    this.personResponse = person;
  };

  @computed
  get isLegalSection() {
    return this.openSection === NewClaimStore.LEGAL;
  }

  @computed
  get isNaturalSection() {
    return this.openSection === NewClaimStore.NATURAL;
  }

  @computed
  get isLoading(): boolean {
    return this.loading;
  }

  @action
  nextStep = () => {
    this.step++;
  };

  @action
  previousStep = () => {
    this.nextButtonDisabled = false;
    if (this.step > 0) {
      this.step--;
    }
  };

  @action
  setClaim = (claim: NewClaim) => {
    this.newClaim = claim;
  };

  @action
  setLoading = (loading) => {
    this.loading = loading;
  };

  @action
  setSummaryLoading = (loading) => {
    this.summaryLoading = loading;
  };

  @action
  setDefendantRegistryCode = (code) => {
    this.defendantRegistryCode = code;
  };

  @action
  setNextButtonDisabled = (disabled) => {
    this.nextButtonDisabled = disabled;
  };
}

export default NewClaimStore;
