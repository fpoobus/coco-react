import * as React from 'react';
import AppBar from '@material-ui/core/AppBar/AppBar';
import Toolbar from '@material-ui/core/Toolbar/Toolbar';
import { Theme, WithStyles } from '@material-ui/core';
import withStyles from '@material-ui/core/styles/withStyles';
import createStyles from '@material-ui/core/styles/createStyles';


export const styles = (theme: Theme) => createStyles({
  root: {
    marginBottom: '64px'
  },
  bar: {
    backgroundColor: theme.palette.primary.dark
  }
});

interface HeaderProps extends WithStyles<typeof styles> {
}

class Header extends React.Component<HeaderProps> {

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <AppBar className={classes.bar} position="static">
          <Toolbar>

          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

export default withStyles(styles)(Header);
