import * as React from 'react';
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import { dashboardStyles } from 'app/containers/Dashboard/styles';
import Grid from '@material-ui/core/Grid/Grid';
import ClaimsSubmitter from 'app/components/ClaimsSubmitter/ClaimsSubmitter';
import RootContainer from 'app/components/Container/RootContainer';
import ClientCases from 'app/components/ClientCases/ClientCases';
import CalendarCard from 'app/components/Calendar/Calendar';

interface DashboardProps extends WithStyles<typeof dashboardStyles> {

}

class Dashboard extends React.Component<DashboardProps> {
  render() {
    return (
      <RootContainer>
        <Grid container spacing={16}>
          <Grid item xs={6}>
            <ClaimsSubmitter />
          </Grid>
          <Grid item xs={6}>
            <CalendarCard />
          </Grid>
          <Grid item xs={12}>
            <ClientCases />
          </Grid>
        </Grid>
      </RootContainer>
    );
  }
}

export default withStyles(dashboardStyles)(Dashboard);
