import * as React from 'react';
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import { calendarStyles } from 'app/components/Calendar/styles';
import '../../../../node_modules/react-calendar/dist/Calendar.less';
import Calendar from 'react-calendar';
import Paper from '@material-ui/core/Paper/Paper';
import UserStore from 'app/stores/UserStore';
import { inject, observer } from 'mobx-react';

interface DashboardProps extends WithStyles<typeof calendarStyles> {
  userStore?: UserStore;
}

@inject('userStore')
@observer
class CalendarCard extends React.Component<DashboardProps> {
  render() {
    const { classes, userStore } = this.props;
    return (
      <>
        <Paper>
          <Calendar className={classes.root} calendarType="Arabic" value={new Date(userStore.currentTime)} />
        </Paper>
      </>
    );
  }
}

export default withStyles(calendarStyles)(CalendarCard);
