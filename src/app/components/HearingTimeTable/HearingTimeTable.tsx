import * as React from 'react';
import { WithStyles } from '@material-ui/core';
import withStyles from '@material-ui/core/styles/withStyles';
import Paper from "../../../../node_modules/@material-ui/core/Paper/Paper";
import Divider from "../../../../node_modules/@material-ui/core/Divider/Divider";
import Avatar from "../../../../node_modules/@material-ui/core/Avatar/Avatar";
import LockIcon from "../../../../node_modules/@material-ui/core/SvgIcon/SvgIcon";
import Typography from "../../../../node_modules/@material-ui/core/Typography/Typography";
import {courtHearingCalendarStyles} from "app/components/HearingTimeTable/styles";

interface CourtHearingCalendarProps extends WithStyles<typeof courtHearingCalendarStyles> {
}


class CourtHearingCalendar extends React.Component<CourtHearingCalendarProps> {
    constructor (props) {
        super(props);
        this.acceptTime = this.acceptTime.bind(this);
    }

    acceptTime = (time: string) => {
    };

  render() {
    const { classes } = this.props;
    return (
      <>
          <Paper className={classes.card}>
              <div className={classes.justifyCenter}>
                  <div className={classes.calendarHeader}>
                      25. October 2018
                  </div>
              </div>
              <Divider light={false} className={classes.slash}/>
              <div className={classes.judgeBackground}>
                  <div className={classes.center}>
                      <Avatar className={classes.avatar}>
                          <LockIcon/>
                      </Avatar>
                      <Typography component="h1" variant="h6">
                          Lady Gaga
                      </Typography>
                  </div>
              </div>
              <Divider light={false} className={classes.slash}/>
              <div>
                  <div className={classes.timetableBackground}>
                      <div className={classes.chooseDateContainer}>
                          09:15 - 10:00
                      </div>
                      <div className={classes.judgeActivity}>
                          Lecture
                      </div>
                  </div>
                  <Divider />
                  <div className={classes.timetableBackground}>
                      <div className={classes.chooseDateContainer}>
                          10:00 - 12:00
                      </div>
                      <div className={classes.judgeActivity}>
                          Hearing
                      </div>
                  </div>
                  <Divider />
                  <div className={classes.timetableBackground}>
                      <div className={classes.chooseDateContainer}>
                          12:00 - 13:00
                      </div>
                      <div className={classes.judgeActivity}>
                          Lunch
                      </div>
                  </div>
                  <Divider />
                  <div onClick={() => this.acceptTime('13:00 - 14:45')} className={classes.pointer}>
                      <div className={classes.chooseDateContainer}>
                          13:00 - 14:45
                      </div>
                      <div className={classes.judgeActivity}>

                      </div>
                  </div>
                  <Divider />
                  <div className={classes.timetableBackground}>
                      <div className={classes.chooseDateContainer}>
                          14:45 - 16:15
                      </div>
                      <div className={classes.judgeActivity}>
                          Hearing
                      </div>
                  </div>
              </div>
          </Paper>
      </>
    );
  }
}

export default withStyles(courtHearingCalendarStyles)(CourtHearingCalendar);
