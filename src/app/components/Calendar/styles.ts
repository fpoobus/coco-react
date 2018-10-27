import { Theme } from '@material-ui/core';
import createStyles from '@material-ui/core/styles/createStyles';

export const calendarStyles = (theme: Theme) => createStyles({
  root: {
    minHeight: 300,
    minWidth: '100%',
    border: 'none',
    borderRadius: 4
  },
  hearing: {
    backgroundImage: `url(${'../../../assets/img/SVG_Circle.svg'})`,
    zIndex: 100,
    backgroundSize: 'cover',
    display: 'inline-block',
    position: 'absolute',
    left: 0,
    right: 0,
    top: '80%',
    margin: 'auto',
    width: 7,
    height: 7
  }
});
