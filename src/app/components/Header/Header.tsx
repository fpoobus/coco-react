import * as React from 'react';
import AppBar from '@material-ui/core/AppBar/AppBar';
import Toolbar from '@material-ui/core/Toolbar/Toolbar';
import { Theme, WithStyles, Typography, MenuItem } from '@material-ui/core';
import withStyles from '@material-ui/core/styles/withStyles';
import createStyles from '@material-ui/core/styles/createStyles';
import AccountBalance from '@material-ui/icons/AccountBalance';
import FaceIcon from '@material-ui/icons/Face';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

export const styles = (theme: Theme) =>
  createStyles({
    root: {
      marginBottom: '64px'
    },
    bar: {
      backgroundColor: theme.palette.primary.dark
    },
    typo: {
      color: theme.palette.primary.light,
      margin: '0 4px'
    },
    justifyCenter: {
      display: 'flex',
      justifyContent: 'space-between'
    },
    typoContainer: {
      display: 'flex',
      justifyContent: 'space-between',
      width: '6%'
    },
    indicator: {
      backgroundColor: '#e8d598'
    },
    colorWhite: {
      color: '#fff'
    }
  });

interface HeaderProps extends WithStyles<typeof styles> {}
interface IProps {
  history?: any
}

class Header extends React.Component<IProps & HeaderProps> {
  state = {
    anchorEl: null,
    value: 0
  };

  handleClick = (event) => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  // handleChange = (event, value) => {
  //   this.setState({ value });
  // };

  handleChange = (event: any, value: any) => {
    this.props.history.push(value);
};

  render() {
    const { classes } = this.props;
    // let route = '/' + this.props.history.location.pathname.split('/')[1]; 

    return (
      <div className={classes.root}>
        <AppBar className={classes.bar} position="static">
          <Toolbar className={classes.justifyCenter}>
            <MenuItem className={classes.typoContainer}>
              <AccountBalance
                className={classes.typo}
                aria-owns={this.state.anchorEl ? 'simple-menu' : null}
                aria-haspopup="true"
                onClick={this.handleClick}
              />
            </MenuItem>
            <Tabs
                value={this.state.value}
              onChange={this.handleChange}
              classes={{
                indicator: classes.indicator
              }}
            >            
<<<<<<< HEAD
              <Tab label="Dashboard" value="/"  className={classes.colorWhite} />
              <Tab label="Claims" value="/new-claim" className={classes.colorWhite} />
=======
              <Tab label="Dashboard" className={classes.colorWhite} />
              <Tab label="Claims" className={classes.colorWhite} />
>>>>>>> 010a14c869207533c57e957b940190cc2d30345b
            </Tabs>
            <MenuItem className={classes.typoContainer}>
              <Typography className={classes.typo}>LOG OUT</Typography>
              <FaceIcon className={classes.typo} />
            </MenuItem>
          </Toolbar>
        </AppBar>
        {/* Will be used for mobile view later */}
        {/* <Menu
          id="simple-menu"
          anchorEl={this.state.anchorEl}
          open={Boolean(this.state.anchorEl)}
          onClose={this.handleClose}
        >
          <MenuItem onClick={this.handleClose}>Dashboard</MenuItem>
          <MenuItem onClick={this.handleClose}>Claims</MenuItem>
          <MenuItem onClick={this.handleClose}>Cases</MenuItem>
        </Menu> */}
      </div>
    );
  }
}

export default withStyles(styles)(Header);
