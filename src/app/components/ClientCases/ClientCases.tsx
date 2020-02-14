import * as React from 'react';
import withStyles, {WithStyles} from '@material-ui/core/styles/withStyles';
import {clientCasesStyles} from 'app/components/ClientCases/styles';
import Paper from '@material-ui/core/Paper/Paper';
import Table from '@material-ui/core/Table/Table';
import TableHead from '@material-ui/core/TableHead/TableHead';
import TableCell from '@material-ui/core/TableCell/TableCell';
import TableBody from '@material-ui/core/TableBody/TableBody';
import TableRow from '@material-ui/core/TableRow/TableRow';
import CaseStore from 'app/stores/CaseStore';
import {inject, observer} from 'mobx-react';
import Button from '@material-ui/core/Button/Button';
import Typography from '@material-ui/core/Typography/Typography';
import {Link} from 'react-router-dom';
import Grid from "@material-ui/core/Grid";
import CircularProgress from "@material-ui/core/CircularProgress";
import UserStore from "app/stores/UserStore";
import {ROLES} from "app/models/User";


interface ClientCasesProps extends WithStyles<typeof clientCasesStyles> {
    caseStore?: CaseStore;
    userStore?: UserStore;
}

@inject('caseStore', 'userStore')
@observer
class ClientCases extends React.Component<ClientCasesProps> {
    newClaimLink = (props, id) => <Link to={'/case?id=' + id} {...props} />;



    renderTableBody = () => {
        const {caseStore} = this.props;

        let caseData = caseStore.userCasesData;

        if (this.props.userStore.user.role === ROLES.USER) {
            //let code = this.props.userStore.user.personalCode;
            //values stands for person who made the claim (important in case of showing cases for legal entities)
            //caseData = caseData.filter(caseItem => caseItem.claimantId === code || caseItem.value === code || caseItem.defendantId === code);
        }

        return (
            caseData.map((courtCase, idx) => {
                    return <TableRow key={idx}>
                        <TableCell>{courtCase.status}</TableCell>
                        <TableCell>{courtCase.caseType}</TableCell>
                        <TableCell>{courtCase.claimantId}</TableCell>
                        <TableCell>{courtCase.defendantId}</TableCell>
                        <TableCell>{courtCase.description}</TableCell>
                        <TableCell>
                            <Button variant="contained" component={props => this.newClaimLink(props, courtCase.id)}
                                    color="primary">
                                Go to case
                            </Button>
                        </TableCell>
                    </TableRow>;
                }
            )
        );
    };

    renderCaseTable() {
        console.log('got here');
        const {caseStore, classes} = this.props;
        let noCasesTitle = "No cases found";
        let caseData = caseStore.casesData;
        if (this.props.userStore.user.role === ROLES.USER) {
            //let code = this.props.userStore.user.personalCode;
            caseData = caseStore.userCases;
            noCasesTitle = "You have no associated cases";
            // caseData = caseData.filter(caseItem => caseItem.claimantId === code || caseItem.defendantId === code);
        }
        if (caseData.length === 0) {
            return (<>
                <Typography variant="h6" className={classes.title}>{noCasesTitle}</Typography>
                <br/>
            </>);
        }
        return <Table>
            <TableHead>
                <TableRow>
                    {['Status', 'Type', 'Claimant', 'Defendant', 'Description', '']
                        .map((title, idx) => <TableCell key={title + idx.toString()}>{title}</TableCell>)}
                </TableRow>
            </TableHead>
            <TableBody>
                {this.renderTableBody()}
            </TableBody>
        </Table>
    }

    constructor(props: ClientCasesProps) {
        super(props);
        this.props.caseStore.loadCases();
        this.props.caseStore.loadUserCases(this.props.userStore.user.personalCode, this.props.userStore.user.role);
    }

    render() {
        const {classes} = this.props;
        let title = "New cases";

        if (this.props.userStore.user.role === ROLES.USER) {
            title = "Your cases";
        }

        return (
            <Paper className={classes.root}>
                <Typography variant="h5" gutterBottom className={classes.title}>{title}</Typography>
                {this.props.caseStore.loadingUser ? <>
                    <br/>
                    <Grid container justify="center">
                        <Grid item>

                            <CircularProgress size={50}/>

                        </Grid>
                    </Grid>
                    <br/>
                </> : this.renderCaseTable()}

            </Paper>
        );
    }
}

export default withStyles(clientCasesStyles)(ClientCases);
