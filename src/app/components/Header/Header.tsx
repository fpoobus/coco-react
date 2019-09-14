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
import DialogActions from "@material-ui/core/DialogActions";
import {runInAction} from "mobx";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import User, {ROLES} from "app/models/User";
import Grid from "@material-ui/core/Grid";
import CircularProgress from "@material-ui/core/CircularProgress";
import TextField from "@material-ui/core/TextField";
import cocoAxios from "app/axiosConfig";

export const TabPanel = (props) => {
    const {children, value, index, ...other} = props;

    return (
        <Typography
            component="div"
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {children}
        </Typography>
    );
};


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
        chooseUserLoading: false,
        activeTab: 0,
        filterUsers: ''
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

    handleTabChange = (event, index) => {
        this.setState({activeTab: index})
    };

    logout = () => {
        this.props.userStore.doLogout();
        window.location.href = "/login"
    };

    getUserList = () => {
        this.setState({chooseUserLoading: true});
        cocoAxios.get(`/person/api/v1/persons?dateFrom=1900-05-01T19%3A15%3A41.617Z`, {
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

        let filteredUsers = this.state.allUsers;
        if (this.state.filterUsers && this.state.filterUsers !== '') {
            filteredUsers = filteredUsers.filter((user => {
                let item = (user.code + " - " + user.givenName + " " + user.middleNames.join(" ") + user.familyName).replace(/\s\s+/g, ' ');

                return item.toUpperCase().includes(this.state.filterUsers.toUpperCase());
            }))
        }

        filteredUsers.forEach((user, index) => {
            let item = (user.code + " - " + user.givenName + " " + user.middleNames.join(" ") + user.familyName).replace(/\s\s+/g, ' ');
            let key = "curUser" + index;
            elements.push(<ListItem key={key} onClick={() => {
                this.props.userStore.setUseFromRaw(user);
                this.handleChooseUser(false);
            }} button>
                <ListItemText primary={item}/>
            </ListItem>);
        });

        return elements;
    }

    renderJudges() {
        const judges = [];
        judges.push({
            firstName: "Foster",
            middleName: "Edward",
            lastName: "Abner",
            personalCode: "11",
            role: ROLES.JUDGE
        } as User);

        judges.push({
            firstName: "Roy",
            middleName: "John",
            lastName: "Jayce",
            personalCode: "12",
            role: ROLES.JUDGE
        } as User);

        judges.push({
            firstName: "Bert",
            middleName: "",
            lastName: "Alfred",
            personalCode: "13",
            role: ROLES.JUDGE
        } as User);

        judges.push({
            firstName: "Jefferson",
            middleName: "Archer",
            lastName: "Alfred",
            personalCode: "14",
            role: ROLES.JUDGE
        } as User);

        judges.push({
            firstName: "Garth",
            middleName: "",
            lastName: "Beau",
            personalCode: "15",
            role: ROLES.JUDGE
        } as User);

        judges.push({
            firstName: "Wyatt",
            middleName: "",
            lastName: "Edwin",
            personalCode: "16",
            role: ROLES.JUDGE
        } as User);

        judges.push({
            firstName: "Samson",
            middleName: "Chauncey",
            lastName: "Lee",
            personalCode: "17",
            role: ROLES.JUDGE
        } as User);

        const elements = [];

        judges.forEach((user: User, index) => {
            let key = "judge" + index;
            let item = "JUDGE" + " - " + user.firstName + " " + user.middleName + " " + user.lastName;
            elements.push(<ListItem key={key} onClick={() => {
                this.props.userStore.setUser(user);
                this.handleChooseUser(false);
            }} button>
                <ListItemText primary={item}/>
            </ListItem>);
        });

        return elements;
    }

    renderClerks() {

        const clerks = [];
        clerks.push({
            firstName: "Ural",
            middleName: "Sandra",
            lastName: "Eustache",
            personalCode: "111",
            role: ROLES.CLERK
        } as User);

        clerks.push({
            firstName: "Marduk",
            middleName: "Ishtar",
            lastName: "Ralph",
            personalCode: "121",
            role: ROLES.CLERK
        } as User);

        clerks.push({
            firstName: "Iosephus",
            middleName: "",
            lastName: "Roar",
            personalCode: "131",
            role: ROLES.CLERK
        } as User);

        clerks.push({
            firstName: "Vijaya",
            middleName: "",
            lastName: "Meklit",
            personalCode: "141",
            role: ROLES.CLERK
        } as User);


        const elements = [];

        clerks.forEach((user: User, index) => {
            let key = "clerk" + index;
            let item = "CLERK" + " - " + user.firstName + " " + user.middleName + " " + user.lastName;
            elements.push(<ListItem key={key} onClick={() => {
                this.props.userStore.setUser(user);
                this.handleChooseUser(false);
            }} button>
                <ListItemText primary={item}/>
            </ListItem>);
        });

        return elements;
    }

    a11yProps(index) {
        return {
            id: `simple-tab-${index}`,
            'aria-controls': `simple-tabpanel-${index}`,
        };
    }

    handleFieldChange = name => event => {
        this.setState({filterUsers: event.target.value})
    };

    renderFindAllModalAndButton() {
        return <>
            <Dialog
                fullScreen={false}
                open={this.state.chooseUser}
                onClose={() => this.handleChooseUser(false)}
                aria-labelledby="responsive-dialog-title"
                className={'heading-dialog'}>
                <br/>
                <br/>
                <br/>
                {!this.state.chooseUserLoading &&
                <DialogTitle id="responsive-dialog-title">{"Select User to login as"}</DialogTitle>}
                <DialogContent>

                    {this.state.chooseUserLoading && <>
                        <Grid container justify="center">
                            <Grid item>

                                <CircularProgress size={50}/>

                            </Grid>
                        </Grid>
                    </>}

                    {!this.state.chooseUserLoading && <>
                        <AppBar position="static">
                            <div style={{position: "absolute", top: "0", width: "100%"}}>
                                <Tabs centered value={this.state.activeTab} onChange={this.handleTabChange}
                                      aria-label="simple tabs example">
                                    <Tab label="Users" {...this.a11yProps(0)} />
                                    <Tab label="Judges" {...this.a11yProps(1)} />
                                    <Tab label="Clerks" {...this.a11yProps(2)} />
                                </Tabs>
                            </div>
                        </AppBar>
                        <TabPanel value={this.state.activeTab} index={0}>
                            <TextField
                                label="Search"
                                variant="filled"
                                fullWidth
                                value={this.state.filterUsers}
                                onChange={this.handleFieldChange(this.state.filterUsers)}
                                margin="normal"
                            />
                            {this.renderAllUsers()}
                        </TabPanel>
                        <TabPanel value={this.state.activeTab} index={1}>
                            {this.renderJudges()}
                        </TabPanel>
                        <TabPanel value={this.state.activeTab} index={2}>
                            {this.renderClerks()}
                        </TabPanel>
                    </>}

                </DialogContent>
                <DialogActions>
                    <Button onClick={() => this.logout()} variant="contained" color="secondary" autoFocus>
                        Log Out
                    </Button>
                    <Button onClick={() => this.handleChooseUser(false)} variant="contained" color="primary" autoFocus>
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
