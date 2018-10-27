import * as React from 'react';
import Card from '@material-ui/core/Card/Card';
import CardHeader from '@material-ui/core/CardHeader/CardHeader';
import CardContent from '@material-ui/core/CardContent/CardContent';
import Button from '@material-ui/core/Button/Button';
import { WithStyles } from '@material-ui/core';
import { claimsSubmitterStyles } from 'app/components/ClaimsSubmitter/styles';
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography/Typography';
import ClaimsDataStore from 'app/stores/ClaimsDataStore';
import { inject, observer } from 'mobx-react';
import CardActions from '@material-ui/core/CardActions/CardActions';
import { Link } from 'react-router-dom';


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
            You haven't had to make any claims, lucky you
          </Typography>;
        </>
    );
  };



  render() {
    const { classes } = this.props;
    return (
      <>
        <Card className={classes.card}>
          <CardHeader title="My Claims" />
          <CardContent className={classes.justifyCenter}>
            {this.renderClaimsContent()}
          </CardContent>
          <CardActions className={classes.justifyCenter}>
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
