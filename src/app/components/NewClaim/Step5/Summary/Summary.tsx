import * as React from 'react';
import {inject, observer} from "mobx-react";
import NewClaimStore from "app/stores/NewClaimStore";
import Button from "@material-ui/core/Button";
import {RouteComponentProps} from "react-router";

export interface SummaryProps extends RouteComponentProps<any> {
    newClaimStore: NewClaimStore
}

export interface SummaryState {
    /* empty */
}


@inject('routerStore', 'newClaimStore')
@observer
export class Summary extends React.Component<SummaryProps, SummaryState> {

    constructor(props: SummaryProps, context: any) {
        super(props, context);
    }

    toClaims = () => {
        this.props.history.push('/');
    }

    renderSummary() {
        return <>
            <h1>Your claim has been submitted.</h1>
            <Button onClick={this.toClaims} variant="contained"
                    color="primary">
                To Claims
            </Button>
        </>
    }

    render() {
        return <>
            {this.renderSummary()}
        </>
    }
}

export default Summary;
