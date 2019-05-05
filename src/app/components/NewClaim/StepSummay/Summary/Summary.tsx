import * as React from 'react';
import {inject, observer} from "mobx-react";
import NewClaimStore from "app/stores/NewClaimStore";
import Button from "@material-ui/core/Button";
import {RouteComponentProps} from "react-router";
import CircularProgress from "@material-ui/core/CircularProgress";
import Grid from "@material-ui/core/Grid";
import axios from 'axios';
import UserStore from "app/stores/UserStore";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";

export interface SummaryProps extends RouteComponentProps<any> {
    newClaimStore?: NewClaimStore,
    userStore?: UserStore
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
        console.log("Summary didupdate");
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
        if (this.props.userStore && this.props.userStore.personalCode) {
            user = this.props.userStore.personalCode;
        }

        const data = {
            status: "PENDING",
            caseNumber: '1000000' + new Date().getMilliseconds().toString(),
            claimantId: "100000003",
            defendantId: this.props.newClaimStore.newClaim.defendant.registryCode,
            caseType: this.props.newClaimStore.newClaim.claim.case_type,
            description: this.props.newClaimStore.newClaim.claim.description,
            value: user,
            fee: this.props.newClaimStore.newClaim.fee.fee
        };
        console.log(data);

        axios.post('http://139.59.148.64/coco-api/cases', data)
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
            <h2>State fee has been successful paid</h2>
            <h2>Payment Reference Number: {this.props.newClaimStore.newClaim.fee.reference_number}</h2>
            <h2>Amount paid: {this.props.newClaimStore.newClaim.fee.fee}</h2>
            <hr/>
            <h2>Claim:</h2>
            <p><strong>Claim type:</strong> {this.props.newClaimStore.newClaim.claim.case_type}</p>
            <p><strong>Summary:</strong> {this.props.newClaimStore.newClaim.claim.description}</p>
            <hr/>
            <h2>Defendant:</h2>
            <p><strong>Registry code: </strong>{this.props.newClaimStore.newClaim.defendant.registryCode}</p>
            <hr/>
            <h2>Attached Files</h2>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>File Name</TableCell>
                        <TableCell>Modified</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {this.attachedFiles()}
                </TableBody>
            </Table>
            <br/>
            <Button onClick={this.toClaims} variant="contained"
                    color="primary">
                To Claims
            </Button>
        </>
    }

    attachedFiles() {
        let result = [];
        this.props.newClaimStore.newClaim.documents.forEach(item => {
            result.push(<>
                <TableRow>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>{item.modified}</TableCell>
                </TableRow>
            </>);
        })
        return result;
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
