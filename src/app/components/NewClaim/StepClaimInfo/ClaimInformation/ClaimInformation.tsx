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


@inject('routerStore', 'newClaimStore')
@observer
export class ClaimInformation extends React.Component<ClaimInformationProps, ClaimInformationState> {

  state = {
    value: ''
  };

  renderClaimInfo() {
    let claim = this.props.newClaimStore.newClaim.claim;
    this.state.value = claim.case_type;

    return <>
      <Grid container justify="center">
        <Grid item>
          <Typography component="h2" variant="h4" gutterBottom>
            Select Case Type
          </Typography>
          <Typography component="subtitle1" gutterBottom>
            Depending on the case type the State Fee will be different.
          </Typography>
          <Divider light />
          <br /><br />
        </Grid>
      </Grid>
      <Grid container justify="center">
        <Grid item xs={3} sm={3}>

          <Paper style={gridItem} elevation={1}>


            <Grid justify="center">
              <Grid item>

                <RadioGroup
                  aria-label="Case Type"
                  name="claim_type"
                  value={this.state.value}
                  onChange={this.setCaseType}
                >
                  <FormControlLabel value="bankruptcy" control={<Radio />} label="Bankruptcy" />
                </RadioGroup>

                <Typography variant="subtitle1" gutterBottom>
                  State Fee: 30 USD
                </Typography>
              </Grid>
            </Grid>
          </Paper>

        </Grid>

        <Grid xs={3} sm={3}>

          <Paper style={gridItem} elevation={1}>

            <Grid container justify="center">
              <Grid item>

                <RadioGroup
                  aria-label="Case Type"
                  name="claim_type"
                  value={this.state.value}
                  onChange={this.setCaseType}
                >
                  <FormControlLabel value="contract-violation" control={<Radio />}
                                    label="Contract Violation" />
                </RadioGroup>

                <Typography variant="subtitle1" gutterBottom>
                  State Fee: 80 USD
                </Typography>
              </Grid>
            </Grid>
          </Paper>
        </Grid>


          <Grid xs={3} sm={3}>

              <Paper style={gridItem} elevation={1}>

                  <Grid container justify="center">
                      <Grid item>

                          <RadioGroup
                              aria-label="Case Type"
                              name="claim_type"
                              value={this.state.value}
                              onChange={this.setCaseType}
                          >
                              <FormControlLabel value="equitable-claim" control={<Radio />}
                                                label="Equitable Claim" />
                          </RadioGroup>

                          <Typography variant="subtitle1" gutterBottom>
                              State Fee: 80 USD
                          </Typography>
                      </Grid>
                  </Grid>
              </Paper>
          </Grid>

      </Grid>


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
    console.log('asd');

    if (event.target.value === 'contract-violation') {
      this.props.newClaimStore.newClaim.fee.fee = '80';
    } else {
      this.props.newClaimStore.newClaim.fee.fee = '30';
    }

    this.setState({ value: event.target.value });
    runInAction(() => {
      this.props.newClaimStore.newClaim.claim.case_type = event.target.value;
      console.log(this.props.newClaimStore.newClaim.claim.case_type);
    });
  };

  render() {
    return this.renderClaimInfo();
  }
}

export default ClaimInformation;
