import * as React from 'react';
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import { dashboardStyles } from 'app/containers/Dashboard/styles';

interface DashboardProps extends WithStyles<typeof dashboardStyles> {

}

class Dashboard extends React.Component<DashboardProps> {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>

      </div>
    );
  }
}

export default withStyles(dashboardStyles)(Dashboard);
