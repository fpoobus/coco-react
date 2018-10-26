import * as React from 'react';
import { inject, observer } from 'mobx-react';
import NewClaimStore from 'app/stores/NewClaimStore';
import TextField from '@material-ui/core/TextField';
import { runInAction } from 'mobx';
import axios from 'axios';
import { PersonResponse } from 'app/model/NewClaim';
import Button from '@material-ui/core/Button';

export interface ClaimantProps {
  newClaimStore: NewClaimStore
}

export interface ClaimantState {
  /* empty */
}


@inject('routerStore', 'newClaimStore')
@observer
export class Claimant extends React.Component<ClaimantProps, ClaimantState> {

  naturalEntityFields() {
    let newClaim = this.props.newClaimStore.newClaim;
    return <>

      <TextField
        label="First Name"
        fullWidth
        value={newClaim.naturalPerson.first_name}
        onChange={this.handleChange('first_name')}
        margin="normal"
      />

      <TextField
        label="Middle Names"
        fullWidth
        value={newClaim.naturalPerson.middle_names}
        onChange={this.handleChange('middle_names')}
        margin="normal"
      />

      <TextField
        label="Last Name"
        fullWidth
        value={newClaim.naturalPerson.last_name}
        onChange={this.handleChange('last_name')}
        margin="normal"
      />

      <TextField
        label="Date of Birth"
        fullWidth
        type="date"
        value={newClaim.naturalPerson.date_of_birth}
        onChange={this.handleChange('date_of_birth')}
        margin="normal"
        InputLabelProps={{
          shrink: true
        }}
      />

      <TextField
        label="Date of Birth"
        fullWidth
        value={newClaim.naturalPerson.address}
        onChange={this.handleChange('address')}
        margin="normal"
      />
    </>;
  }

  handleChange = name => event => {
    runInAction(() => {
      this.props.newClaimStore.newClaim.naturalPerson[name] = event.target.value;

    });
  };

  legalEntityFields() {
    axios.get(`http://139.59.148.64:9701/coco-api/person/10`, {
        headers: {
          'Access-Control-Allow-Origin': '*'
        }
      })
      .then(res => {
        runInAction(() => {
          this.props.newClaimStore.personResponse = PersonResponse.fromJson(res.data);
        });
      });


    return this.props.newClaimStore.personResponse && <>
      {this.props.newClaimStore.personResponse.legalEntities.map(legalEntity => {
        <Button variant="contained" color="primary">
          {legalEntity.name}
        </Button>;
      })}
    </>;
  }

  claimantInfo() {
    return <>
        {this.props.newClaimStore.isNaturalSection && this.naturalEntityFields() }
      {this.props.newClaimStore.isLegalSection && this.legalEntityFields() }
    </>;
  }

  render() {
    return this.claimantInfo();
  }
}

export default Claimant;
