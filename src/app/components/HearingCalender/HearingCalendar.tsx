import * as React from 'react';
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import { calendarStyles } from 'app/components/Calendar/styles';
import './Calendar.less';
import Calendar from 'react-calendar';
import Paper from '@material-ui/core/Paper/Paper';
import { inject } from 'mobx-react';
import * as moment from 'moment';
import HearingStore from "app/stores/HearingStore";

interface DashboardProps extends WithStyles<typeof calendarStyles> {
  hearingStore?: HearingStore;
}

@inject('hearingStore')
class HearingCalendar extends React.Component<DashboardProps> {

  componentDidMount() {
      this.props.hearingStore.setActiveDate(new Date(moment.now()).toString())
  };

  onChange = (value) => {
    this.props.hearingStore.setActiveDate(value)
      this.props.hearingStore.setTimeTableLoading(true)
  };

  render() {
    const { classes } = this.props;
    return (
      <>
        <Paper>
          <Calendar
            className={classes.root}
            calendarType="Arabic"
            value={new Date(moment.now())}
            onChange={this.onChange}
          />
        </Paper>
      </>
    );
  }
}

export default withStyles(calendarStyles)(HearingCalendar);
