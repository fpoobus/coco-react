import * as React from 'react';
import withStyles, {WithStyles} from '@material-ui/core/styles/withStyles';
import Paper from "../../../../node_modules/@material-ui/core/Paper/Paper";
import {courtHearingCalendarStyles} from "app/components/HearingTimeTable/styles";
import Divider from "../../../../node_modules/@material-ui/core/Divider/Divider";
import Avatar from "../../../../node_modules/@material-ui/core/Avatar/Avatar";
import PersonIcon from "../../../../node_modules/@material-ui/icons/PermIdentity";
import Typography from "../../../../node_modules/@material-ui/core/Typography/Typography";
import HearingStore from "app/stores/HearingStore";
import {inject, observer} from "mobx-react";
import Grid from "@material-ui/core/Grid";
import CircularProgress from "@material-ui/core/CircularProgress";
import CaseStore from "app/stores/CaseStore";

interface CourtHearingCalendarProps extends WithStyles<typeof courtHearingCalendarStyles> {
    hearingStore?: HearingStore
    caseStore?: CaseStore
    activeDate: string;
}

@inject('hearingStore', 'caseStore')
@observer
class HearingTimeTable extends React.Component<CourtHearingCalendarProps> {
    constructor (props) {
        super(props);
        this.state = {};
        this.acceptTime = this.acceptTime.bind(this);
    }

    acceptTime = (time: string) => {
        this.props.hearingStore.setActiveTime(time);
    };

    stopLoading = () => {
        setTimeout(() => {
            this.props.hearingStore.setTimeTableLoading(false);
        }, 3000)
    };

    loaderTimetable() {
        this.stopLoading();
        return this.props.hearingStore.timetableLoading && <>
            <Grid container justify="center">
                <Grid item>

                    <CircularProgress size={50}/>

                </Grid>
            </Grid>
        </>;
    }


    renderTimetableData = () => {
        const { classes } = this.props;
        return (
            <>
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
                    <div onClick={() => this.acceptTime('13:00 - 15:00')} className={classes.pointer}>
                        <div className={classes.chooseDateContainer}>
                            13:00 - 15:00
                        </div>
                        <div className={classes.judgeActivity}>

                        </div>
                    </div>
                    <Divider />
                    <div className={classes.timetableBackground}>
                        <div className={classes.chooseDateContainer}>
                            15:00 - 16:30
                        </div>
                        <div className={classes.judgeActivity}>
                            Hearing
                        </div>
                    </div>
                </div>
            </>
        );
    };

  render() {

      const { classes } = this.props;
    return (
      <>
          {!!this.props.hearingStore.judge &&
          <Paper className={classes.card}>
              <div className={classes.justifyCenter}>
                  <div className={classes.calendarHeader}>
                      {this.props.hearingStore.activeDate ? this.props.hearingStore.activeDate.toString().split(' ').slice(0, 4).join(' ') : ''}
                  </div>
              </div>
              <Divider light={false} className={classes.slash}/>
              <div className={classes.judgeBackground}>
                  <div className={classes.center}>
                      <Avatar className={classes.avatar}>
                          <PersonIcon/>
                      </Avatar>
                      <Typography component="h1" variant="h6">
                          {this.props.caseStore.judge}
                      </Typography>
                  </div>
              </div>
              <Divider light={false} className={classes.slash}/>
              {this.loaderTimetable()}
              {!this.props.hearingStore.timetableLoading && this.renderTimetableData()}
          </Paper>
          }
      </>
    );
  }
}

export default withStyles(courtHearingCalendarStyles)(HearingTimeTable);
