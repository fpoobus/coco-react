import { observable, action } from "mobx";

export class DemoStore {

  @observable
  public test: String;

  @action
  setTest = (test: String) => {
    this.test = test;
  };

}

export default DemoStore;
