import * as React from 'react';
import {inject, observer} from 'mobx-react';
import {RouteComponentProps} from 'react-router';
import NewClaimStore from "app/stores/NewClaimStore";
import Claimant from "app/components/NewClaim/StepClaimant/Claimant/Claimant";
import NewClaim from "app/model/NewClaim";
import {ClaimInformation} from "app/components/NewClaim/StepClaimInfo/ClaimInformation/ClaimInformation";
import Button from "@material-ui/core/Button";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Grid from "@material-ui/core/Grid";
import CardActions from "@material-ui/core/CardActions";
import {Card} from '@material-ui/core';
import CardContent from "@material-ui/core/CardContent";
import Documents from "app/components/NewClaim/StepDocuments/Documents/Documents";
import Payment from "app/components/NewClaim/StepPayment/Payment/Payment";
import Summary from "app/components/NewClaim/StepSummay/Summary/Summary";
import Paper from "@material-ui/core/Paper";
import RootContainer from "app/components/Container/RootContainer";
import CircularProgress from "@material-ui/core/CircularProgress";
import AccountBox from "@material-ui/icons/AccountBox";
import AccountBalance from "@material-ui/icons/AccountBalance";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Defendant from "app/components/NewClaim/StepDefendant/Defendant/Defendant";
import UserStore from "app/stores/UserStore";

export interface NewClaimPageProps extends RouteComponentProps<any> {
    newClaimStore: NewClaimStore,
    userStore: UserStore
}

export interface IndexPageState {
}

const centerAlign = {

    marginLeft: 'auto',
    marginRight: 'auto'

};


let padding = {
    padding: "20px",
    margin: "10px",
    height: "100px"
}

let iconScale = {
    transform: "scale(3.8)"
}


@inject('routerStore', 'newClaimStore', 'userStore')
@observer
export class NewClaimPage extends React.Component<NewClaimPageProps, IndexPageState> {
    constructor(props: NewClaimPageProps, context: any) {
        super(props, context);

        let claim = new URLSearchParams(window.location.search).get('claim');

        if (claim) {
            this.props.newClaimStore.setClaim(NewClaim.fromJson(claim));
        } else {
            this.props.newClaimStore.setClaim(new NewClaim());
        }
        this.props.newClaimStore.step = 0;
        let step = new URLSearchParams(window.location.search).get('step');
        if (step) {
            console.log("found step")
            this.props.newClaimStore.step = parseInt(step);
        }
    }

    nextAndSetTypeNatural = () => {
        this.props.newClaimStore.setOpenSectionNatural();
        this.nextStepWithLoader();
    }

    nextAndSetTypeLegal = () => {
        this.props.newClaimStore.setOpenSectionLegal();
        this.nextStepWithLoader();
    }

    renderStep1() {
        return <>

            <Grid container spacing={16}>
                <Grid item xs={12}>
                    <Grid container justify="center">

                        <Grid container justify="center">
                            <Grid item>
                                <Typography component="h2" variant="h4" gutterBottom>
                                    Please choose who you are representing
                                </Typography>
                                <Divider light/>
                                <br/><br/>
                            </Grid>
                        </Grid>

                        <Grid item xs={12} sm={6}>

                            <Paper style={padding} elevation={1}>

                                <Grid container justify="center">
                                    <Grid item>
                                        <AccountBox style={iconScale}/>
                                        <br/><br/><br/>
                                    </Grid>
                                </Grid>

                                <Grid container justify="center">
                                    <Grid item>

                                        <Button variant="contained"
                                                color="primary"
                                                onClick={this.nextAndSetTypeNatural}>
                                            Represent Yourself
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Paper>

                        </Grid>

                        <Grid item xs={12} sm={6}>

                            <Paper style={padding} elevation={1}>

                                <Grid container justify="center">
                                    <Grid item>
                                        <AccountBalance style={iconScale}/>
                                        <br/><br/><br/>
                                    </Grid>
                                </Grid>

                                <Grid container justify="center">
                                    <Grid item>

                                        <Button variant="contained"
                                                color="primary"
                                                onClick={this.nextAndSetTypeLegal}>
                                            Represent a Legal Entity
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Paper>

                        </Grid>
                    </Grid>
                </Grid>
            </Grid>


        </>
    }

    renderClaimantStep() {
        return <Claimant newClaimStore={this.props.newClaimStore}/>
    }

    renderDefendantStep() {
        return <>
            <Defendant newClaimStore={this.props.newClaimStore}/>
        </>
    }

    renderClaimInformationStep() {
        return <>
            <ClaimInformation newClaimStore={this.props.newClaimStore}/>
        </>
    }

    renderDocumentsStep() {
        return <>
            <Documents newClaimStore={this.props.newClaimStore}/>
        </>
    }

    renderPaymentStep() {
        return <>
            <Payment newClaimStore={this.props.newClaimStore}/>
        </>
    }

    renderSummaryStep() {
        return <>
            <Summary history={this.props.history} location={this.props.location} match={this.props.match}
                     userStore={this.props.userStore} newClaimStore={this.props.newClaimStore}/>
        </>
    }

    lastStep() {
        return this.props.newClaimStore.step >= 6;
    }

    lastPreStep() {
        return this.props.newClaimStore.step >= 5;
    }

    firstStep() {
        return this.props.newClaimStore.step == 0;
    }

    nextStepWithLoader = () => {
        this.props.newClaimStore.setLoading(true);
        setTimeout(() => {
            this.props.newClaimStore.setLoading(false);
            this.props.newClaimStore.nextStep();
        }, 800);
    }

    previousStepWithLoader = () => {
        this.props.newClaimStore.setLoading(true);
        setTimeout(() => {
            this.props.newClaimStore.setLoading(false);
            this.props.newClaimStore.previousStep();
        }, 400);
    }

    proceedToPayment = () => {
        localStorage.setItem('newClaim', JSON.stringify(this.props.newClaimStore.newClaim));
        localStorage.setItem('step', "6");
        let redirUrl = window.location.protocol + "//" + window.location.host + "/new-claim/payment-complete"
        window.location.href = "https://rkdemo.aktors.ee/proto/bank?amount=10&returnUrl=" + redirUrl;
    }

    render() {

        let dynamicClass = {
            'display': this.props.newClaimStore.loading ? 'none' : 'block'
        };

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
                                            <StepLabel>Claim Type</StepLabel>
                                        </Step>
                                        <Step>
                                            <StepLabel>Claimant</StepLabel>
                                        </Step>
                                        <Step>
                                            <StepLabel>Defendant</StepLabel>
                                        </Step>
                                        <Step>
                                            <StepLabel>Claim</StepLabel>
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

                                    <div style={dynamicClass}>
                                        {this.props.newClaimStore.step === 0 && this.renderStep1()}
                                        {this.props.newClaimStore.step === 1 && this.renderClaimantStep()}
                                        {this.props.newClaimStore.step === 2 && this.renderDefendantStep()}
                                        {this.props.newClaimStore.step === 3 && this.renderClaimInformationStep()}
                                        {this.props.newClaimStore.step === 4 && this.renderDocumentsStep()}
                                        {this.props.newClaimStore.step === 5 && this.renderPaymentStep()}
                                        {this.props.newClaimStore.step === 6 && this.renderSummaryStep()}
                                    </div>

                                    {this.props.newClaimStore.loading && <>
                                        <Grid container justify="center">
                                            <Grid item>

                                                <CircularProgress size={50}/>

                                            </Grid>
                                        </Grid>
                                    </>}


                                </CardContent>
                                <CardActions>
                                    {!this.lastStep() && !this.firstStep() && !this.props.newClaimStore.loading &&
                                    <Button onClick={this.previousStepWithLoader} variant="contained"
                                            color="primary">
                                        Back
                                    </Button>
                                    }
                                    {!this.lastStep() && !this.lastPreStep() && !this.firstStep() && !this.props.newClaimStore.loading &&
                                    <Button disabled={this.props.newClaimStore.nextButtonDisabled}
                                            onClick={this.nextStepWithLoader} variant="contained"
                                            color="primary">
                                        Continue
                                    </Button>
                                    }
                                    {this.lastPreStep() && !this.lastStep() && !this.props.newClaimStore.loading &&
                                    <Button onClick={this.proceedToPayment} variant="contained"
                                            color="primary"
                                    >
                                        Proceed to Payment
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
