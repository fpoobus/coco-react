import {observable, runInAction} from "mobx";


export class AdminPersonProperties {
    personId: string;
    dateOfBirth: string;
    firstName: string;
    lastName: string;
    gender: string;
    addressId: string;
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

    constructor() {
        let form = new AdminFormProperties();

        form.father = new AdminPersonProperties();
        form.mother = new AdminPersonProperties();
        form.child1 = new AdminPersonProperties();
        form.child2 = new AdminPersonProperties();
        form.toMarry = new AdminPersonProperties();
        form.toCompany = new AdminPersonProperties();

        runInAction(() => {
            this.formProps = form;
        })
    }

}

export default AdminStore;
