import { Theme } from '@material-ui/core';
import createStyles from '@material-ui/core/styles/createStyles';

export const courtHearingCalendarStyles = (theme: Theme) => createStyles({
  justifyCenter: {
    display: 'flex',
    justifyContent: 'center',
  },
    center: {
      margin: '0 auto',
        textAlign: 'center',
       // backgroundColor: 'rgba(232,213,152,0.5)'
    },
  card: {
    minHeight: 200,
  },
    calendarHeader: {
      fontSize: '20px',
        paddingTop: '20px',
        paddingBottom: '20px'

    },
    avatar: {
        margin: 'auto',
        marginBottom: '5px',
        backgroundColor: theme.palette.secondary.main,
    },
    chooseDateContainer: {
      height: '40px',
        fontSize: '18px',
        display: 'inline-block',
        verticalAlign: 'middle',
        marginTop: '25px',
        paddingLeft: '10%',

    },
    judgeActivity: {
      display: 'inline-block',
      float: 'right',
        fontSize: '18px',
        marginTop: '25px',
        paddingRight: '10%',
    },
    timetableBackground: {
      backgroundColor: 'rgba(232,213,152,0.5)',
    },
    judgeBackground: {
      backgroundColor: 'rgba(232,213,152,0.8)',
        paddingTop: '10px'
    },
    slash: {
        height: '3px',
        backgroundColor: '#000000'
    },
    pointer: {
    cursor: 'pointer',
    }
});
