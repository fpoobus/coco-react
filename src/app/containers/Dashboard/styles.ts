import { Theme } from '@material-ui/core';
import createStyles from '@material-ui/core/styles/createStyles';

export const dashboardStyles = (theme: Theme) => createStyles({
  root: {
    display: 'flex',
    justifyContent: 'center',
    width: '100%'
  },
  container: {
    width: '75%'
  }
});
