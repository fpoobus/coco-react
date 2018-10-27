import * as React from 'react';
import {inject, observer} from 'mobx-react';
import {RouteComponentProps} from 'react-router';
import NewClaimStore from "app/stores/NewClaimStore";

export interface NewClaimPaymentCompletePageProps extends RouteComponentProps<any> {
    newClaimStore: NewClaimStore
}

export interface NewClaimPaymentCompletePageState {
}


@inject('routerStore', 'newClaimStore')
@observer
export class NewClaimPaymentCompletePage extends React.Component<NewClaimPaymentCompletePageProps, NewClaimPaymentCompletePageState> {
    constructor(props: NewClaimPaymentCompletePageProps, context: any) {
        super(props, context);


        let claim = localStorage.getItem('newClaim');
        let step = localStorage.getItem('step');

        window.location.href = "/new-claim?claim=" + claim + "&step=" + step;
    }

    render() {
        return null;
    }
}
