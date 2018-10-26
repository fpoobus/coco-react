import * as React from 'react';
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import { dashboardStyles } from 'app/containers/Dashboard/styles';
import Grid from '@material-ui/core/Grid/Grid';

interface DashboardProps extends WithStyles<typeof dashboardStyles> {

}

class Dashboard extends React.Component<DashboardProps> {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Grid>

        </Grid>
      </div>
    );
  }
}

export default withStyles(dashboardStyles)(Dashboard);
