import * as React from 'react';
import { WithStyles } from '@material-ui/core';
import withStyles from '@material-ui/core/styles/withStyles';
import ClaimsDataStore from 'app/stores/ClaimsDataStore';
import { inject, observer } from 'mobx-react';
import {courtParticipantsStyles} from "./styles";
import Table from "../../../../node_modules/@material-ui/core/Table/Table";
import TableHead from "../../../../node_modules/@material-ui/core/TableHead/TableHead";
import TableRow from "../../../../node_modules/@material-ui/core/TableRow/TableRow";
import TableCell from "../../../../node_modules/@material-ui/core/TableCell/TableCell";
import TableBody from "../../../../node_modules/@material-ui/core/TableBody/TableBody";
import Divider from "../../../../node_modules/@material-ui/core/Divider/Divider";
import Paper from "../../../../node_modules/@material-ui/core/Paper/Paper";
import Button from "../../../../node_modules/@material-ui/core/Button/Button";


interface CourtParticipantsProps extends WithStyles<typeof courtParticipantsStyles> {
  claimsDataStore?: ClaimsDataStore
}

let id = 0;
function createData(name, type, summonSent, attendHearing) {
    id += 1;
    return { id, name, type, summonSent, attendHearing};
}

const rows = [
    createData('John Snow', 'Claimant', 'Yes', 'Yes'),
    createData('John Wick', 'Defendant', 'Yes', 'Yes'),
    createData('Lady Gaga', 'Jugde', 'No', 'Yes'),
];

@inject('claimsDataStore')
@observer
class CourtParticipants extends React.Component<CourtParticipantsProps> {

  render() {
      const { classes } = this.props;
      return (
      <>
          <Paper>
              <div>
                  <p className={classes.heading}>Participants</p>
                  <Button variant="contained" color="primary" className={classes.addParticipants}>+ Add participants</Button>
              </div>
              <Divider />
              <Table>
                  <TableHead>
                      <TableRow>
                          <TableCell>Full name</TableCell>
                          <TableCell>Type</TableCell>
                          <TableCell>Send summon</TableCell>
                          <TableCell>Attend hearing</TableCell>
                      </TableRow>
                  </TableHead>
                  <TableBody>
                      {rows.map(row => {
                          return (
                              <TableRow key={row.id}>
                                  <TableCell component="th" scope="row">
                                      {row.name}
                                  </TableCell>
                                  <TableCell>{row.type}</TableCell>
                                  <TableCell>{row.summonSent}</TableCell>
                                  <TableCell>{row.attendHearing}</TableCell>
                              </TableRow>
                          );
                      })}
                  </TableBody>
              </Table>
          </Paper>
      </>
    );
  }
}

export default withStyles(courtParticipantsStyles)(CourtParticipants);
