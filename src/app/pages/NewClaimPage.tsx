import * as React from 'react';
import { ReactElement } from 'react';
import { inject, observer } from 'mobx-react';
import { RouteComponentProps } from 'react-router';
import NewClaimStore from 'app/stores/NewClaimStore';
import Claimant from 'app/components/NewClaim/StepClaimant/Claimant/Claimant';
import NewClaim, { PersonResponse } from 'app/model/NewClaim';
import ClaimInformation from 'app/components/NewClaim/StepClaimInfo/ClaimInformation/ClaimInformation';
import Button from '@material-ui/core/Button';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Grid from '@material-ui/core/Grid';
import CardActions from '@material-ui/core/CardActions';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Documents from 'app/components/NewClaim/StepDocuments/Documents/Documents';
import Payment from 'app/components/NewClaim/StepPayment/Payment/Payment';
import Summary from 'app/components/NewClaim/StepSummay/Summary/Summary';
import RootContainer from 'app/components/Container/RootContainer';
import Defendant from 'app/components/NewClaim/StepDefendant/Defendant/Defendant';
import UserStore from 'app/stores/UserStore';
import axios, { AxiosResponse } from 'axios';
import CaseFormFirstStep from 'app/pages/CaseForm/first-step/FirstStep';
import { green } from '@material-ui/core/colors';
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import { createStyles } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import cocoAxios from 'app/axiosConfig';
import { reaction } from 'mobx';

const newClaimPageStyles = () => createStyles({
  buttonProgress: {
    color: green[500],
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
  wrapper: {
    position: 'relative',
  },
});

export interface NewClaimPageProps extends RouteComponentProps<any>, WithStyles<typeof newClaimPageStyles> {
  newClaimStore: NewClaimStore,
  userStore: UserStore
}

export interface IndexPageState {
}

const centerAlign = {
  marginLeft: 'auto',
  marginRight: 'auto'
};


@inject('routerStore', 'newClaimStore', 'userStore')
@observer
class NewClaimPage extends React.Component<NewClaimPageProps, IndexPageState> {
  private disposer = null;

  componentDidMount(): void {
    this.setUser();
    this.disposer = reaction(() => this.props.userStore.user, () => {
      this.props.newClaimStore.reset();
      this.setUser();
    });
  }

  componentWillUnmount(): void {
    this.disposer();
  }

  constructor(props: NewClaimPageProps, context: any) {
    super(props, context);

    const claim = new URLSearchParams(window.location.search).get('claim');
    this.props.newClaimStore.reset();
    if (claim) {
      console.log('Claim from JSON');
      this.props.newClaimStore.setClaim(NewClaim.fromJson(claim));
      console.log('Newclaim', this.props.newClaimStore.newClaim)
    } else {
      this.props.newClaimStore.setClaim(new NewClaim());
    }

    const step = new URLSearchParams(window.location.search).get('step');
    if (step) {
      console.log('found step')
      this.props.newClaimStore.step = parseInt(step);
    }
  }

  get isLastStep(): boolean {
    return this.props.newClaimStore.step >= 6;
  }

  get isFirstStep(): boolean {
    return this.props.newClaimStore.step == 0
  };

  get isLastPreStep(): boolean {
    return this.props.newClaimStore.step >= 5;
  }

  nextStepWithLoader = () => {
    this.props.newClaimStore.setLoading(true);
    setTimeout(() => {
      this.props.newClaimStore.setLoading(false);
      this.props.newClaimStore.nextStep();
    }, 800);
  };

  previousStepWithLoader = () => {
    this.props.newClaimStore.setLoading(true);
    setTimeout(() => {
      this.props.newClaimStore.setLoading(false);
      this.props.newClaimStore.previousStep();
    }, 400);
  };

  executePaymentInbackGround = async (referenceNumber) => {

    let currentTimeMillis = new Date().getTime();

    let redirUrl = window.location.protocol + '//' + window.location.host + '/new-claim/payment-complete';
    let paymentUrl = 'https://rkdemo.aktors.ee/proto/pay?currency=USD&amount=' + this.props.newClaimStore.newClaim.fee.fee + '&payerData=' + this.props.userStore.user.personalCode + '&referenceNumber=' + referenceNumber + '&paymentTime=' + currentTimeMillis + '&returnUrl=' + redirUrl;

    return axios.get(paymentUrl)
      .then(res => {
        return Promise.resolve();
      }).catch(e => {
      });
  };

  proceedToPayment = async () => {

    localStorage.setItem('newClaim', JSON.stringify(this.props.newClaimStore.newClaim));
    localStorage.setItem('step', '6');

    // https://rkdemo.aktors.ee/proto/pay?referenceNumber=2900077778&amount=100&currency=USD&payerData=5555555555555555&paymentTime=1556192294700&service=test&returnUrl=http://139.59.148.64/new-claim/payment-complete

    await this.executePaymentInbackGround(this.props.newClaimStore.newClaim.fee.reference_number);
    let redirUrl = window.location.protocol + '//' + window.location.host + '/new-claim/payment-complete';
    window.location.href = 'https://rkdemo.aktors.ee/proto/bank?amount=' + this.props.newClaimStore.newClaim.fee.fee + '&payerData=' + this.props.userStore.user.personalCode + '&referenceNumber=' + this.props.newClaimStore.newClaim.fee.reference_number + '&returnUrl=' + redirUrl;
  };

  private setUser = async (): Promise<void> => {
    this.props.newClaimStore.setLoading(true);
    cocoAxios.get(`/coco-api/persons/` + this.props.userStore.personalCode)
        .then((res: AxiosResponse<PersonResponse>) => {
      this.props.newClaimStore.setPerson(res.data);
    }).finally(() => this.props.newClaimStore.setLoading(false));
  };

  renderByStep = () => {
    switch (this.props.newClaimStore.step) {
      case 0:
        return <CaseFormFirstStep newClaimStore={this.props.newClaimStore} nextStepClick={this.nextStepWithLoader} />;
      case 1:
        return <Claimant newClaimStore={this.props.newClaimStore} />;
      case 2:
        return <Defendant newClaimStore={this.props.newClaimStore} />;
      case 3:
        return <ClaimInformation newClaimStore={this.props.newClaimStore} />;
      case 4:
        return <Documents newClaimStore={this.props.newClaimStore} />;
      case 5:
        return <Payment newClaimStore={this.props.newClaimStore} />;
      case 6:
        return <Summary history={this.props.history} location={this.props.location} match={this.props.match} />;
    }
  };

  renderStepButtons = (): ReactElement<any> => {
    const showBackButton = () => !this.isLastStep && !this.isFirstStep;
    const showContinueButton = () => !this.isLastStep && !this.isLastPreStep && !this.isFirstStep;
    const showPaymentButton = () => this.isLastPreStep && !this.isLastStep && !this.props.newClaimStore.loading;

    return (
      <>
        {showBackButton() &&
        <Button onClick={this.previousStepWithLoader} variant="text" color="secondary">
          Back
        </Button>}
        {showContinueButton() &&
        <div className={this.props.classes.wrapper}>
          <Button
            disabled={this.props.newClaimStore.isLoading || this.props.newClaimStore.nextButtonDisabled}
            onClick={this.nextStepWithLoader} variant="contained"
            color="primary"> Continue
          </Button>
          {this.props.newClaimStore.isLoading && !this.isFirstStep &&
          <CircularProgress size={24} className={this.props.classes.buttonProgress} />}
        </div>}
        {showPaymentButton() &&
        <Button onClick={this.proceedToPayment} variant="contained" color="primary">
          Proceed to Payment
        </Button>}
      </>
    )
  };

  render() {
    const dynamicClass = {
      padding: 20
    };

    const STEPS = ['Claim Type', 'Claimant', 'Defendant', 'Claim', 'Documents', 'State Fee'];

    return (
      <RootContainer>
        <div style={centerAlign}>
          <Grid justify="space-between" container spacing={10}>
            <Grid item xs={12}>
              <Card>
                <CardContent>
                  {!this.isLastStep &&
                  <Stepper activeStep={this.props.newClaimStore.step} alternativeLabel>
                    {STEPS.map((step: string) => <Step key={step}><StepLabel>{step}</StepLabel></Step>)}
                  </Stepper>
                  }
                  <div style={dynamicClass}>
                    {this.renderByStep()}
                  </div>
                </CardContent>
                <CardActions>
                  {this.renderStepButtons()}
                </CardActions>
              </Card>
            </Grid>
          </Grid>
        </div>
      </RootContainer>
    );
  }
}

export default withStyles(newClaimPageStyles)(NewClaimPage);
