import * as React from 'react';
import {inject, observer} from 'mobx-react';
import {RouteComponentProps} from 'react-router';
import NewClaimStore from "app/stores/NewClaimStore";
import Claimant from "app/components/NewClaim/Step1/Claimant/Claimant";
import NewClaim from "app/model/NewClaim";
import {ClaimInformation} from "app/components/NewClaim/Step2/ClaimInformation/ClaimInformation";
import Button from "@material-ui/core/Button";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Grid from "@material-ui/core/Grid";
import CardActions from "@material-ui/core/CardActions";
import {Card} from '@material-ui/core';
import CardContent from "@material-ui/core/CardContent";
import Documents from "app/components/NewClaim/Step3/Documents/Documents";
import Payment from "app/components/NewClaim/Step4/Payment/Payment";
import Summary from "app/components/NewClaim/Step5/Summary/Summary";
import Paper from "@material-ui/core/Paper";
import RootContainer from "app/components/Container/RootContainer";

export interface NewClaimPageProps extends RouteComponentProps<any> {
    newClaimStore: NewClaimStore
}

export interface IndexPageState {
}

const centerAlign = {

    marginLeft: 'auto',
    marginRight: 'auto'

};


let padding = {
    padding: "20px",
    margin: "10px"
}

@inject('routerStore', 'newClaimStore')
@observer
export class NewClaimPage extends React.Component<NewClaimPageProps, IndexPageState> {
    constructor(props: NewClaimPageProps, context: any) {
        super(props, context);
        this.props.newClaimStore.setClaim(new NewClaim());
    }


    renderStep1() {
        return this.props.newClaimStore.step === 0 &&
            <>

              <Grid container spacing={16}>
                <Grid item xs={12}>
                  <Grid container justify="center">
                    <Grid item>

                      <Paper style={padding} elevation={5}>

                        <Button variant="contained"
                                color="primary" onClick={this.props.newClaimStore.setOpenSectionNatural}>New Claim As A
                          Natural Entity
                        </Button>
                      </Paper>

                    </Grid>

                    <Grid item>

                      <Paper style={padding} elevation={5}>

                        <Button variant="contained"
                                color="primary" onClick={this.props.newClaimStore.setOpenSectionLegal}>New Claim As A Legal
                          Entity
                        </Button>
                      </Paper>

                    </Grid>
                  </Grid>
                </Grid>
              </Grid>


              <Claimant newClaimStore={this.props.newClaimStore}/>
            </>
    }

    renderStep2() {
        return this.props.newClaimStore.step === 1 &&
            <>
              <ClaimInformation newClaimStore={this.props.newClaimStore}/>
            </>
    }

    renderStep3() {
        return this.props.newClaimStore.step === 2 &&
            <>
              <Documents newClaimStore={this.props.newClaimStore}/>
            </>
    }

    renderStep4() {
        return this.props.newClaimStore.step === 3 &&
            <>
              <Payment newClaimStore={this.props.newClaimStore}/>
            </>
    }

    renderStep5() {
        return this.props.newClaimStore.step === 4 &&
            <>
              <Summary history={this.props.history} location={this.props.location} match={this.props.match}
                       newClaimStore={this.props.newClaimStore}/>
            </>
    }

    lastStep() {
        return this.props.newClaimStore.step >= 4;
    }

    render() {

        return (
            <RootContainer>
                <div style={centerAlign}>
                    <Grid justify="space-between" container spacing={24}>
                        <Grid justify="center" item xs={12}>
                            <Card>
                                <CardContent>
                                    {!this.lastStep() &&
                                    <Stepper activeStep={this.props.newClaimStore.step} alternativeLabel>

                                      <Step>
                                        <StepLabel>Choose Claim Type</StepLabel>
                                      </Step>
                                      <Step>
                                        <StepLabel>Claim Information</StepLabel>
                                      </Step>
                                      <Step>
                                        <StepLabel>Documents</StepLabel>
                                      </Step>
                                      <Step>
                                        <StepLabel>State Fee</StepLabel>
                                      </Step>
                                    </Stepper>
                                    }
                                    <div>

                                    </div>

                                    {this.renderStep1()}
                                    {this.renderStep2()}
                                    {this.renderStep3()}
                                    {this.renderStep4()}
                                    {this.renderStep5()}

                                </CardContent>
                                <CardActions>
                                    {!this.lastStep() &&
                                    <Button onClick={this.props.newClaimStore.nextStep} variant="contained"
                                            color="primary">
                                      Continue
                                    </Button>
                                    }
                                </CardActions>
                            </Card>
                        </Grid>
                    </Grid>
                </div>
            </RootContainer>
        );
    }
}
