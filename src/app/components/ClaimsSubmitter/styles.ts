import { Theme } from '@material-ui/core';
import createStyles from '@material-ui/core/styles/createStyles';

export const claimsSubmitterStyles = (theme: Theme) => createStyles({
  justifyCenter: {
    display: 'flex',
    justifyContent: 'center'
  },
  card: {
    minHeight: '20%'
  }
});
