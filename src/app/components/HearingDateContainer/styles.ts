import {Theme} from '@material-ui/core';
import createStyles from '@material-ui/core/styles/createStyles';

export const courtHearingDateStyles = (theme: Theme) => createStyles({
  justifyCenter: {
    display: 'flex',
    justifyContent: 'center',
      float: 'left'
  },
  card: {
    minHeight: 200
  },
  line: {
      height: '1px',
      backgroundColor: '#2196f3',
      padding: '0',
      border: 'none'
  },
    inputDay: {
        width: '20px',
        height: '25px',
        marginLeft: '5px',
        marginRight: '5px'
    },
    inputMonth: {
        width: '20px',
        height: '25px',
        marginLeft: '5px',
        marginRight: '5px'
    },
    inputYear: {
        width: '33px',
        height: '25px',
        marginLeft: '5px',
        marginRight: '5px'
    },
    slash: {
      fontSize: '22px',
      marginTop: '4px'
    },
    heading: {
        fontSize: '26px',
        display: 'inline-block',
        padding: '0 30px 0 30px',
        marginBottom: '15px',
        marginTop: '15px',
    },
    dateContainer: {
        paddingBottom: '20px',
        paddingTop: '20px',
        paddingLeft: '20px',
    }
});
