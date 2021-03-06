import * as React from 'react';
import Card from '@material-ui/core/Card/Card';
import CardHeader from '@material-ui/core/CardHeader/CardHeader';
import CardContent from '@material-ui/core/CardContent/CardContent';
import Button from '@material-ui/core/Button/Button';
import {claimsSubmitterStyles} from 'app/components/ClaimsSubmitter/styles';
import withStyles, {WithStyles} from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography/Typography';
import ClaimsDataStore from 'app/stores/ClaimsDataStore';
import {inject, observer} from 'mobx-react';
import CardActions from '@material-ui/core/CardActions/CardActions';
import {Link} from 'react-router-dom';


interface ClaimsSubmitterProps extends WithStyles<typeof claimsSubmitterStyles> {
  claimsDataStore?: ClaimsDataStore
}

@inject('claimsDataStore')
@observer
class ClaimsSubmitter extends React.Component<ClaimsSubmitterProps> {

  newClaimLink = props => <Link to="/new-claim" {...props} />;

  renderClaimsContent = (): JSX.Element => {
    const { claimsDataStore } = this.props;
    return (claimsDataStore.hasAnyClaims ? null :
        <>
          <Typography>
            Click below to submit a new claim
          </Typography>
        </>
    );
  };


  render() {
    const { classes } = this.props;
    return (
      <>
        <Card className={classes.card}>
          <CardHeader title="" />
          <CardContent className={classes.justifyCenter}>
            {this.renderClaimsContent()}
          </CardContent>
          <CardActions className={classes.justifyCenter}>
            <img className={classes.claimIcon} src="../../../assets/icons/email-action-receive.svg" />
            <Button variant="contained" component={this.newClaimLink} color="primary" className={classes.btnHover}>
              Submit a claim
            </Button>
          </CardActions>
        </Card>
      </>
    );
  }
}

export default withStyles(claimsSubmitterStyles)(ClaimsSubmitter);
