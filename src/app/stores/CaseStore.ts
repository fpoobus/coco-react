import {action, computed, observable} from "mobx";
import axios from "axios";

export class CaseStore {
    @observable cases = observable.array<any>();

    @computed
    get casesData(): any[] {
        return Array.from(this.cases.values());
    }

    public async loadCases() {
        const response = await axios.get(`http://139.59.148.64/coco-api/cases`,
            {headers: {'Access-Control-Allow-Origin': '*'}});
        console.log(response);
        this.setCases(response);
    }

    @action
    public setCases(response) {
        this.cases.replace(response.data)
    }
}

export default CaseStore;
