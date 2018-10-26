import * as React from 'react';
import {inject, observer} from "mobx-react";
import NewClaimStore from "app/stores/NewClaimStore";
import {runInAction} from "mobx";
import TextField from "@material-ui/core/TextField";

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
        let fee = this.props.newClaimStore.newClaim.fee;

        return <>
            <TextField
                label="Card Number"
                fullWidth
                value={fee.card_number}
                onChange={this.handleChange('card_number')}
                margin="normal"
                multiline
            />

            <TextField
                label="Card Owner"
                fullWidth
                value={fee.card_owner}
                onChange={this.handleChange('card_owner')}
                margin="normal"
                multiline
            />

            <TextField
                label="CW"
                fullWidth
                value={fee.cw}
                onChange={this.handleChange('cw')}
                margin="normal"
                multiline
            />

            <TextField
                label="CW"
                fullWidth
                value={fee.expiration_date}
                onChange={this.handleChange('expiration_date')}
                margin="normal"
                multiline
            />
        </>
    }

    handleChange = name => event => {
        runInAction(() => {
            console.log(this.props.newClaimStore.newClaim.claim);
            this.props.newClaimStore.newClaim.claim[name] = event.target.value;
            console.log(this.props.newClaimStore.newClaim.claim);
        });
    };

    render() {
        return <>
            {this.renderPayment()}
        </>
    }
}

export default Payment;
