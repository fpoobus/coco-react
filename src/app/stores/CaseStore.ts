import {action, computed, observable} from 'mobx';
import {JudgmentForm} from 'app/model/JudgmentForm';
import cocoAxios from "app/axiosConfig";

const DEBUG = false;

export class CaseStore {
    @observable selectedCaseId: number;
    @observable cases = observable.array<any>();
    @observable hearings = observable.array<any>();
    @observable judge: string;
    @observable loading: boolean;
    @observable isRegisteringSuccess: boolean = false;
    @observable judgmentForm: JudgmentForm = {
        type: 'default',
        sanction: -1,
        description: ''
    };

    @computed
    get casesData(): any[] {
        return Array.from(this.cases.values());
    }

    public async loadCases() {
        this.setLoading(true);
        const response = await cocoAxios.get(`/coco-api/cases`,
            {headers: {'Access-Control-Allow-Origin': '*'}});
        console.log(response);
        this.setCases(response);
        this.setLoading(false);
    }

    @action
    public setCases(response) {
        this.cases.replace(response.data);
    }

    @action setHearings(response){
        this.hearings.replace(response)
    }

    @action
    public setIsRegisteringSuccess = (isRegisteringSuccess: boolean) => {
        this.isRegisteringSuccess = isRegisteringSuccess;
    };

    @action
    public setLoading(loading: boolean): void {
        this.loading = loading;
    }

    @action
    public setJudge(judge: string) {
        if (DEBUG) { console.log('Setting judge' + judge); }
        this.judge = judge;
        this.updateCase();
    }

    @action.bound
    public setJudgmentFormType(type: string) {
        this.judgmentForm.type = type;
    }

    @action.bound
    public setJudgmentFormSanction(sanction: number) {
        this.judgmentForm.sanction = sanction;
    }

    @action.bound
    public setJudgmentFormDescription(description: string) {
        this.judgmentForm.description = description;
    }

    @action.bound
    public setSelectedCaseId(id: number) {
        this.selectedCaseId = id;
    }

    public updateCase() {
        const data = this.casesData.find(c => {
            return c.id === this.selectedCaseId;
        });
        data.judge = this.judge;
        cocoAxios.put('/coco-api/cases/' + this.selectedCaseId, data)
            .then(res => {
            })
            .catch(error => {
                console.log(error)
            })
    };

}

export default CaseStore;
