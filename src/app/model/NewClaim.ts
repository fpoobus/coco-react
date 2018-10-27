export default class NewClaim {
  naturalPerson: NaturalPerson;
  legalPerson: LegalPerson;
  claim: Claim;
  documents: Document[];
  fee: Fee;

  constructor() {
    this.documents = [];
    this.claim = new Claim();
    this.naturalPerson = new NaturalPerson();
    this.legalPerson = new LegalPerson();
    this.fee = new Fee();
  }
}

export class LegalPerson {
  name: string;
  registry_code: string;
  representatives: Representative[];
}


export class NaturalPerson {
  first_name: string;
  middle_names: string;
  last_name: string;
  date_of_birth: string;
  address: string;
  email_address: string;
}

export class Representative {
  name: string;
  role: string;
}

export class Claim {
  case_type: string;
  description: string;
  value: string;
  state_fee: string;
}

export class Document {
  name: string;
  added_by: string;
  modified: string;
}

export class Fee {
  card_number: string;
  expiration_date: string;
  cw: string;
  card_owner: string;
  fee: string;
}


export class PersonResponse {
  personId: string;
  legalEntities: LegalEntityResponse[];

  static fromJson(json) {
    const person = Object.assign(new PersonResponse(), json);
    person.legalEntities = json['legalEntities'].map(LegalEntityResponse.fromJson);
    return person;
  }

}

export class LegalEntityResponse {
  entityId: string;
  name: string;

  static fromJson(json) {
    return Object.assign(new LegalEntityResponse(), json);
  }
}
