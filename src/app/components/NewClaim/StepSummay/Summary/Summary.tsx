import * as React from 'react';
import {inject, observer} from "mobx-react";
import NewClaimStore from "app/stores/NewClaimStore";
import Button from "@material-ui/core/Button";
import {RouteComponentProps} from "react-router";
import CircularProgress from "@material-ui/core/CircularProgress";
import Grid from "@material-ui/core/Grid";
import axios from 'axios';
import UserStore from "app/stores/UserStore";

export interface SummaryProps extends RouteComponentProps<any> {
    newClaimStore: NewClaimStore,
    userStore: UserStore
}

export interface SummaryState {
    /* empty */
}


@inject('routerStore', 'newClaimStore', 'userStore')
@observer
export class Summary extends React.Component<SummaryProps, SummaryState> {

    constructor(props: SummaryProps, context: any) {
        super(props, context);
    }

    componentDidMount() {
        this.props.newClaimStore.setSummaryLoading(true);

        /*
          private String status;
          private String paymentStatus = "PAID";
          private String caseNumber;
          private LocalDate dateOfRegistration;
          private String judge;
          private String claimantId;
          private String defendantId;
          private String caseType;
          private String description;
          private String value;
          private String fee;
         */

        let user = "";
        if(this.props.userStore && this.props.userStore.personalCode) {
            user = this.props.userStore.personalCode;
        }

        axios.post('http://139.59.148.64/coco-api/cases', {
            status: "PENDING",
            caseNumber: '1000000' + new Date().getMilliseconds().toString(),
            claimantId: "",
            defendantId: this.props.newClaimStore.newClaim.defendant.registryCode,
            caseType: this.props.newClaimStore.newClaim.claim.case_type,
            description: this.props.newClaimStore.newClaim.claim.description,
            value: user,
            fee: this.props.newClaimStore.newClaim.fee.fee
        })
            .then(res => {
                this.props.newClaimStore.setSummaryLoading(false);
            })
            .catch(error => {
                console.log(error)
            })

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

    loaderAndSend() {
        return this.props.newClaimStore.summaryLoading && <>
            <Grid container justify="center">
                <Grid item>

                    <CircularProgress size={50}/>

                </Grid>
            </Grid>
        </>;
    }

    render() {
        return <>
            {this.loaderAndSend()}
            {!this.props.newClaimStore.summaryLoading && this.renderSummary()}
        </>
    }
}

export default Summary;
