import * as React from 'react';
import withStyles, {WithStyles} from '@material-ui/core/styles/withStyles';
import {caseFormStyles} from 'app/pages/CaseForm/styles';
import Grid from '@material-ui/core/Grid/Grid';
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
import CheckIcon from '@material-ui/icons/Check';
import Divider from "@material-ui/core/es/Divider/Divider";
import MenuItem from '@material-ui/core/es/MenuItem/MenuItem';
import Menu from "@material-ui/core/es/Menu/Menu";
import {inject, observer} from "mobx-react";
import CaseStore from "app/stores/CaseStore";

const judgesList = [
    ['Justice Foster Edward Abner', 49],
    ['Justice Roy John Jayce', 69],
    ['Justice Bert Alfred', 85],
    ['Justice Jefferson Archer Jarvis', 88],
    ['Justice Garth Beau', 79],
    ['Justice Wyatt Edwin', 91],
    ['Justice Samson Chauncey Lee', 17],
];

interface DashboardProps extends WithStyles<typeof caseFormStyles> {
    caseStore?: CaseStore;
}

function getAvatar(option, classes: any) {
    return <Avatar alt="Justice" src={"/assets/img/" + option[1] + ".jpg"} className={classes.avatar}/>;
}

@inject('caseStore')
@observer
class CaseForm extends React.Component<DashboardProps> {
    state = {
        name: 'Case type',
        age: '',
        multiline: 'Controlled',
        currency: 'EUR',
        anchorEl: null,
        selectedIndex: -1,
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
                                            <CheckIcon/>
                                        </ListItemIcon>
                                        <ListItemText primary="Status - Submitted"/>
                                    </ListItem>
                                    <ListItem button>
                                        <ListItemIcon>
                                            <CheckIcon/>
                                        </ListItemIcon>
                                        <ListItemText primary="Fee - PAID "/>
                                    </ListItem>
                                </List>
                                <Grid item xs={12}>
                                    <Grid item xs={10}>

                                        <div className={classes.root}>
                                            <List component="nav">
                                                <ListItem button onClick={this.handleClickListItem}>
                                                    <ListItemText>
                                                        {this.state.selectedIndex < 0 ?
                                                            "Choose a judge" : judgesList[this.state.selectedIndex][0]}
                                                    </ListItemText>
                                                </ListItem>
                                            </List>
                                            <Menu id="lock-menu" anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={this.handleClose}>
                                                {judgesList.map((option, index) => (
                                                    <MenuItem
                                                        key={option[0]}
                                                        selected={index === this.state.selectedIndex}
                                                        onClick={event => this.handleMenuItemClick(event, index)}>
                                                        {getAvatar(option, classes)}
                                                        {option[0]}
                                                    </MenuItem>
                                                ))}
                                            </Menu>
                                        </div>
                                    </Grid>
                                </Grid>
                                <Divider/>
                            </div>
                            <br/>
                            <Typography className={classes.title} color="textSecondary" gutterBottom align={"left"}>
                                Claim description
                            </Typography>

                            <Typography component="p" align={"left"}>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean nisl diam, dignissim ut lorem a, ullamcorper maximus nisi.
                                Curabitur quis lectus interdum, facilisis eros sit amet, laoreet ipsum. Cras rhoncus sapien eget justo finibus lacinia.
                                Phasellus eleifend tincidunt viverra. Suspendisse volutpat condimentum velit quis aliquet. Interdum et malesuada fames ac ante
                                ipsum primis in faucibus. Fusce rutrum gravida tortor. Nulla facilisi. In rhoncus bibendum nisi sit amet condimentum. Integer
                                sed tristique mi. In consequat sit amet turpis vitae tincidunt. Phasellus consectetur finibus dapibus. Pellentesque tincidunt
                                tristique arcu. Integer sapien ipsum, dictum vitae nunc in, placerat mattis dolor. Donec orci risus, rutrum quis eros sed,
                                pharetra rhoncus nisl.

                                Mauris fermentum ac nisl sit amet semper. Quisque quis fringilla tortor. Donec egestas tellus vitae ornare dapibus. Suspendisse
                                gravida eget lectus sit amet pulvinar. Suspendisse pulvinar facilisis ex, et viverra est feugiat vulputate. Quisque tincidunt
                                blandit nisl, in sollicitudin lectus ullamcorper et. Integer volutpat ultrices massa sit amet efficitur. Etiam mollis convallis
                                urna non molestie. Fusce vitae arcu odio. Nulla vel elementum erat.
                            </Typography>

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
                <Grid container direction="row" alignItems="flex-start">

                    <Grid item xs={3} justify="flex-end">
                        <Typography variant="h4" gutterBottom style={{marginLeft: 10}}> New case </Typography>
                    </Grid>
                    <Grid item xs={3} justify="flex-end">
                        <Chip
                            avatar={<Avatar><FaceIcon/></Avatar>}
                            label="Bill Gates (Cars Ltd)"
                            onClick={this.handleChange}
                            className={classes.chip}
                        />
                        VS
                    </Grid>
                    <Grid item xs={3} justify="flex-end">
                        <Chip
                            avatar={<Avatar><FaceIcon/></Avatar>}
                            label="Elon Musk (Tesla Ltd)"
                            onClick={this.handleChange}
                            className={classes.chip}
                        />
                    </Grid>
                </Grid>

            </Grid>
            <Grid item xs={2} justify="flex-end" alignItems={"flex-end"} alignContent={"flex-end"}>
                <Button variant="contained" color="primary" className={classes.button}>
                    PRINT
                </Button>
            </Grid>
        </Grid>;
    }
}

export default withStyles(caseFormStyles)(CaseForm);
