import * as React from 'react';
import { WithStyles } from '@material-ui/core';
import withStyles from '@material-ui/core/styles/withStyles';
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
import HearingStore from "app/stores/HearingStore";
import Modal from "../../../../node_modules/@material-ui/core/Modal/Modal";
import Typography from "../../../../node_modules/@material-ui/core/Typography/Typography";


interface CourtParticipantsProps extends WithStyles<typeof courtParticipantsStyles> {
  hearingStore?: HearingStore
}

function getModalStyle() {
    const top = 50;
    const left = 50;

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
}


let id = 0;
function createData(name, type, summonSent, attendHearing) {
    id += 1;
    return { id, name, type, summonSent, attendHearing};
}

const rows = [
    createData('John Snow', 'Claimant', 'Yes', 'Yes'),
    createData('John Wick', 'Defendant', 'Yes', 'Yes'),
    createData('cdcs', 'Jugde', 'No', 'Yes'),
];

@inject('hearingStore')
@observer
class CourtParticipants extends React.Component<CourtParticipantsProps> {

    handleOpen = () => {
        this.props.hearingStore.setIsParticipantsModalOpen(true)
    };

    handleClose = () => {
        this.props.hearingStore.setIsParticipantsModalOpen(false)
    };

    renderModal = () => {
        const { classes } = this.props;
        return (
            <>
                <Modal
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                    open={this.props.hearingStore.isParticipantsModalOpen ? this.props.hearingStore.isParticipantsModalOpen : false}
                    onClose={this.handleClose}
                >
                    <div style={getModalStyle()} className={classes.paper}>
                    <Typography variant="h6" id="modal-title">
                        Choose participants
                    </Typography>
                    <Typography variant="subtitle1" id="simple-modal-description">
                        Tabel here
                    </Typography>
                </div>
                </Modal>
            </>
        );
    }

  render() {
      const { classes } = this.props;
      return (
      <>
          {this.renderModal()}
          <Paper>
              <div>
                  <p className={classes.heading}>Participants</p>
                  <Button variant="contained" color="primary" className={classes.addParticipants} onClick={this.handleOpen}>+ Add participants</Button>
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
