import * as React from 'react';
import { inject, observer } from 'mobx-react';
import NewClaimStore from 'app/stores/NewClaimStore';
import TextField from '@material-ui/core/TextField';
import { runInAction } from 'mobx';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import { FormControl } from '@material-ui/core';

export interface ClaimInformationProps {
  newClaimStore: NewClaimStore
}

export interface ClaimInformationState {
  /* empty */
}


let gridItem = {
  margin: '10px'
};

let textCenter = {
  textAlign: 'center' as 'center'
};

const claims = [
  {
    type: 'bankruptcy',
    name: 'Bankruptcy',
    fee: '30'
  },
  {
    type: 'contract-violation',
    name: 'Contract Violation',
    fee: '60'
  },
  {
    type: 'equitable-claim',
    name: 'Equitable Claim',
    fee: '90'
  },
  {
    type: 'tort-claim',
    name: 'Tort Claim',
    fee: '110'
  },
  {
    type: 'property-dispute',
    name: 'Property Dispute',
    fee: '125'
  }
];

type ClaimType = typeof claims[0];

@inject('routerStore')
@observer
class ClaimInformation extends React.Component<ClaimInformationProps, ClaimInformationState> {

  state = {
    value: 'bankruptcy'
  };

  componentDidMount(): void {
    runInAction(() => this.props.newClaimStore.newClaim.claim.case_type = 'bankruptcy')
  }

  renderClaimTypes() {
    //const isChecked = (type: string) => this.props.newClaimStore.newClaim.claim.case_type === type;
    return (
      <FormControl component="fieldset">
        <RadioGroup name="claim-type" value={this.state.value || 'bankruptcy'} onChange={this.setCaseType}>
          <Grid container justify="center">
            {claims.map((claim: ClaimType, index) => (
              <Grid item xs={8} sm={6} md={4} key={`claim-${index}`}>
                <Paper style={gridItem} elevation={1}>
                  <Grid container justify="center">
                    <Grid item>
                      <FormControlLabel value={claim.type} control={<Radio />} label={claim.name} />
                      <Typography variant="subtitle1" gutterBottom>
                        State Fee: {claim.fee} USD
                      </Typography>
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </RadioGroup>
      </FormControl>
    );
  }

  renderClaimInfo() {
    let claim = this.props.newClaimStore.newClaim.claim;
    this.state.value = claim.case_type;

    return <>
      <Grid container justify="center">
        <Grid item>
          <Typography style={textCenter} component="h2" variant="h4" gutterBottom>
            Select Case Type
          </Typography>
          <Typography style={textCenter} variant="subtitle1" gutterBottom>
            Please select the case type relevant for the claim being submitted
          </Typography>
          <Typography style={textCenter} variant="subtitle1" gutterBottom>
            Depending on the case type the State Fee will be different.
          </Typography>
          <Divider light />
          <br /><br />
        </Grid>
      </Grid>

      <Grid container justify="center">
        <Grid item>
          {this.renderClaimTypes()}
        </Grid>
      </Grid>

      <h2>Claim Summary</h2>
      <Divider light />
      <TextField
        id="outlined-multiline-flexible"
        label="Claim Summary"
        multiline
        fullWidth
        rows="5"
        value={claim.description}
        onChange={this.handleChange('description')}
        margin="normal"
        variant="outlined"
      />
    </>;
  }

  handleChange = name => event => {
    runInAction(() => {
      this.props.newClaimStore.newClaim.claim[name] = event.target.value;
    });
  };

  setCaseType = event => {
    const caseType = event.target.value;
    const claim: ClaimType = claims.find(claim => claim.type === caseType);

    this.props.newClaimStore.newClaim.fee.fee = claim.fee;

    this.setState({ value: caseType });
    runInAction(() => {
      this.props.newClaimStore.newClaim.claim.case_type = caseType;
    });
  };

  render() {
    return this.renderClaimInfo();
  }
}

export default ClaimInformation;
