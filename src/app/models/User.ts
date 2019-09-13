export default class User {
    firstName?: string;
    lastName?: string;
    personalCode: string;
    password?: string;

    userFromRaw(rawUser: RawUser) {
        this.firstName = rawUser.givenName;
        this.lastName = rawUser.familyName;
        this.personalCode = rawUser.code;
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
