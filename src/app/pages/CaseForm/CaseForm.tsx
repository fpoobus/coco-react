import {TableHead, Tooltip} from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar/Avatar';
import Button from '@material-ui/core/Button/Button';
import Card from '@material-ui/core/Card/Card';
import CardContent from '@material-ui/core/CardContent/CardContent';
import CircularProgress from '@material-ui/core/CircularProgress';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid/Grid';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Paper from '@material-ui/core/Paper/Paper';
import withStyles, {WithStyles} from '@material-ui/core/styles/withStyles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography/Typography';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import CheckIcon from '@material-ui/icons/Check';
import DescriptionIcon from '@material-ui/icons/Description';
import EditOutlinedIcon from '@material-ui/icons/Edit';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import Print from '@material-ui/icons/Print';
import Send from '@material-ui/icons/Send';
import SettingsBackupRestore from '@material-ui/icons/SettingsBackupRestore';
import cocoAxios from 'app/axiosConfig';
import RootContainer from 'app/components/Container/RootContainer';
import {DefendantResponse, PersonResponse} from 'app/model/NewClaim';
import {ROLES} from 'app/models/User';
import {caseFormStyles} from 'app/pages/CaseForm/styles';
import CaseStore from 'app/stores/CaseStore';
import UserStore from 'app/stores/UserStore';
import {action, runInAction} from 'mobx';
import {inject, observer} from 'mobx-react';
import * as React from 'react';
import {Link} from 'react-router-dom';
import HearingStore from "app/stores/HearingStore";
import Snackbar from "@material-ui/core/Snackbar";
import SnackbarContent from "@material-ui/core/SnackbarContent";
import {judgmentSanctions, judgmentTypes} from "app/model/JudgmentForm";

const judgesList = [
    ['Justice Foster Edward Abner', 49, 'busy'],
    ['Justice Roy John Jayce', 69, 'busy'],
    ['Justice Bert Alfred', 85],
    ['Justice Jefferson Archer Jarvis', 88, 'busy'],
    ['Justice Garth Beau', 79],
    ['Justice Wyatt Edwin', 91],
    ['Justice Samson Chauncey Lee', 17, 'busy']
];

const padding = {
    padding: '10px'
};

interface DashboardProps extends WithStyles<typeof caseFormStyles> {
    caseStore?: CaseStore;
    userStore?: UserStore;
    hearingStore?: HearingStore;
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

function getJudgeStatusIcon(status, classes: any) {
    if (status == 'busy') {
        return <div className={classes.alignRight}>
            <Tooltip title="This judge has a busy time schedule">
                <ErrorOutlineIcon color='error'/>
            </Tooltip>
        </div>;
    }
    else {
        return <React.Fragment/>;
    }
}

@inject('caseStore', 'userStore', 'hearingStore')
@observer
class CaseForm extends React.Component<DashboardProps> {
    judgmentFormLink = props => <Link to="/judgment-form" {...props} />;
    hearingLink = (props, id) => <Link to={"/hearing?id=" + id} {...props} />;
    homeLink = props => <Link to="/" {...props} />;
    caseLink = (props, id) => <Link to={'/case?id=' + id} {...props} />;

    state = {
        anchorEl: null,
        selectedIndex: -1
    };

    componentDidMount(): void {
        console.log('caseStore' + this.props.caseStore);
        if (!this.props.caseStore.cases || this.props.caseStore.cases.length === 0) {
            this.getCaseData();
        }
    }

    getCaseData() {
        this.props.caseStore.loadCases();
    }

    handleClickListItem = event => {
        if (this.props.userStore.user.role !== ROLES.USER) {
            this.setState({anchorEl: event.currentTarget});
        }
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
        courtCase.status = 'Pre-trial';
        courtCase.judge = judgesList[this.state.selectedIndex][0];
        courtCase.dateOfRegistration = new Date().toISOString();
        this.props.caseStore.setIsRegisteringSuccess(true);
        console.log('Registering case with date' + new Date().toISOString());
        cocoAxios.post('/coco-api/cases', courtCase, {headers: {'Access-Control-Allow-Origin': '*'}})
            .then(res => {
                //done
            })
            .catch(error => {
                console.log(error);
            });
    };

    isJudgeSelected() {
        const courtCase = this.getCourtCase();
        return !!(courtCase && courtCase.judge);
    }

    getCourtCase() {
        const {caseStore} = this.props;
        return getCase(caseStore);
    }

    isCaseRegistered() {
        const courtCase = this.getCourtCase();
        return !!(courtCase.dateOfRegistration);
    }

    isCaseClosed() {
        const courtCase = this.getCourtCase();
        return courtCase.status == 'CLOSED';
    }

    registerButtonMessage() {
        if(this.isCaseClosed()){
            return 'Case is closed'
        }
        if (this.isCaseRegistered()) {
            return 'Case is already registered'
        }
        if (this.isJudgeSelected()) {
            return 'Not authorised to register case'
        }
    }

    fetchClaimantLegalEntity = (courtCase) => {
        cocoAxios.get(`/coco-api/legal-entities/` + courtCase.claimantId, {
            headers: {
                'Access-Control-Allow-Origin': '*'
            }
        })
            .then(res => {
                runInAction(() => {
                    console.log('Got back response');
                    courtCase.claimant = DefendantResponse.fromJson(res.data);
                    console.log('CLAIMANT INFO', courtCase.claimant);
                });

            }).catch(e => {
            console.error(e);
        });
    };

    fetchPersonClaimantInfo = (courtCase) => {
        cocoAxios.get(`/coco-api/persons/` + courtCase.claimantId, {
            headers: {
                'Access-Control-Allow-Origin': '*'
            }
        })
            .then(res => {
                runInAction(() => {
                    console.log('Got back response');
                    courtCase.claimant = PersonResponse.fromJson(res.data);
                    console.log('CLAIMANT INFO', courtCase.claimant);
                });

            }).catch(e => {
            console.error(e);
        });

    };

    fetchDefendantInfo = (courtCase) => {
        cocoAxios.get(`/coco-api/legal-entities/` + courtCase.defendantId, {
            headers: {
                'Access-Control-Allow-Origin': '*'
            }
        })
            .then(res => {
                runInAction(() => {
                    console.log('Got back response');
                    courtCase.defendant = DefendantResponse.fromJson(res.data);
                    console.log('DEFENDANT INFO', courtCase.defendant);
                });

            }).catch(e => {
            console.error(e);
        });
    };

    fetchHearings = (courtCase) => {
        this.props.hearingStore.loadCaseHearings(courtCase.caseNumber)
            .then(res => {
                this.props.caseStore.setHearings(res);
            }).catch(e => {
            console.error(e);
        });
    };

    handleMissingData = (courtCase) => {
        if (courtCase && !courtCase.claimant) {
            console.log('No claimant info so fetching');
            if (courtCase.claimantId.length !== 11) {
                this.fetchClaimantLegalEntity(courtCase);
            }
            else {
                this.fetchPersonClaimantInfo(courtCase);
            }
        }
        if (courtCase && !courtCase.defendant) {
            console.log('No defendant so fetching');
            this.fetchDefendantInfo(courtCase);
        }
    };

    render() {

        if (!this.props.caseStore.cases || this.props.caseStore.cases.length === 0) {
            return <>
                <Grid container justify="center">
                    <Grid item>

                        <CircularProgress size={50}/>

                    </Grid>
                </Grid>
            </>;
        }

        const {classes, caseStore} = this.props;
        const {anchorEl} = this.state;
        let caseId = new URLSearchParams(window.location.search).get('id');
        caseStore.setSelectedCaseId(+caseId);
        let courtCase = caseStore.casesData.find(c => {
            return c.id === parseInt(caseId);
        });

        if (courtCase.judge) {
            this.state.selectedIndex = judgesList.findIndex((option) => option[0] === courtCase.judge);
            this.props.caseStore.setJudge(courtCase.judge);
        }

        if (this.props.hearingStore && this.props.caseStore.hearings.length == 0) {
            console.log("fetching hearings");
            this.fetchHearings(courtCase);
        }


        if (!courtCase) {

            // TODO: Fetch manually
            //alert("Valid data is missing!");
            courtCase = {
                claimant: {
                    name: '',
                    registryCode: '',
                    activities: [''],
                },
                defendant: {
                    name: '',
                    registryCode: '',
                    activities: [''],
                },
                description: '',
                paymentStatus: '',
                status: ''
            };
        }

        this.handleMissingData(courtCase);

        // @ts-ignore
        return (
            <RootContainer>
                <Grid container spacing={2}>
                    {this.renderRegisteringSuccess()}
                    <Grid container className={classes.marginBottom}>
                        {this.renderHeader(courtCase)}
                    </Grid>
                    <Grid container>
                        <Grid style={padding} item className={classes.matchParentHeight} xs={6}>
                            <Card className={classes.matchParentHeight}>
                                <CardContent>
                                    <Typography className={classes.title} color="textSecondary" gutterBottom>
                                        Claimant
                                    </Typography>
                                    {courtCase.claimant && <>
                                      <Typography variant="h5" component="h2">
                                          {courtCase.claimant.name}
                                          {courtCase.claimant.firstName} {courtCase.claimant.lastName} {courtCase.claimantId}
                                      </Typography>
                                        {courtCase.claimant.activities && < Typography component="p">
                                            {courtCase.claimant.activities[0]}
                                          <br/>
                                        </Typography>}
                                    </>}
                                    {!courtCase.claimant && <CircularProgress size={50}/>}
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid style={padding} item className={classes.matchParentHeight} xs={6}>
                            <Card className={classes.matchParentHeight}>
                                <CardContent>
                                    {courtCase.defendant && <>
                                      <Typography className={classes.title} color="textSecondary" gutterBottom>
                                        Defendant
                                      </Typography>
                                      <Typography variant="h5" component="h2">
                                          {courtCase.defendant.name} {courtCase.defendant.registryCode}
                                      </Typography>

                                        {courtCase.defendant.activities && <Typography component="p">
                                            {courtCase.defendant.activities[0]}
                                          <br/>

                                        </Typography>}
                                    </>}
                                    {!courtCase.defendant && <CircularProgress size={50}/>}
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                    <Grid style={padding} container>
                        <Grid item xs={12}>
                            <Paper className={classes.paper}>
                                <div className={classes.root}>


                                    <Table>
                                        <TableBody>
                                            <TableRow key={'row1'}>
                                                <TableCell style={{width: '50px'}}>
                                                    <Avatar>
                                                        <CheckIcon/>
                                                    </Avatar>
                                                </TableCell>
                                                <TableCell><strong>Status:</strong> </TableCell>
                                                <TableCell>
                                                    {courtCase.status}
                                                </TableCell>
                                            </TableRow>
                                            <TableRow key={'row2'}>
                                                <TableCell style={{width: '50px'}}>
                                                    <Avatar>
                                                        <AttachMoneyIcon/>
                                                    </Avatar>
                                                </TableCell>
                                                <TableCell>
                                                    <strong>Fee:</strong>
                                                </TableCell>
                                                <TableCell>
                                                    {courtCase.fee + ' - ' + courtCase.paymentStatus}
                                                </TableCell>
                                            </TableRow>
                                            <TableRow key={'row3'}>
                                                <TableCell style={{width: '50px'}}>
                                                    <Avatar>
                                                        <DescriptionIcon/>
                                                    </Avatar>
                                                </TableCell>
                                                <TableCell>
                                                    <strong>Documents:</strong>
                                                </TableCell>
                                                <TableCell>
                                                    {courtCase.documents.map(row => (
                                                        <TableRow key={row.name}>
                                                            {row.name}
                                                        </TableRow>
                                                    ))}
                                                </TableCell>
                                            </TableRow>
                                            <TableRow key={'row4'}>
                                                <TableCell style={{width: '50px'}}>
                                                    <Avatar>
                                                        {this.state.selectedIndex < 0 &&
                                                        <Tooltip title="Case has no judge!">
                                                          <ErrorOutlineIcon color='error'/>
                                                        </Tooltip>}
                                                        {this.state.selectedIndex > 0 && <CheckIcon/>}
                                                    </Avatar>
                                                </TableCell>
                                                <TableCell>
                                                    {(this.props.userStore.user.role !== ROLES.USER && this.state.selectedIndex < 0) ?
                                                        <Button variant="contained"
                                                                className={classes.button}
                                                                onClick={this.handleClickListItem}>
                                                            Choose a judge
                                                        </Button> : <React.Fragment/>}
                                                    {this.state.selectedIndex < 0 ? <React.Fragment/> :
                                                        <ListItem button onClick={this.handleClickListItem}>
                                                            <ListItemText>
                                                                {this.state.selectedIndex < 0 ?
                                                                    '' :
                                                                    <React.Fragment>
                                                                        <span>{'Judge - ' + judgesList[this.state.selectedIndex][0]}</span>
                                                                        {this.props.userStore.user.role !== ROLES.USER &&
                                                                        <EditOutlinedIcon color='primary'
                                                                                          className={classes.marginBetween}/>}
                                                                    </React.Fragment>
                                                                }
                                                            </ListItemText>
                                                        </ListItem>}
                                                </TableCell>
                                            </TableRow>
                                        </TableBody>
                                    </Table>

                                    <div className={classes.alignLeft}>


                                    </div>
                                    <Menu id="lock-menu" anchorEl={anchorEl} open={Boolean(anchorEl)}
                                          onClose={this.handleClose}>
                                        {judgesList.map((option, index) => (
                                            <MenuItem
                                                key={option[0]}
                                                selected={index === this.state.selectedIndex}
                                                onClick={event => this.handleMenuItemClick(event, index)}>
                                                {getAvatar(option, classes)}
                                                {<span className={classes.marginBetween}>{option[0]}</span>}
                                                {getJudgeStatusIcon(option[2], classes)}
                                            </MenuItem>
                                        ))}
                                    </Menu>

                                </div>
                                <br/>
                                <Divider/>
                                <br/>
                                <Typography className={classes.title} color="textSecondary" gutterBottom align={'left'}>
                                    Claim description
                                </Typography>

                                <Typography component="p" align={'left'}>
                                    {courtCase.description}
                                </Typography>

                            </Paper>
                        </Grid>
                    </Grid>
                    {this.renderHearings()}
                    {this.renderJudgement(courtCase)}
                    <Grid container spacing={10}>
                        <Grid item xs={12}>
                            <Tooltip title={this.registerButtonMessage()}>
                                <span>
                                <Button disabled={!this.isJudgeSelected() || this.isCaseRegistered()}
                                        variant="contained" color="primary"
                                        className={classes.button}
                                        onClick={this.registerCase}
                                        component={props => this.caseLink(props, caseStore.selectedCaseId)}>
                                    Register
                                    <Send className={classes.rightIcon}/>
                                </Button>
                                </span>
                            </Tooltip>
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

    private renderHeader = (courtCase: any) => {
        const {classes} = this.props;
        return <Grid container direction="row" alignItems="center">
            <Grid item xs={6}>
                <Grid container direction="row" alignItems="flex-start">
                    <Grid container item justify="flex-start">
                        <Typography variant="h5" gutterBottom>Case: {courtCase.caseNumber}</Typography>
                    </Grid>
                </Grid>
            </Grid>
            <Grid container item justify="flex-end" alignItems={'flex-end'} alignContent={'flex-end'}>
                <Grid item>
                    <Tooltip title={this.isCaseClosed()? "Case is closed": ''}>
                        <span>
                    {this.props.userStore.user.role !== ROLES.USER &&
                    <Button variant="contained"
                            disabled={this.isCaseClosed() || !this.isCaseRegistered()}
                            color="primary"
                            component={props => this.hearingLink(props, this.props.caseStore.selectedCaseId)}
                            className={classes.button}>
                      Hearing
                    </Button>}
                        </span>
                    </Tooltip>
                </Grid>
                <Grid item>
                    <Tooltip title={this.isCaseClosed()? "Case is closed": ''}>
                        <span>
                    {this.props.userStore.user.role === ROLES.JUDGE &&
                    <Button variant="contained"
                            disabled={this.isCaseClosed() || !this.isCaseRegistered()}
                            color="primary"
                            component={this.judgmentFormLink}
                            className={classes.button}>
                      Judgment
                    </Button>}
                        </span>
                    </Tooltip>
                </Grid>
                <Grid item>
                    <Button variant="contained" color="primary" className={classes.button} onClick={() => window.print()}>
                        Print
                        <Print className={classes.rightIcon}/>
                    </Button>
                </Grid>
            </Grid>
        </Grid>;
    };

    renderRegisteringSuccess() {
        setTimeout(() => {
            this.props.caseStore.setIsRegisteringSuccess(false);
        }, 5000);
        return (
            <Snackbar open={this.props.caseStore.isRegisteringSuccess}
                      anchorOrigin={{horizontal: 'center', vertical: 'top'}}>
                <SnackbarContent
                    className={"error"}
                    aria-describedby="client-snackbar"
                    message={"Your case has been registered!"}
                />
            </Snackbar>
        )
    }

    renderHearings() {
        const {classes, caseStore} = this.props;
        return (
            <Grid container>
                <Grid style={padding} item xs={12}>
                    <Card>
                        {caseStore.hearings.length != 0 &&
                        <CardContent>
                            {caseStore.hearings.length != 0 &&
                            <Typography className={classes.title} color="textSecondary" gutterBottom>
                              Hearings
                            </Typography>}
                          <Table aria-label="simple table">
                            <TableHead>
                              <TableRow>
                                <TableCell align="left">
                                  <Typography variant={"h6"}>Date</Typography>
                                </TableCell>
                                <TableCell align="left">
                                  <Typography variant={"h6"}>Judge</Typography>
                                </TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                                {caseStore.hearings.map(row => (
                                    <TableRow key={row.name}>
                                        <TableCell align="left">{new Date(row.startTime).toDateString()}</TableCell>
                                        <TableCell align="left">{row.judge}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                          </Table>
                        </CardContent>}
                    </Card>
                </Grid>
            </Grid>
        )
    }

    renderJudgement(courtCase: any) {
        const {classes} = this.props;
        if (this.isCaseClosed()) {
            return (
                <Grid container>
                    <Grid style={padding} item xs={12}>
                        <Card>
                            <CardContent>
                                <Typography className={classes.title} color="textSecondary" gutterBottom>
                                    Judgement
                                </Typography>
                                <Table aria-label="simple table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell align="left">
                                                <Typography variant={"h6"}>Judgement type</Typography>
                                            </TableCell>
                                            <TableCell align="left">
                                                <Typography variant={"h6"}>Sanctions</Typography>
                                            </TableCell>
                                            <TableCell align="left">
                                                <Typography variant={"h6"}>Judgement summary</Typography>
                                            </TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        <TableRow>
                                            <TableCell align="left">{judgmentTypes.find(s => s.type == courtCase.judgmentFormType).label}</TableCell>
                                            <TableCell align="left">{judgmentSanctions.find(s => s.type == courtCase.sanction).label}</TableCell>
                                            <TableCell align="left">{courtCase.judgmentDescription}</TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            )
        }

    }
}

export default withStyles(caseFormStyles)(CaseForm);
