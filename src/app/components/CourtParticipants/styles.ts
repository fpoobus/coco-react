import { Theme } from '@material-ui/core';
import createStyles from '@material-ui/core/styles/createStyles';

export const courtParticipantsStyles = (theme: Theme) => createStyles({
  justifyCenter: {
    display: 'flex',
    justifyContent: 'center'
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
    heading: {
      fontSize: '26px',
        display: 'inline-block',
        padding: '0 30px 0 30px',
        marginBottom: '15px',
        marginTop: '15px',
    },
    addParticipants: {
      display: 'inline-block',
        float: 'right',
        justifyContent: 'center',
        margin: '0 auto',
        marginTop: '10px',
        marginRight: '30px',
    },
    paper: {
        position: 'absolute',
        width: theme.spacing(50),
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing(4),
    },
    saveParticipants: {
      marginTop: '30px'
    },
});
