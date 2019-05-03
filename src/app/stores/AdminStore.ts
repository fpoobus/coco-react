import {action, observable, runInAction} from "mobx";


export class AdminPersonProperties {
    personId: string;
    dateOfBirth: string;
    day: string;
    firstName: string;
    lastName: string;
    gender: string;
    addressId: string;
    motherId: string;
    fatherId: string;
    weight: string;
    height: string;
    groomId: string;
    brideId: string;
    marriageDate: string;
    sureName: string;

    constructor() {

        this.personId = "";
        this.dateOfBirth = "";
        this.day = "";
        this.firstName = "";
        this.lastName = "";
        this.gender = "";
        this.addressId = "";
        this.motherId = "";
        this.fatherId = "";
        this.weight = "";
        this.height = "";
        this.groomId = "";
        this.brideId = "";
        this.marriageDate = "";
        this.sureName = "";

    }

}

export class AdminFormProperties {
    father: AdminPersonProperties;
    mother: AdminPersonProperties;
    child1: AdminPersonProperties;
    child2: AdminPersonProperties;
    toMarry: AdminPersonProperties;
    toCompany: AdminPersonProperties;

    constructor() {

        this.father = new AdminPersonProperties();
        this.father.gender = "MALE";
        this.father.dateOfBirth = "1980-05-09T21:00:00.00";
        this.mother = new AdminPersonProperties();
        this.mother.gender = "FEMALE";
        this.mother.dateOfBirth = "1980-05-09T21:00:00.00";
        this.child1 = new AdminPersonProperties();
        this.child1.gender = "MALE";
        this.child1.dateOfBirth = "2011-05-05T11:01:00";
        this.child1.day = "2011-05-05T21:00:00.00";
        this.child2 = new AdminPersonProperties();
        this.child2.gender = "MALE";
        this.child2.dateOfBirth = "2000-05-05T11:01:00";
        this.child2.day = "2000-05-05T21:00:00.00";
        this.toMarry = new AdminPersonProperties();
        this.toMarry.gender = "FEMALE";
        this.toMarry.dateOfBirth = "1980-05-09T21:00:00.00";
        this.toCompany = new AdminPersonProperties();
        this.toCompany.gender = "MALE";
        this.toCompany.dateOfBirth = "1980-05-09T21:00:00.00";
    }

}

export class AdminStore {
    @observable
    public formProps: AdminFormProperties;

    @observable
    public queryLoading: boolean;

    constructor() {
        let form = new AdminFormProperties();

        console.log(form);


        runInAction(() => {
            this.formProps = form;
            this.queryLoading = false;
        })
    }

    @action
    public setLoading(loading) {
        this.queryLoading = loading;
    }
}

export default AdminStore;
