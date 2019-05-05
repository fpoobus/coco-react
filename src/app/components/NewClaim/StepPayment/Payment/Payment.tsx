import * as React from 'react';
import {inject, observer} from "mobx-react";
import NewClaimStore from "app/stores/NewClaimStore";
import {runInAction} from "mobx";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";

export interface PaymentProps {
    newClaimStore: NewClaimStore
}

export interface PaymentState {
    /* empty */
}


@inject('routerStore', 'newClaimStore')
@observer
export class Payment extends React.Component<PaymentProps, PaymentState> {

    renderPayment() {

        return <>
            <h1>
                Submitting A Claim Requires State Fee Payment
            </h1>
            <Divider light/>
            <h2>
                The payment will take place in a secure payment processor
            </h2>
            <h2><strong>Payment Reference Number:</strong> {this.props.newClaimStore.newClaim.fee.reference_number}</h2>
            <Typography component="h2" variant="h6" gutterBottom>
                <strong>Fee:</strong> {this.props.newClaimStore.newClaim.fee.fee} USD
            </Typography>
        </>
    }


    handleChange = name => event => {
        runInAction(() => {
            console.log(this.props.newClaimStore.newClaim.fee);
            this.props.newClaimStore.newClaim.fee[name] = event.target.value;
            console.log(this.props.newClaimStore.newClaim.fee);

        });
    };

    render() {
        return <>
            {this.renderPayment()}
        </>
    }
}

export default Payment;
