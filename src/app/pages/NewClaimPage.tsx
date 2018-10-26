import * as React from 'react';
import {inject, observer} from 'mobx-react';
import {RouteComponentProps} from 'react-router';
import {Header} from '../components/Header/Header'
import {Footer} from '../components/Footer/Footer';
import NewClaimStore from "app/stores/NewClaimStore";
import Claimant from "app/components/NewClaim/Step1/Claimant/Claimant";
import NewClaim from "app/model/NewClaim";
import {ClaimInformation} from "app/components/NewClaim/Step2/ClaimInformation/ClaimInformation";
import Button from "@material-ui/core/Button";

export interface NewClaimPageProps extends RouteComponentProps<any> {
    newClaimStore: NewClaimStore
}

export interface IndexPageState {
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
              <button onClick={this.props.newClaimStore.setOpenSectionNatural}>New Claim As A Natural Entity</button>
              <button onClick={this.props.newClaimStore.setOpenSectionLegal}>New Claim As A Legal Entity</button>
              <Claimant newClaimStore={this.props.newClaimStore}/>
              <Button onClick={this.props.newClaimStore.nextStep} variant="contained" color="primary">
                Continue
              </Button>
            </>
    }

    renderStep2() {
        return this.props.newClaimStore.step === 1 &&
            <>
              <ClaimInformation newClaimStore={this.props.newClaimStore}/>
            </>
    }

    render() {

        return (
            <>
                <Header/>

                {this.renderStep1()}
                {this.renderStep2()}

                <Footer/>
            </>
        );
    }
}
