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
}

export class AdminFormProperties {
    father: AdminPersonProperties;
    mother: AdminPersonProperties;
    child1: AdminPersonProperties;
    child2: AdminPersonProperties;
    toMarry: AdminPersonProperties;
    toCompany: AdminPersonProperties
}

export class AdminStore {
    @observable
    public formProps: AdminFormProperties;

    @observable
    public queryLoading: boolean;

    constructor() {
        let form = new AdminFormProperties();

        form.father = new AdminPersonProperties();
        form.father.gender = "MALE";
        form.father.dateOfBirth = "1980-05-09T21:00:00.000Z";

        form.mother = new AdminPersonProperties();
        form.mother.gender = "FEMALE";
        form.mother.dateOfBirth = "1980-05-09T21:00:00.000Z";

        form.child1 = new AdminPersonProperties();
        form.child1.gender = "MALE";
        form.child1.dateOfBirth = "2011-05-05T11:01:00";
        form.child1.day = "2011-05-05T21:00:00.000Z";

        form.child2 = new AdminPersonProperties();
        form.child2.gender = "MALE";
        form.child2.dateOfBirth = "2000-05-05T11:01:00";
        form.child2.day = "2000-05-05T21:00:00.000Z";

        form.toMarry = new AdminPersonProperties();
        form.toMarry.gender = "FEMALE";
        form.toMarry.dateOfBirth = "1980-05-09T21:00:00.000Z";

        form.toCompany = new AdminPersonProperties();
        form.toCompany.gender = "MALE";
        form.toCompany.dateOfBirth = "1980-05-09T21:00:00.000Z";

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
