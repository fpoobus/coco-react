import * as React from 'react';
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import { dashboardStyles } from 'app/containers/Dashboard/styles';
import Grid from '@material-ui/core/Grid/Grid';
import ClaimsSubmitter from 'app/components/ClaimsSubmitter/ClaimsSubmitter';

interface DashboardProps extends WithStyles<typeof dashboardStyles> {

}

class Dashboard extends React.Component<DashboardProps> {
  render() {
    const { classes } = this.props;
    return (
      <>
        <Grid container className={classes.root}>
          <Grid item xs={6}>
            <ClaimsSubmitter />
          </Grid>
          <Grid item xs={6}>

          </Grid>
          <Grid item xs={12}>

          </Grid>
        </Grid>
      </>
    );
  }
}

export default withStyles(dashboardStyles)(Dashboard);
