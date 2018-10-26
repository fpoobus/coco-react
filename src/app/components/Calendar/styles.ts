import { Theme } from '@material-ui/core';
import createStyles from '@material-ui/core/styles/createStyles';

export const calendarStyles = (theme: Theme) => createStyles({
  root: {
    minHeight: 300,
    minWidth: '100%',
    border: 'none',
    borderRadius: 4
  }
});
