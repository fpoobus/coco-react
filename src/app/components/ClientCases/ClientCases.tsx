import * as React from 'react';
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import { clientCasesStyles } from 'app/components/ClientCases/styles';
import Paper from '@material-ui/core/Paper/Paper';
import Table from '@material-ui/core/Table/Table';
import TableHead from '@material-ui/core/TableHead/TableHead';
import TableCell from '@material-ui/core/TableCell/TableCell';
import TableBody from '@material-ui/core/TableBody/TableBody';
import TableRow from '@material-ui/core/TableRow/TableRow';

const mockData = {
  status: 'something',
  evidence: 'something else',
  details1: 'something else',
  details2: 'something else'

};

interface ClientCasesProps extends WithStyles<typeof clientCasesStyles> {

}

class ClientCases extends React.Component<ClientCasesProps> {

  renderTableBody = () => {
    const mockDataList = [mockData, mockData, mockData];
    return (
      mockDataList.map((mockData, idx) => {
        return <>
          <TableRow key={idx}>
            <TableCell>{mockData.status}</TableCell>
            <TableCell>{mockData.evidence}</TableCell>
            <TableCell>{mockData.details1}</TableCell>
            <TableCell>{mockData.details2}</TableCell>
            <TableCell>{null}</TableCell>
          </TableRow></>;
      })
    );
  };

  render() {
    return (
      <>
        <Paper>
          <Table>
            <TableHead>
              <TableRow>
                {['Status', 'Evidence', 'Details', 'Details', '']
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
