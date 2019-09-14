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

@inject('routerStore')
@observer
class ClaimInformation extends React.Component<ClaimInformationProps, ClaimInformationState> {

  state = {
    value: ''
  };

  componentDidMount(): void {
    this.props.newClaimStore.setNextButtonDisabled(true)
  }

  renderClaimTypes() {
    let result = [];

    claims.forEach((claim, index) => result.push(
      <Grid item xs={8} sm={6} md={4} key={`claim-${index}`}>
        <Paper style={gridItem} elevation={1}>
          <Grid container justify="center">
            <Grid item>
              <RadioGroup name="claim-type" value={this.state.value} onChange={this.setCaseType}>
                <FormControlLabel value={claim.type} control={<Radio />}
                                  label={claim.name} checked={this.isChecked(claim.type)} />
              </RadioGroup>
              <Typography variant="subtitle1" gutterBottom>
                State Fee: {claim.fee} USD
              </Typography>
            </Grid>
          </Grid>
        </Paper>
      </Grid>)
    );

    return result;
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
        {this.renderClaimTypes()}
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
    this.props.newClaimStore.setNextButtonDisabled(false);

    let claim = claims.find(claim => claim.type === event.target.value);

    this.props.newClaimStore.newClaim.fee.fee = claim.fee;

    this.setState({ value: event.target.value });
    runInAction(() => {
      this.props.newClaimStore.newClaim.claim.case_type = event.target.value;
      console.log(this.props.newClaimStore.newClaim.claim.case_type);
    });
  };

  render() {
    return this.renderClaimInfo();
  }

  private isChecked(type: string) {
    return this.props.newClaimStore.newClaim.claim.case_type === type;
  }
}

export default ClaimInformation;
