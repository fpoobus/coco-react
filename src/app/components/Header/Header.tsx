import * as React from 'react';
import AppBar from '@material-ui/core/AppBar/AppBar';
import Toolbar from '@material-ui/core/Toolbar/Toolbar';
import { MenuItem, Theme, Typography, WithStyles } from '@material-ui/core';
import withStyles from '@material-ui/core/styles/withStyles';
import createStyles from '@material-ui/core/styles/createStyles';
import AccountBalance from '@material-ui/icons/AccountBalance';
import FaceIcon from '@material-ui/icons/Face';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { Link } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import RouterStore from 'app/stores/RouterStore';


export const styles = (theme: Theme) =>
  createStyles({
    root: {
      marginBottom: '64px'
    },
    bar: {
      backgroundColor: '#131b23'
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

interface HeaderProps extends WithStyles<typeof styles> {
  routerStore?: RouterStore
}

@inject('routerStore')
@observer
class Header extends React.Component<HeaderProps> {
  state = {
    anchorEl: null,
    value: '/'
  };

  handleClick = (event) => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };


  toNewClaim = props => <Link to="/new-claim" {...props} />;

  toDashboard = props => <Link to="/" {...props} />;

  handleChange = (event, value) => {
    const { routerStore } = this.props;
    routerStore.setCurrentTab(value);
  };

  render() {
    const { classes, routerStore } = this.props;
    return (
      <div className={classes.root}>
        <AppBar className={classes.bar} position="static">
          <Toolbar className={classes.justifyCenter}>
            <MenuItem className={classes.typoContainer} component={this.toDashboard} onClick={() => routerStore.setCurrentTab('dashboard')}>
              <AccountBalance
                className={classes.typo}
                aria-owns={this.state.anchorEl ? 'simple-menu' : null}
                aria-haspopup="true"
              />
            </MenuItem>
            <Tabs
              value={routerStore.currentTab ? routerStore.currentTab : 'dashboard'}
              onChange={this.handleChange}
              classes={{
                indicator: classes.indicator
              }}
            >
              <Tab label="Dashboard" value="dashboard" component={this.toDashboard} className={classes.colorWhite} />
              <Tab label="Claims" value="newClaim" component={this.toNewClaim} className={classes.colorWhite} />
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
