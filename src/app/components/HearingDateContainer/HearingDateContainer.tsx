import * as React from 'react';
import { WithStyles } from '@material-ui/core';
import withStyles from '@material-ui/core/styles/withStyles';
import {courtHearingDateStyles} from "app/components/HearingDateContainer/styles";
import Divider from "../../../../node_modules/@material-ui/core/Divider/Divider";
import Paper from "../../../../node_modules/@material-ui/core/Paper/Paper";
import HearingStore from "app/stores/HearingStore";
import {inject, observer} from "mobx-react";

interface CourtHearingDateProps extends WithStyles<typeof courtHearingDateStyles> {
  hearingStore?: HearingStore
}

@inject('hearingStore')
@observer
class HearingDateContainer extends React.Component<CourtHearingDateProps> {
    constructor (props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(date) {

    }

  render() {
    const { classes } = this.props;
    return (
      <>
          <Paper>
              <div>
                  <p className={classes.heading}>1st hearing in case 132-CIV-2018</p>
              </div>
              <Divider />
            <div className={classes.dateContainer}>
                <h3>Pick a suitable date from the calendar</h3>
                <p>Date: {this.props.hearingStore.activeDate ? this.props.hearingStore.activeDate.toString().split(' ').slice(0,4).join(' ') : ''}</p>
                <h3>Pick the available time from the timetable</h3>
                <p>Time: {this.props.hearingStore.activeTime ? this.props.hearingStore.activeTime.toString() : ''}</p>
            </div>
          </Paper>
      </>
    );
  }
}

export default withStyles(courtHearingDateStyles)(HearingDateContainer);
