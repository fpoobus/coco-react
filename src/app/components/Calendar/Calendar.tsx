import * as React from 'react';
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import { calendarStyles } from 'app/components/Calendar/styles';
import './Calendar.less';
import Calendar, { CalendarTileProperties } from 'react-calendar';
import Paper from '@material-ui/core/Paper/Paper';
import UserStore from 'app/stores/UserStore';
import { inject, observer } from 'mobx-react';
import HearingsDataStore from 'app/stores/HearingsDataStore';
import * as moment from 'moment';

interface DashboardProps extends WithStyles<typeof calendarStyles> {
  userStore?: UserStore;
  hearingsDataStore?: HearingsDataStore;
}

@inject('userStore', 'hearingsDataStore')
@observer
class CalendarCard extends React.Component<DashboardProps> {
  getHearingDates = async (): Promise<Date[]> => {
    const { hearingsDataStore } = this.props;
    return hearingsDataStore.loadHearingDates();
  };

  returnCalendarTileNotices = (tile: CalendarTileProperties) => {
    const { hearingsDataStore } = this.props;
    const isCorrectDay = hearingsDataStore.userHearingDates
      .find(date => tile.date.getDate() === date.getDate() && tile.date.getMonth() === date.getMonth());
    if (tile.view === 'month' && isCorrectDay) {
      return <span>*</span>;
    }

  };

  componentDidMount() {
    this.getHearingDates();
  }

  render() {
    const { classes, hearingsDataStore } = this.props;
    return (
      <>
        <Paper>
          <Calendar
            className={classes.root}
            calendarType="Arabic"
            tileContent={this.returnCalendarTileNotices}
            value={hearingsDataStore.userHearingDates.length > 0 ? new Date(moment.now()) : new Date(moment.now())} />
        </Paper>
      </>
    );
  }
}

export default withStyles(calendarStyles)(CalendarCard);
