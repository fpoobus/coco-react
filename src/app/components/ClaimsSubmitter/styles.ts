import { Theme } from '@material-ui/core';
import createStyles from '@material-ui/core/styles/createStyles';

export const claimsSubmitterStyles = (theme: Theme) => createStyles({
  justifyCenter: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center'
  },
  card: {
    minHeight: 300
  },
  btnHover:{
    '&:hover': {
      backgroundColor: '#e8d081',
  },
  },
  claimIcon: {
    width:'5rem',
    marginBottom: '1rem'
  }
});
