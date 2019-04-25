import * as React from 'react';
import AppBar from '@material-ui/core/AppBar/AppBar';
import Toolbar from '@material-ui/core/Toolbar/Toolbar';
import {Menu, MenuItem, Theme, Typography, WithStyles} from '@material-ui/core';
import withStyles from '@material-ui/core/styles/withStyles';
import createStyles from '@material-ui/core/styles/createStyles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import {Link} from 'react-router-dom';
import {inject, observer} from 'mobx-react';
import RouterStore from 'app/stores/RouterStore';
import UserStore from "app/stores/UserStore";


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
        },
        headerLogo: {
            margin: '0 4px',
            height: '44px'
        },
        justifyCenter: {
            display: 'flex',
            justifyContent: 'space-between'
        },
        typoContainer: {
            display: 'flex',
            justifyContent: 'space-between',
        },
        indicator: {
            backgroundColor: '#e8d598'
        },
        colorWhite: {
            color: '#fff'
        },
        logoutIcon: {
            margin: '0 4px',
            height: '22px'
        }
    });

interface HeaderProps extends WithStyles<typeof styles> {
    routerStore?: RouterStore;
    userStore?: UserStore;
}

@inject('routerStore', 'userStore')
@observer
class Header extends React.Component<HeaderProps> {
    state = {
        anchorEl: null,
        profileAnchorEl: null,
        value: '/'
    };

    resize = () => {
        this.forceUpdate();
    }

    componentDidMount() {
        window.addEventListener('resize', this.resize)
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.resize)
    }

    openMobileMenu = (event) => {
        this.setState({anchorEl: event.currentTarget});
    };

    openProfileMenu = (event) => {
        this.setState({profileAnchorEl: event.currentTarget});
    };

    handleClose = () => {
        this.setState({anchorEl: null, profileAnchorEl: null});
    };


    toNewClaim = props => <Link to="/new-claim" {...props} />;

    toDashboard = props => <Link to="/" {...props} />;

    toAboutCourtal = props => <a href="https://www.courtal.com" {...props} />;

    handleChange = (event, value) => {
        const {routerStore} = this.props;
        routerStore.setCurrentTab(value);
    };

    logout = () => {
        this.props.userStore.doLogout();
        window.location.href = "/login"
    }

    render() {
        const {classes, routerStore} = this.props;


        if (window.innerWidth < 835) {
            return (
                <div className={classes.root}>
                    <AppBar className={classes.bar} position="fixed">
                        <Toolbar className={classes.justifyCenter}>
                            <MenuItem className={classes.typoContainer} component={this.toDashboard}
                                      onClick={() => routerStore.setCurrentTab('dashboard')}>

                                <img className={classes.headerLogo}
                                     src="../../../assets/icons/design-tool-quill-2.svg"></img>
                                <Typography className={classes.typo}>COCO</Typography>
                            </MenuItem>
                            <MenuItem onClick={this.openMobileMenu}
                                      aria-owns={this.state.anchorEl ? 'mobile-menu' : undefined}
                                      aria-haspopup="true" className={classes.typoContainer}>
                                <img className={classes.logoutIcon}
                                     src="../../../assets/icons/mobile_menu.svg"></img>
                                <Typography className={classes.typo}>Menu</Typography>

                            </MenuItem>

                            <MenuItem onClick={this.openProfileMenu}
                                      aria-owns={this.state.profileAnchorEl ? 'profile-menu' : undefined}
                                      aria-haspopup="true" className={classes.typoContainer}>
                                <Typography
                                    className={classes.typo}>{this.props.userStore.user.personalCode}&nbsp;</Typography>
                                <img className={classes.logoutIcon} src="../../../assets/icons/cog.svg"></img>
                            </MenuItem>

                        </Toolbar>
                    </AppBar>

                    <Menu
                        id="mobile-menu"
                        anchorEl={this.state.anchorEl}
                        open={Boolean(this.state.anchorEl)}
                        onClose={this.handleClose}
                    >

                        <MenuItem onClick={this.handleClose}><Tab label="Dashboard" value="dashboard"
                                                                  component={this.toDashboard}/></MenuItem>
                        <MenuItem onClick={this.handleClose}><Tab label="Claims" value="newClaim"
                                                                  component={this.toNewClaim}
                        /></MenuItem>
                        <MenuItem onClick={this.handleClose}><Tab label="About E-Justice"
                                                                  value="aboutCourtal"
                                                                  component={this.toAboutCourtal}/></MenuItem>
                    </Menu>


                    <Menu
                        id="profile-menu"
                        anchorEl={this.state.profileAnchorEl}
                        open={Boolean(this.state.profileAnchorEl)}
                        onClose={this.handleClose}
                    >

                        <MenuItem onClick={this.handleClose}>
                            <Typography onClick={this.logout}>LOG OUT</Typography>
                        </MenuItem>
                    </Menu>
                </div>)
        } else {
            return (
                <div className={classes.root}>
                    <AppBar className={classes.bar} position="static">
                        <Toolbar className={classes.justifyCenter}>
                            <MenuItem className={classes.typoContainer} component={this.toDashboard}
                                      onClick={() => routerStore.setCurrentTab('dashboard')}>
                                {/* <AccountBalance
                className={classes.typo}
                aria-owns={this.state.anchorEl ? 'simple-menu' : null}
                aria-haspopup="true"
              /> */}

                                <img className={classes.headerLogo}
                                     src="../../../assets/icons/design-tool-quill-2.svg"></img>
                                <Typography className={classes.typo}>COCO</Typography>
                            </MenuItem>


                            <Tabs
                                value={routerStore.currentTab ? routerStore.currentTab : 'dashboard'}
                                onChange={this.handleChange}
                                classes={{
                                    indicator: classes.indicator
                                }}
                            >
                                <Tab label="Dashboard" value="dashboard" component={this.toDashboard}
                                     className={classes.colorWhite}/>
                                <Tab label="Claims" value="newClaim" component={this.toNewClaim}
                                     className={classes.colorWhite}/>
                                <Tab label="About E-Justice" value="aboutCourtal" component={this.toAboutCourtal}
                                     className={classes.colorWhite}/>
                            </Tabs>
                            <MenuItem onClick={this.openProfileMenu}
                                      aria-owns={this.state.profileAnchorEl ? 'profile-menu' : undefined}
                                      aria-haspopup="true" className={classes.typoContainer}>
                                <Typography
                                    className={classes.typo}>{this.props.userStore.user.personalCode}&nbsp;</Typography>
                                <img className={classes.logoutIcon} src="../../../assets/icons/cog.svg"></img>
                            </MenuItem>
                        </Toolbar>
                    </AppBar>

                    <Menu
                        id="profile-menu"
                        anchorEl={this.state.profileAnchorEl}
                        open={Boolean(this.state.profileAnchorEl)}
                        onClose={this.handleClose}
                    >

                        <MenuItem onClick={this.handleClose}>
                            <Typography onClick={this.logout}>LOG OUT</Typography>
                        </MenuItem>
                    </Menu>
                </div>
            );
        }

    }
}

export default withStyles(styles)(Header);
