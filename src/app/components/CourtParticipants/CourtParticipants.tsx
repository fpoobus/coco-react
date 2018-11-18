import * as React from 'react';
import {WithStyles} from '@material-ui/core';
import withStyles from '@material-ui/core/styles/withStyles';
import {inject, observer} from 'mobx-react';
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
import {PersonResponse} from "app/model/NewClaim";
import Checkbox from "@material-ui/core/Checkbox/Checkbox";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText/ListItemText";
import ListItem from "@material-ui/core/ListItem/ListItem";
import List from "@material-ui/core/List/List";
import User from "app/models/User";


interface CourtParticipantsProps extends WithStyles<typeof courtParticipantsStyles> {
    hearingStore?: HearingStore;
    chooseableParticipants?: PersonResponse[];
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

@inject('hearingStore')
@observer
class CourtParticipants extends React.Component<CourtParticipantsProps> {

    handleOpen = async () => {
        const {hearingStore} = this.props;
        let persons = await hearingStore.getChooseableParticipants();
        hearingStore.setChooseableParticipants(persons);

        console.log(hearingStore.chooseableParticipants);

        this.props.hearingStore.setIsParticipantsModalOpen(true);
    };

    handleClose = () => {
        this.props.hearingStore.setIsParticipantsModalOpen(false)
    };

    renderParticipantChoiceLine = (user: User): JSX.Element => {
        const {hearingStore} = this.props;

        return (
            <ListItem button onClick={() => hearingStore.toggleParticipant(user)}>
                <ListItemText primary={`${user.firstName} ${user.lastName}`}/>
                <ListItemSecondaryAction>
                    <Checkbox
                        checked={hearingStore.participantExists(user)}
                        onClick={() => hearingStore.toggleParticipant(user)}
                    />
                </ListItemSecondaryAction>
            </ListItem>
        );
    };

    renderParticipantChoices = () => {
        return (
            <List dense>
                {this.props.hearingStore.chooseableParticipants.map((person) => this.renderParticipantChoiceLine(person))}
            </List>
        );
    };

    renderModal = () => {
        const {classes} = this.props;
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
                        {this.renderParticipantChoices()}
                        <Button className={classes.saveParticipants} color="primary" variant="contained" onClick={this.handleClose}>Continue</Button>
                    </div>
                </Modal>
            </>
        );
    };

    render() {
        const {classes, hearingStore} = this.props;

        return (
            <>
                {this.renderModal()}
                <Paper>
                    <div>
                        <p className={classes.heading}>Participants</p>
                        <Button variant="contained" color="primary" className={classes.addParticipants}
                                onClick={this.handleOpen}>+ Add participants</Button>
                    </div>
                    <Divider/>
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
                            {hearingStore.participants.map(participant => {
                                return (
                                    <TableRow key={participant.personalCode}>
                                        <TableCell component="th" scope="row">
                                            {participant.firstName} {participant.lastName}
                                        </TableCell>
                                        <TableCell>Claimant</TableCell>
                                        <TableCell>Yes</TableCell>
                                        <TableCell>Yes</TableCell>
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
