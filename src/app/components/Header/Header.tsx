import * as React from 'react';
import AppBar from '@material-ui/core/AppBar/AppBar';
import Toolbar from '@material-ui/core/Toolbar/Toolbar';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import withStyles, {WithStyles} from '@material-ui/core/styles/withStyles';
import createStyles from '@material-ui/core/styles/createStyles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import {Link} from 'react-router-dom';
import {inject, observer} from 'mobx-react';
import RouterStore from 'app/stores/RouterStore';
import UserStore from "app/stores/UserStore";
import {Theme} from '@material-ui/core/styles/createMuiTheme';
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import List from "@material-ui/core/List";
import DialogActions from "@material-ui/core/DialogActions";
import axios from "axios";
import {runInAction} from "mobx";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";


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
        value: '/',
        allUsers: [],
        chooseUser: false,
        chooseUserLoading: false
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

    handleChooseUser = (isOpen: boolean) => {
        if (isOpen) {
            this.getUserList();
        }
        this.setState({chooseUser: isOpen});
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
    };

    getUserList = () => {
        this.setState({chooseUserLoading: true});
        axios.get(`http://africa.nortal.com/person-registry/api/v1/persons?dateFrom=1900-05-01T19%3A15%3A41.617Z`, {
            headers: {}
        })
            .then(res => {
                runInAction(() => {
                    this.setState({chooseUserLoading: false, allUsers: res.data});
                });
            }).catch(e => {
        });
    };

    renderAllUsers() {
        let elements = [];
        this.state.allUsers.forEach(user => {
            let item = user.code + " - " + user.givenName + " "+ user.middleNames.join(" ") + user.givenName;
            elements.push(<ListItem button>
                <ListItemText onClick={() => {
                    this.props.userStore.setUseFromRaw(user);
                    this.handleChooseUser(false);
                }} primary={item}/>
            </ListItem>);
        });
        return elements;
    }

    renderFindAllModalAndButton() {
        return <>
            <Dialog
                fullScreen={false}
                open={this.state.chooseUser}
                onClose={() => this.handleChooseUser(false)}
                aria-labelledby="responsive-dialog-title"
            >
                <DialogTitle
                    id="responsive-dialog-title">{"Select User to login with"}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {this.renderAllUsers()}
                    </DialogContentText>

                    <List component="nav">

                    </List>


                </DialogContent>
                <DialogActions>
                    <Button onClick={this.handleClose} color="primary" autoFocus>
                        Close
                    </Button>
                </DialogActions>
            </Dialog></>
    }

    render() {
        const {classes, routerStore} = this.props;


        if (window.innerWidth < 835) {
            return (<>
                {this.renderFindAllModalAndButton()}
                <div className={classes.root}>
                    <AppBar className={classes.bar} position="fixed">
                        <Toolbar className={classes.justifyCenter}>
                            <MenuItem className={classes.typoContainer} component={this.toDashboard}
                                      onClick={() => routerStore.setCurrentTab('dashboard')}>

                                <img className={classes.headerLogo}
                                     src="../../../assets/icons/design-tool-quill-2.svg"/>
                                <Typography className={classes.typo}>COCO</Typography>
                            </MenuItem>
                            <MenuItem onClick={this.openMobileMenu}
                                      aria-owns={this.state.anchorEl ? 'mobile-menu' : undefined}
                                      aria-haspopup="true" className={classes.typoContainer}>
                                <img className={classes.logoutIcon} src="../../../assets/icons/mobile_menu.svg"/>
                                <Typography className={classes.typo}>Menu</Typography>

                            </MenuItem>

                            <MenuItem onClick={() => this.handleChooseUser(true)}>
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
                </div>
            </>)
        } else {
            return (
                <>
                    {this.renderFindAllModalAndButton()}
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
                                         src="../../../assets/icons/design-tool-quill-2.svg"/>
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
                                <MenuItem onClick={() => this.handleChooseUser(true)}>
                                    <Typography
                                        className={classes.typo}>{this.props.userStore.user.personalCode}&nbsp;</Typography>
                                    <img className={classes.logoutIcon} src="../../../assets/icons/cog.svg"/>
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
                </>
            );
        }

    }
}

export default withStyles(styles)(Header);
