import * as React from 'react';
import {inject, observer} from 'mobx-react';
import NewClaimStore from 'app/stores/NewClaimStore';
import TextField from '@material-ui/core/TextField';
import {reaction, runInAction} from 'mobx';
import {LegalEntityResponse, NaturalPerson, PersonResponse} from 'app/model/NewClaim';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import UserStore from 'app/stores/UserStore';
import Divider from '@material-ui/core/Divider';
import cocoAxios from "app/axiosConfig";
import {AxiosResponse} from "axios";

export interface ClaimantProps {
  newClaimStore: NewClaimStore,
  userStore?: UserStore,
  person?: PersonResponse;
}

export interface ClaimantState {
  /* empty */
}


@inject('userStore')
@observer
export class Claimant extends React.Component<ClaimantProps, ClaimantState> {

  disposer = null;

  state = {
    value: '',
    naturalPerson: {
      first_name: '',
      last_name: '',
      address: '',
      date_of_birth: '',
      personId: ''
    } as NaturalPerson,
  };

  handleRadioChange = event => {
    console.log('Setting value to ' + event.target.value);
    this.setState({ value: event.target.value });
  };

  componentDidMount() {
    this.prefillUser();
    this.disposer = reaction(() => this.props.userStore.user, (change) => {
      cocoAxios.get(`/coco-api/persons/` + this.props.userStore.personalCode, {
        headers: { 'Access-Control-Allow-Origin': '*' }
      }).then((res: AxiosResponse<PersonResponse>) => {
        this.props.newClaimStore.setPerson(res.data);
        this.prefillUser();
      }).finally(() => {
      });
    });
  }

  componentWillUnmount(): void {
    this.disposer();
  }

  prefillUser() {
    if (this.props.newClaimStore.personResponse) {
      this.setPerson(this.props.newClaimStore.personResponse);
    }
  }

  private setPerson(person: PersonResponse) {
    console.log(person);
    runInAction(() => {
      this.props.newClaimStore.personResponse = person;
      this.state.value = this.props.newClaimStore.newClaim.legalPerson.registry_code;
      this.props.newClaimStore.newClaim.naturalPerson = {
        first_name: this.props.newClaimStore.personResponse.firstName,
        last_name: this.props.newClaimStore.personResponse.lastName,
        address: this.props.newClaimStore.personResponse.address,
        date_of_birth: this.props.newClaimStore.personResponse.dateOfBirth,
        personId: this.props.newClaimStore.personResponse.personId
      } as NaturalPerson;

      this.state.naturalPerson = Object.assign({}, this.props.newClaimStore.newClaim.naturalPerson);
    });


    this.setState(this.state);
  }

  naturalEntityFields() {
    let newClaim = this.props.newClaimStore.newClaim;
    console.log('naturalEntityFields', newClaim.naturalPerson);
    return <>

      <TextField
        label="First Name"
        fullWidth
        disabled
        value={this.state.naturalPerson.first_name}
        onChange={this.handleChange('first_name')}
        margin="normal"
      />

      {/*<TextField
        label="Middle Names"
        fullWidth
        disabled
        value={this.state.naturalPerson.middle_names}
        onChange={this.handleChange('middle_names')}
        margin="normal"
      />*/}

      <TextField
        label="Last Name"
        fullWidth
        disabled
        value={this.state.naturalPerson.last_name}
        onChange={this.handleChange('last_name')}
        margin="normal"
      />

      <TextField
        label="Date of Birth"
        fullWidth
        disabled
        type="date"
        value={this.state.naturalPerson.date_of_birth}
        onChange={this.handleChange('date_of_birth')}
        margin="normal"
        InputLabelProps={{
          shrink: true
        }}
      />

      <TextField
        label="Address"
        fullWidth
        disabled
        value={this.state.naturalPerson.address}
        onChange={this.handleChange('address')}
        margin="normal"
      />
    </>;
  }

  handleChange = name => event => {
    runInAction(() => {
      this.props.newClaimStore.newClaim.naturalPerson[name] = event.target.value;
      this.state.naturalPerson[name] = event.target.value;
      this.setState(this.state);
    });
  };

  setActiveLegalEntity = (entity: LegalEntityResponse) => {
    console.log('setActiveLegalEntity', entity);
    runInAction(() => {
      this.props.newClaimStore.newClaim.isLegalEntity = true;
      this.props.newClaimStore.newClaim.legalPerson.name = entity.name;
      this.props.newClaimStore.newClaim.legalPerson.registry_code = entity.registryCode;
    });
  };

  legalEntityFields() {
    if (this.props.newClaimStore.personResponse) {
      console.log('legalEntityFields', this.props.newClaimStore.personResponse.legalEntities);
    }

    return (
      <RadioGroup
        aria-label="Gender"
        name="gender1"
        value={this.state.value}
        onChange={this.handleRadioChange}
      >
        {this.props.newClaimStore.personResponse.legalEntities.map((legalEntity, index) => (
          <FormControlLabel
            key={`legal-entity-${index}`}
            onClick={() => this.setActiveLegalEntity(legalEntity)}
            value={'' + legalEntity.registryCode}
            control={<Radio onClick={() => this.setActiveLegalEntity(legalEntity)} />}
            label={legalEntity.registryCode + ' ' + legalEntity.name}
          />
        ))}
      </RadioGroup>
    );
  }


  claimantInfo() {
    return <>
      <h1>Claimant Information</h1>
      <Divider light />
      {this.props.newClaimStore.isNaturalSection && this.naturalEntityFields()}
      {this.props.newClaimStore.isLegalSection && this.legalEntityFields()}
    </>;
  }

  render() {
    return this.claimantInfo();
  }
}

export default Claimant;
