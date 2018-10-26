import * as React from 'react';
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import { calendarStyles } from 'app/components/Calendar/styles';
import '../../../../node_modules/react-calendar/dist/Calendar.less';
import Calendar from 'react-calendar';
import Paper from '@material-ui/core/Paper/Paper';

interface DashboardProps extends WithStyles<typeof calendarStyles> {

}

class CalendarCard extends React.Component<DashboardProps> {
  render() {
    const { classes } = this.props;
    return (
      <>
        <Paper>
          <Calendar className={classes.root} calendarType="Arabic" />
        </Paper>
      </>
    );
  }
}

export default withStyles(calendarStyles)(CalendarCard);
