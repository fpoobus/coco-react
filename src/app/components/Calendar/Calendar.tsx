import * as React from 'react';
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import { calendarStyles } from 'app/components/Calendar/styles';
import '../../../../node_modules/react-calendar/dist/Calendar.less';
import Calendar from 'react-calendar';

interface DashboardProps extends WithStyles<typeof calendarStyles> {

}

class CalendarCard extends React.Component<DashboardProps> {
  render() {
    return (
      <>
        <Calendar calendarType="Arabic" />
      </>
    );
  }
}

export default withStyles(calendarStyles)(CalendarCard);
