import * as React from 'react';
import withStyles, {WithStyles} from '@material-ui/core/styles/withStyles';
import {caseFormStyles} from 'app/pages/CaseForm/styles';
import Grid from '@material-ui/core/Grid/Grid';
import TextField from '@material-ui/core/TextField';
import Paper from "@material-ui/core/es/Paper/Paper";
import Avatar from '@material-ui/core/Avatar/Avatar';
import {Chip} from '@material-ui/core';
import FaceIcon from '@material-ui/icons/Face';
import Typography from "@material-ui/core/es/Typography/Typography";
import Button from "@material-ui/core/es/Button/Button";
import RootContainer from "app/components/Container/RootContainer";
import Send from "@material-ui/icons/Send";
import SettingsBackupRestore from "@material-ui/icons/SettingsBackupRestore";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import CardContent from '@material-ui/core/es/CardContent/CardContent';
import Card from "@material-ui/core/es/Card/Card";
import CardActions from "@material-ui/core/es/CardActions/CardActions";
import List from "@material-ui/core/es/List/List";
import ListItem from "@material-ui/core/es/ListItem/ListItem";
import ListItemIcon from "@material-ui/core/es/ListItemIcon/ListItemIcon";
import ListItemText from '@material-ui/core/es/ListItemText/ListItemText';
import InboxIcon from '@material-ui/icons/Inbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import Divider from "@material-ui/core/es/Divider/Divider";
import MenuItem from '@material-ui/core/es/MenuItem/MenuItem';
import Menu from "@material-ui/core/es/Menu/Menu";

const judgesList = [
    ['Foster Edward Abner', 49],
    ['Roy John Jayce', 69],
    ['Bert Alfred', 85],
    ['Jefferson Archer Jarvis', 88],
    ['Garth Beau', 79],
    ['Wyatt Edwin', 91],
    ['Samson Chauncey Lee', 17],
];

interface DashboardProps extends WithStyles<typeof caseFormStyles> {
}

class CaseForm extends React.Component<DashboardProps> {
    state = {
        name: 'Case type',
        age: '',
        multiline: 'Controlled',
        currency: 'EUR',
        anchorEl: null,
        selectedIndex: 0,
    };


    handleClickListItem = event => {
        this.setState({anchorEl: event.currentTarget});
    };

    handleMenuItemClick = (event, index) => {
        this.setState({selectedIndex: index, anchorEl: null});
    };

    handleClose = () => {
        this.setState({anchorEl: null});
    };

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };


    render() {
        const {classes} = this.props;
        const {anchorEl} = this.state;
        return (
            <RootContainer>
                <Grid container spacing={24}>
                    {this.getHeader(classes)}

                    <Grid item xs={12}>
                        <Paper className={classes.paper}>
                            <div className={classes.root}>
                                <List component="nav">
                                    <ListItem button>
                                        <ListItemIcon>
                                            <InboxIcon/>
                                        </ListItemIcon>
                                        <ListItemText primary="Status - Submitted"/>
                                    </ListItem>
                                    <ListItem button>
                                        <ListItemIcon>
                                            <DraftsIcon/>
                                        </ListItemIcon>
                                        <ListItemText primary="Fee - PAID "/>
                                    </ListItem>
                                </List>
                                <Grid item xs={12}>
                                    {/*<Grid item xs={2}>*/}
                                    {/*<DraftsIcon/>*/}
                                    {/*</Grid>*/}
                                    <Grid item xs={10}>

                                        <div className={classes.root}>
                                            <List component="nav">
                                                <ListItem button onClick={this.handleClickListItem}>
                                                    <ListItemText primary="Choose a judge"/>
                                                </ListItem>
                                            </List>
                                            <Menu id="lock-menu" anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={this.handleClose}>
                                                {judgesList.map((option, index) => (
                                                    <MenuItem
                                                        key={option[0]}
                                                        disabled={index === 0}
                                                        selected={index === this.state.selectedIndex}
                                                        onClick={event => this.handleMenuItemClick(event, index)}
                                                    >
                                                        <Avatar alt="Remy Sharp" src={"/assets/img/" + option[1] + ".jpg"} className={classes.avatar}/>

                                                        {option[0]}
                                                    </MenuItem>
                                                ))}
                                            </Menu>
                                        </div>
                                    </Grid>

                                </Grid>
                                <Divider/>
                            </div>

                            <form className={classes.container} noValidate autoComplete="off">
                                <TextField
                                    id="standard-name"
                                    className={classes.textField}
                                    value={this.state.name}
                                    onChange={this.handleChange('name')}
                                />
                            </form>
                        </Paper>
                    </Grid>

                    <Grid item xs={6}>
                        <Card>
                            <CardContent>
                                <Typography className={classes.title} color="textSecondary" gutterBottom>
                                    Claimant
                                </Typography>
                                <Typography variant="h5" component="h2">
                                    Bill Gates (Cars Ltd)

                                </Typography>
                                <Typography className={classes.pos} color="textSecondary">
                                    data
                                </Typography>
                                <Typography component="p">
                                    data2
                                    <br/>
                                    {'"data3"'}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button size="small">Learn More</Button>
                            </CardActions>
                        </Card>
                    </Grid>
                    <Grid item xs={6}>
                        <Card>
                            <CardContent>
                                <Typography className={classes.title} color="textSecondary" gutterBottom>
                                    Defendant
                                </Typography>
                                <Typography variant="h5" component="h2">
                                    Elon Musk (Tesla Ltd)
                                </Typography>
                                <Typography className={classes.pos} color="textSecondary">
                                    data
                                </Typography>
                                <Typography component="p">
                                    data2
                                    <br/>
                                    {'"data3"'}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button size="small">Learn More</Button>
                            </CardActions>
                        </Card>
                    </Grid>

                    <Grid container spacing={24}>
                        <Grid item xs={12}>
                            <Button variant="contained" color="primary" className={classes.button}>
                                Register
                                <Send className={classes.rightIcon}/>
                            </Button>
                            <Button variant="contained" color="secondary" className={classes.button}>
                                Return to claimant
                                <SettingsBackupRestore/>
                            </Button>
                            <Button variant="contained" color="primary" className={classes.button}>
                                <KeyboardArrowLeft/>
                                Back
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </RootContainer>
        );
    }

    private getHeader(classes: any) {
        return <Grid container direction="row" alignItems="center">
            <Grid item xs={10}>
                <Typography variant="h4" gutterBottom> New case </Typography>
                <Chip
                    avatar={<Avatar><FaceIcon/></Avatar>}
                    label="Bill Gates (Cars Ltd)"
                    onClick={this.handleChange}
                    className={classes.chip}
                />
                VS
                <Chip
                    avatar={<Avatar><FaceIcon/></Avatar>}
                    label="Elon Musk (Tesla Ltd)"
                    onClick={this.handleChange}
                    className={classes.chip}
                />
            </Grid>
            <Grid item xs={2} justify="flex-end">
                <Button variant="contained" color="primary" className={classes.button}>
                    PRINT
                </Button>
            </Grid>
        </Grid>;
    }
}

export default withStyles(caseFormStyles)(CaseForm);
