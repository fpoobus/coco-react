import { Theme } from '@material-ui/core';
import createStyles from '@material-ui/core/styles/createStyles';

export const clientCasesStyles = (theme: Theme) => createStyles({
  root: {
    overflowX: 'auto'
  },
  title: {
    marginLeft: 20,
    marginTop: 16
  }
});
