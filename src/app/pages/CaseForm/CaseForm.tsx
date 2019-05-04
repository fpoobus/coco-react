import * as React from 'react';
import withStyles, {WithStyles} from '@material-ui/core/styles/withStyles';
import {caseFormStyles} from 'app/pages/CaseForm/styles';
import Grid from '@material-ui/core/Grid/Grid';
import Paper from '@material-ui/core/Paper/Paper';
import Avatar from '@material-ui/core/Avatar/Avatar';
import Typography from '@material-ui/core/Typography/Typography';
import Button from '@material-ui/core/Button/Button';
import RootContainer from 'app/components/Container/RootContainer';
import Send from '@material-ui/icons/Send';
import SettingsBackupRestore from '@material-ui/icons/SettingsBackupRestore';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import CardContent from '@material-ui/core/CardContent/CardContent';
import Card from '@material-ui/core/Card/Card';
import CardActions from '@material-ui/core/CardActions/CardActions';
import List from '@material-ui/core/List/List';
import ListItem from '@material-ui/core/ListItem/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText/ListItemText';
import CheckIcon from '@material-ui/icons/Check';
import Divider from '@material-ui/core/Divider/Divider';
import MenuItem from '@material-ui/core/MenuItem/MenuItem';
import Menu from '@material-ui/core/Menu/Menu';
import {inject, observer} from 'mobx-react';
import CaseStore from 'app/stores/CaseStore';
import {Link} from 'react-router-dom';
import axios from "axios";
import {action} from "mobx";

const judgesList = [
    ['Justice Foster Edward Abner', 49],
    ['Justice Roy John Jayce', 69],
    ['Justice Bert Alfred', 85],
    ['Justice Jefferson Archer Jarvis', 88],
    ['Justice Garth Beau', 79],
    ['Justice Wyatt Edwin', 91],
    ['Justice Samson Chauncey Lee', 17]
];

interface DashboardProps extends WithStyles<typeof caseFormStyles> {
    caseStore?: CaseStore;
}

function getAvatar(option, classes: any) {
    return <Avatar alt="Justice" src={'/assets/img/' + option[1] + '.jpg'} className={classes.avatar}/>;
}

function getCase(caseStore: CaseStore) {
    let caseId = new URLSearchParams(window.location.search).get('id');
    caseStore.setSelectedCaseId(+caseId);
    return caseStore.casesData.find(c => {
        return c.id === parseInt(caseId);
    });
}

@inject('caseStore')
@observer
class CaseForm extends React.Component<DashboardProps> {
    judgmentFormLink = props => <Link to="/judgment-form" {...props} />;
    hearingLink = props => <Link to="/hearing" {...props} />;

    state = {
        anchorEl: null,
        selectedIndex: -1
    };

    handleClickListItem = event => {
        this.setState({anchorEl: event.currentTarget});
    };

    handleMenuItemClick = (event, index) => {
        this.setState({selectedIndex: index, anchorEl: null});
        const judge = judgesList[index][0];
        this.props.caseStore.setJudge(judge.toString());

    };

    handleClose = () => {
        this.setState({anchorEl: null});
    };

    @action
    registerCase = () => {
        const {caseStore} = this.props;
        const courtCase = getCase(caseStore);
        courtCase.status = "Pre-trial";
        courtCase.judge = judgesList[this.state.selectedIndex][0];
        axios.post('http://139.59.148.64/coco-api/cases', courtCase, {headers: {'Access-Control-Allow-Origin': '*'}})
            .then(res => {
                //done
            })
            .catch(error => {
                console.log(error)
            })
    };

    homeLink = props => <Link to="/" {...props} />;
    caseLink = (props, id) => <Link to={'/hearing'} {...props} />;

    render() {
        const {classes, caseStore} = this.props;
        const {anchorEl} = this.state;
        let caseId = new URLSearchParams(window.location.search).get('id');
        caseStore.setSelectedCaseId(+caseId);
        let courtCase = caseStore.casesData.find(c => {
            return c.id === parseInt(caseId);
        });

        if(!courtCase) {
            alert("Valid data is missing!");
            courtCase = {
                claimant: {
                    name: "",
                    registryCode: "",
                    activities: [""],
                },
                defendant: {
                    name: "",
                    registryCode: "",
                    activities: [""],
                },
                description: "",
                paymentStatus: "",
                status: ""
            }
        }

        return (
            <RootContainer>
                <Grid container spacing={24}>
                    {this.getHeader(classes, courtCase)}
                    <Grid item xs={12}>
                        <Paper className={classes.paper}>
                            <div className={classes.root}>
                                <List component="nav">
                                    <ListItem button>
                                        <ListItemIcon>
                                            <CheckIcon/>
                                        </ListItemIcon>
                                        <ListItemText>
                                            Status - {courtCase.status}
                                        </ListItemText>
                                    </ListItem>
                                    <ListItem button>
                                        <ListItemIcon>
                                            <CheckIcon/>
                                        </ListItemIcon>
                                        <ListItemText>
                                            Fee - {courtCase.fee} {courtCase.paymentStatus}
                                        </ListItemText>
                                    </ListItem>
                                </List>
                                <Grid item xs={12}>
                                    <Grid item xs={10}>

                                        <div className={classes.root}>
                                            <List component="nav">
                                                <ListItem button onClick={this.handleClickListItem}>
                                                    <ListItemText>
                                                        {this.state.selectedIndex < 0 ?
                                                            'Choose a judge' : judgesList[this.state.selectedIndex][0]}
                                                    </ListItemText>
                                                </ListItem>
                                            </List>
                                            <Menu id="lock-menu" anchorEl={anchorEl} open={Boolean(anchorEl)}
                                                  onClose={this.handleClose}>
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
                            <Typography className={classes.title} color="textSecondary" gutterBottom align={'left'}>
                                Claim description
                            </Typography>

                            <Typography component="p" align={'left'}>
                                {courtCase.description}
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
                                    {courtCase.claimant.name} {courtCase.claimant.registryCode}

                                </Typography>
                                <Typography component="p">
                                    {courtCase.claimant.activities[0]}
                                    <br/>
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
                                    {courtCase.defendant.name} {courtCase.defendant.registryCode}
                                </Typography>

                                <Typography component="p">
                                    {courtCase.defendant.activities[0]}
                                    <br/>

                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button size="small">Learn More</Button>
                            </CardActions>
                        </Card>
                    </Grid>

                    <Grid container spacing={24}>
                        <Grid item xs={12}>
                            <Button variant="contained" color="primary" className={classes.button}
                                    onClick={this.registerCase} component={props => this.caseLink(props, caseStore.selectedCaseId)}>
                                Register
                                <Send className={classes.rightIcon}/>
                            </Button>
                            <Button variant="contained" color="secondary" className={classes.button}>
                                Return to claimant
                                <SettingsBackupRestore/>
                            </Button>
                            <Button variant="contained" color="primary" component={this.homeLink}
                                    className={classes.button}>
                                <KeyboardArrowLeft/>
                                Back
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </RootContainer>
        );
    }

    private getHeader(classes: any, courtCase: any) {
        return <Grid container direction="row" alignItems="center">
            <Grid item xs={10}>
                <Grid container direction="row" alignItems="flex-start">

                    <Grid container item xs={3} justify="flex-end">
                        <Typography variant="h5" gutterBottom>Case: {courtCase.caseNumber}</Typography>
                    </Grid>
                    {/*<Grid container item xs={5} justify="flex-end">*/}
                    {/*<Chip*/}
                    {/*avatar={<Avatar><FaceIcon /></Avatar>}*/}
                    {/*label={courtCase.claimant.name}*/}
                    {/*onClick={this.handleChange}*/}
                    {/*className={classes.chip}*/}
                    {/*/>*/}
                    {/*</Grid>*/}
                    {/*<Grid container item xs={3} justify="flex-end">*/}
                    {/*<Chip*/}
                    {/*avatar={<Avatar><FaceIcon /></Avatar>}*/}
                    {/*label={courtCase.claimant.name}*/}
                    {/*onClick={this.handleChange}*/}
                    {/*className={classes.chip}*/}
                    {/*/>*/}
                    {/*</Grid>*/}
                </Grid>

            </Grid>
            <Grid container item xs={2} justify="flex-end" alignItems={'flex-end'} alignContent={'flex-end'}>
                <Button variant="contained" color="primary" component={this.judgmentFormLink}
                        className={classes.button}>
                    Judgment
                </Button>
                <Button variant="contained" color="primary" component={this.hearingLink} className={classes.button}>
                    Hearing
                </Button>
                <Button variant="contained" color="primary" className={classes.button}>
                    PRINT
                </Button>
            </Grid>
        </Grid>;
    }
}

export default withStyles(caseFormStyles)(CaseForm);
