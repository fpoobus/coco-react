import * as React from 'react';
import withStyles, {WithStyles} from '@material-ui/core/styles/withStyles';
import {courtHearingDateStyles} from "app/components/HearingDateContainer/styles";
import Divider from "../../../../node_modules/@material-ui/core/Divider/Divider";
import Paper from "../../../../node_modules/@material-ui/core/Paper/Paper";
import HearingStore from "app/stores/HearingStore";
import {inject, observer} from "mobx-react";
import {Button} from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import HearingCalendar from "app/components/HearingCalender/HearingCalendar";
import CourtHearingCalendar from "app/components/HearingTimeTable/HearingTimeTable";

interface CourtHearingDateProps extends WithStyles<typeof courtHearingDateStyles> {
    hearingStore?: HearingStore
}

@inject('hearingStore')
@observer
class HearingDateContainer extends React.Component<CourtHearingDateProps> {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(date) {

    }

    state = {
        dateModalOpen: false,
        timeModalOpen: false
    };

    setDateModalOpen = (isOpen: boolean) => {
        this.setState({dateModalOpen: isOpen})
    };

    setTimeModalOpen = (isOpen: boolean) => {
        this.setState({timeModalOpen: isOpen})
    };

    render() {
        const {classes} = this.props;


        return (
            <>
                <Paper>
                    <div>
                        <p className={classes.heading}>1st hearing in case 132-CIV-2018</p>
                    </div>
                    <Divider/>
                    <div className={classes.dateContainer}>
                        <h3>Pick a suitable date from the calendar</h3>
                        <p>Date: {this.props.hearingStore.activeDate ? this.props.hearingStore.activeDate.toString().split(' ').slice(0, 4).join(' ') : ''}</p>

                        <div>
                            <Button variant="contained" color="secondary" onClick={() => this.setDateModalOpen(true)}>
                                Choose date
                            </Button>
                            <Dialog
                                open={this.state.dateModalOpen}
                                onClose={() => this.setDateModalOpen(false)}
                                className={'hearing-dialog'}
                                aria-labelledby="alert-dialog-title"
                                aria-describedby="alert-dialog-description">
                                <DialogContent>
                                    <HearingCalendar />
                                </DialogContent>
                                <DialogActions>
                                    <Button onClick={() => this.setDateModalOpen(false)} color="primary"
                                            variant="contained" autoFocus>
                                        Close
                                    </Button>
                                </DialogActions>
                            </Dialog>
                        </div>


                        <h3>Pick the available time from the timetable</h3>
                        <p>Time: {this.props.hearingStore.activeTime ? this.props.hearingStore.activeTime.toString() : ''}</p>

                        <div>
                            <Button variant="contained" color="secondary" onClick={() => this.setTimeModalOpen(true)}>
                                Choose Time
                            </Button>
                            <Dialog
                                open={this.state.timeModalOpen}
                                onClose={() => this.setTimeModalOpen(false)}
                                className={'hearing-dialog'}
                                aria-labelledby="alert-dialog-title"
                                aria-describedby="alert-dialog-description"
                            >
                                <DialogTitle id="alert-dialog-title">{"Select hearing date"}</DialogTitle>
                                <DialogContent>
                                    <CourtHearingCalendar />
                                </DialogContent>
                                <DialogActions>
                                    <Button onClick={() => this.setTimeModalOpen(false)} color="primary"
                                            variant="contained" autoFocus>
                                        Close
                                    </Button>
                                </DialogActions>
                            </Dialog>
                        </div>

                    </div>
                </Paper>
            </>
        );
    }
}

export default withStyles(courtHearingDateStyles)(HearingDateContainer);
