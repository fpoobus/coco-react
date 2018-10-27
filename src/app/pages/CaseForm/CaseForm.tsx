import * as React from 'react';
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import { caseFormStyles } from 'app/pages/CaseForm/styles';
import Grid from '@material-ui/core/Grid/Grid';
import Paper from '@material-ui/core/es/Paper/Paper';
import Avatar from '@material-ui/core/Avatar/Avatar';
import { Chip } from '@material-ui/core';
import FaceIcon from '@material-ui/icons/Face';
import Typography from '@material-ui/core/es/Typography/Typography';
import Button from '@material-ui/core/es/Button/Button';
import RootContainer from 'app/components/Container/RootContainer';
import Send from '@material-ui/icons/Send';
import SettingsBackupRestore from '@material-ui/icons/SettingsBackupRestore';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import CardContent from '@material-ui/core/es/CardContent/CardContent';
import Card from '@material-ui/core/es/Card/Card';
import CardActions from '@material-ui/core/es/CardActions/CardActions';
import List from '@material-ui/core/es/List/List';
import ListItem from '@material-ui/core/es/ListItem/ListItem';
import ListItemIcon from '@material-ui/core/es/ListItemIcon/ListItemIcon';
import ListItemText from '@material-ui/core/es/ListItemText/ListItemText';
import CheckIcon from '@material-ui/icons/Check';
import Divider from '@material-ui/core/es/Divider/Divider';
import MenuItem from '@material-ui/core/es/MenuItem/MenuItem';
import Menu from '@material-ui/core/es/Menu/Menu';
import { inject, observer } from 'mobx-react';
import CaseStore from 'app/stores/CaseStore';
import { Link } from 'react-router-dom';

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
  return <Avatar alt="Justice" src={'/assets/img/' + option[1] + '.jpg'} className={classes.avatar} />;
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
    this.setState({ anchorEl: event.currentTarget });
  };

  handleMenuItemClick = (event, index) => {
    this.setState({ selectedIndex: index, anchorEl: null });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  homeLink = props => <Link to="/" {...props} />;

  render() {
    const { classes, caseStore } = this.props;
    const { anchorEl } = this.state;
    let caseId = new URLSearchParams(window.location.search).get('id');
    caseStore.setSelectedCaseId(+caseId);
    const courtCase = caseStore.casesData.find(c => {
      return c.id === parseInt(caseId);
    });
    console.log(">>>>>>>>>>>>>>", courtCase);

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
                      <CheckIcon />
                    </ListItemIcon>
                    <ListItemText>
                      Status - {courtCase.status}
                    </ListItemText>
                  </ListItem>
                  <ListItem button>
                    <ListItemIcon>
                      <CheckIcon />
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
                <Divider />
              </div>
              <br />
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
                  <br />
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
                  {courtCase.claimant.name} {courtCase.claimant.registryCode}
                </Typography>

                <Typography component="p">
                    {courtCase.claimant.activities[0]}
                  <br />

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
                <Send className={classes.rightIcon} />
              </Button>
              <Button variant="contained" color="secondary" className={classes.button}>
                Return to claimant
                <SettingsBackupRestore />
              </Button>
              <Button variant="contained" color="primary" component={this.homeLink} className={classes.button}>
                <KeyboardArrowLeft />
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

          <Grid container item xs={4} justify="flex-end">
            <Typography variant="h4" gutterBottom>Case: {courtCase.caseNumber}</Typography>
          </Grid>
          <Grid container item xs={3} justify="flex-end">
            <Chip
              avatar={<Avatar><FaceIcon /></Avatar>}
              label="Bill Gates (Cars Ltd)"
              onClick={this.handleChange}
              className={classes.chip}
            />
            {/*VS*/}
          </Grid>
          <Grid container item xs={3} justify="flex-end">
            <Chip
              avatar={<Avatar><FaceIcon /></Avatar>}
              label="Elon Musk (Tesla Ltd)"
              onClick={this.handleChange}
              className={classes.chip}
            />
          </Grid>
        </Grid>

      </Grid>
      <Grid container item xs={2} justify="flex-end" alignItems={'flex-end'} alignContent={'flex-end'}>
        <Button variant="contained" color="primary" component={this.judgmentFormLink} className={classes.button}>
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
