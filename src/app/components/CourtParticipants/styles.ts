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
      fontSize: '30px',
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
        backgroundColor: '#2196f3',
        color: 'white',
        padding: '10px 20px 10px 20px',
        borderRadius: '10px',
        border: 'none',
        marginTop: '15px',
        marginRight: '30px',
        cursor: 'pointer'
    },
});
