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
            caseData.map((mockData, idx) =>
                    <TableRow key={idx} >
                        <TableCell>{mockData.status}</TableCell>
                        <TableCell>{mockData.type}</TableCell>
                        <TableCell>{mockData.claimantId}</TableCell>
                        <TableCell>{mockData.defendantId}</TableCell>
                        <TableCell>{mockData.description}</TableCell>
                    </TableRow>
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
                    <Table>
                        <TableHead>
                            <TableRow>
                                {['Status', 'Type', 'Calimant', 'Defendant', 'Description']
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
