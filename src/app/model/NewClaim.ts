export default class NewClaim {
    naturalPerson: NaturalPerson;
    legalPerson: LegalPerson;
    defendant: Defendant;
    claim: Claim;
    documents: ClaimDocument[];
    fee: Fee;

    constructor() {
        this.documents = [];
        this.claim = new Claim();
        this.defendant = new Defendant();
        this.naturalPerson = new NaturalPerson();
        this.legalPerson = new LegalPerson();
        this.fee = new Fee();
    }

    static fromJson(json) {
        const claim = new NewClaim();
        console.log(json);
        console.log(JSON.parse(json));
        json = JSON.parse(json);
        claim.naturalPerson = NaturalPerson.fromJson(json['naturalPerson']);
        claim.legalPerson = LegalPerson.fromJson(json['legalPerson']);
        claim.defendant = LegalPerson.fromJson(json['defendant']);
        claim.claim = Claim.fromJson(json['claim']);

        if (json && json['documents']) {
            json['documents'].map(item => {
                claim.documents.push(ClaimDocument.fromJson(item));
            });
        }

        claim.fee = Fee.fromJson(json['fee']);
        console.log("Claim from JSON", claim);
        return claim;
    }
}

export class Defendant {
    registryCode: string;

    static fromJson(json) {
        const defendant = Object.assign(new Defendant(), json);
        return defendant;
    }

}

export class LegalPerson {
    name: string;
    registry_code: string;
    representatives: Representative[];

    static fromJson(json) {
        const person = Object.assign(new LegalPerson(), json);

        if (json && json['representatives']) {
            person.representatives = json['representatives'].map(Representative.fromJson);
        }
        return person;
    }

}


export class NaturalPerson {
    first_name: string;
    middle_names: string;
    last_name: string;
    date_of_birth: string;
    address: string;
    email_address: string;

    static fromJson(json) {
        return Object.assign(new NaturalPerson(), json);
    }
}

export class Representative {
    name: string;
    role: string;

    static fromJson(json) {
        return Object.assign(new Representative(), json);
    }
}

export class Claim {
    case_type: string;
    description: string;
    value: string;
    state_fee: string;

    static fromJson(json) {
        return Object.assign(new Claim(), json);
    }

}

export class ClaimDocument {
    name: string;
    added_by: string;
    modified: string;

    static fromJson(json) {
        return Object.assign(new ClaimDocument(), json);
    }
}

export class Fee {
    card_number: string;
    expiration_date: string;
    cw: string;
    card_owner: string;
    fee: string;

    static fromJson(json) {
        console.log("Fee", json);
        let fee = Object.assign(new Fee(), json);
        console.log(fee);
        return fee;
    }
}


export class PersonResponse {
    personId: string;
    legalEntities: LegalEntityResponse[];
    firstName?: string;
    lastName?: string;

    static fromJson(json) {
        const person = Object.assign(new PersonResponse(), json);
        console.log(json);
        person.legalEntities = json['legalEntities'].map(LegalEntityResponse.fromJson);
        return person;
    }

}

export class LegalEntityResponse {
    entityId: string;
    registryCode: string;
    name: string;

    static fromJson(json) {
        return Object.assign(new LegalEntityResponse(), json);
    }
}


export class DefendantResponse {
    registryCode: string;
    name: string;
    activities: string[];

    static fromJson(json) {
        return Object.assign(new DefendantResponse(), json);
    }
}