import * as React from 'react';
import {inject, observer} from "mobx-react";
import NewClaimStore from "app/stores/NewClaimStore";
import {runInAction} from "mobx";
import Typography from "@material-ui/core/Typography";

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
            <Typography component="h2" variant="h4" gutterBottom>
                The payment will take place in a secure payment processor
            </Typography>
            <Typography component="h2" variant="h6" gutterBottom>
                Fee: {this.props.newClaimStore.newClaim.fee.fee} USD
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
