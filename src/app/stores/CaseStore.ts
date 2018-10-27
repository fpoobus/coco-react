import { action, computed, observable } from 'mobx';
import axios from 'axios';
import { JudgmentForm } from 'app/model/JudgmentForm';

export class CaseStore {
  @observable cases = observable.array<any>();
  @observable judgmentForm: JudgmentForm = {
    type: 'default',
    sanction: -1
  };

  @computed
  get casesData(): any[] {
    return Array.from(this.cases.values());
  }

  public async loadCases() {
    const response = await axios.get(`http://139.59.148.64/coco-api/cases`,
      { headers: { 'Access-Control-Allow-Origin': '*' } });
    console.log(response);
    this.setCases(response);
  }

  @action
  public setCases(response) {
    this.cases.replace(response.data);
  }

  @action.bound
  public setJudgmentFormType(type: string) {
    this.judgmentForm.type = type;
  }

  @action.bound
  public setJudgmentFormSanction(sanction: number) {
    this.judgmentForm.sanction = sanction;
  }
}

export default CaseStore;
