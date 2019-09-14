import {PersonResponse} from "app/model/NewClaim";

export enum ROLES {
    JUDGE = "JUDGE",
    CLERK = "CLERK",
    USER = "USER"
}

export default class User {
    firstName?: string;
    middleName?: string;
    lastName?: string;
    personalCode: string;
    password?: string;
    role: string ;

    constructor() {
        this.role = ROLES.USER;
    }

    userFromPersonResponse(personResponse: PersonResponse) {
        this.firstName = personResponse.firstName;
        this.lastName = personResponse.lastName;
        this.personalCode = personResponse.personId;
        return this;
    };
};

export class RawUser {
    givenName?: string;
    middleNames?: string[];
    familyName: string;
    sex?: string;
    addressId?: string;
    birthday?: string;
    code: string;
    email: string;
};
