import * as React from 'react';
import withStyles, {WithStyles} from '@material-ui/core/styles/withStyles';
import {clientCasesStyles} from 'app/components/ClientCases/styles';
import Paper from '@material-ui/core/Paper/Paper';
import Table from '@material-ui/core/Table/Table';
import TableHead from '@material-ui/core/TableHead/TableHead';
import TableCell from '@material-ui/core/TableCell/TableCell';
import TableBody from '@material-ui/core/TableBody/TableBody';
import TableRow from '@material-ui/core/TableRow/TableRow';
import CaseStore from "app/stores/CaseStore";
import {inject, observer} from "mobx-react";
import Button from "@material-ui/core/Button/Button";
import Typography from "@material-ui/core/es/Typography/Typography";
import Grid from "@material-ui/core/Grid/Grid";

interface ClientCasesProps extends WithStyles<typeof clientCasesStyles> {
    caseStore?: CaseStore;
}

@inject('caseStore')
@observer
class ClientCases extends React.Component<ClientCasesProps> {
    renderTableBody = () => {
        const {caseStore} = this.props;

        const caseData = caseStore.casesData;
        return (
            caseData.map((courtCase, idx) => {
                    const id = courtCase.id;
                    return <TableRow key={idx}>
                        <TableCell>{courtCase.status}</TableCell>
                        <TableCell>{courtCase.type}</TableCell>
                        <TableCell>{courtCase.claimantId}</TableCell>
                        <TableCell>{courtCase.defendantId}</TableCell>
                        <TableCell>{courtCase.description}</TableCell>
                        <TableCell>
                            <Button variant="contained"  href={'/case?id=' + id} color="primary">
                                Go to case
                            </Button>
                        </TableCell>
                    </TableRow>
                }
            )
        );
    };

    constructor(props: ClientCasesProps) {
        super(props);
        this.props.caseStore.loadCases();
    }

    render() {
        return (
            <>
                <Paper>
                    <Grid container spacing={24}>
                        <Grid item xs={12}>
                            <Typography variant="h5" gutterBottom style={{ marginLeft: 20 }}>
                                New cases
                            </Typography>

                        </Grid>

                    </Grid>
                    <Table>
                        <TableHead>
                            <TableRow>
                                {['Status', 'Type', 'Calimant', 'Defendant', 'Description', '']
                                    .map((title, idx) => <TableCell key={title + idx.toString()}>{title}</TableCell>)}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.renderTableBody()}
                        </TableBody>
                    </Table>
                </Paper>
            </>
        );
    }
}

export default withStyles(clientCasesStyles)(ClientCases);
