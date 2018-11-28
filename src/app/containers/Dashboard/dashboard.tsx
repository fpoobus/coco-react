import * as React from 'react';
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import { dashboardStyles } from 'app/containers/Dashboard/styles';
import Grid from '@material-ui/core/Grid/Grid';
import ClaimsSubmitter from 'app/components/ClaimsSubmitter/ClaimsSubmitter';
import RootContainer from 'app/components/Container/RootContainer';
import ClientCases from 'app/components/ClientCases/ClientCases';
import CalendarCard from 'app/components/Calendar/Calendar';
import SnackbarContent from "../../../../node_modules/@material-ui/core/es/SnackbarContent/SnackbarContent";
import Snackbar from "../../../../node_modules/@material-ui/core/es/Snackbar/Snackbar";
import HearingStore from "app/stores/HearingStore";
import {inject, observer} from "mobx-react";

interface DashboardProps extends WithStyles<typeof dashboardStyles> {
  hearingStore: HearingStore;
}

@inject('hearingStore')
@observer
class Dashboard extends React.Component<DashboardProps> {
  renderHearingSuccess() {
      setTimeout(() => {
          this.props.hearingStore.setIsHearingSuccess(false);
      }, 3000);
    return (
        <Snackbar open={this.props.hearingStore.isHearingSuccess}
                  anchorOrigin={{horizontal: 'center', vertical: 'top'}}>
            <SnackbarContent
                className={"error"}
                aria-describedby="client-snackbar"
                message={"Your hearing has been registered!"}
            />
        </Snackbar>
    )
  }

  render() {
    return (
      <RootContainer>
        <>
          {this.renderHearingSuccess()}
          <Grid container spacing={16}>
            <Grid item xs={12} md={6}>
              <ClaimsSubmitter />
            </Grid>
            <Grid item xs={12} md={6}>
              <CalendarCard />
            </Grid>
            <Grid item xs={12}>
              <ClientCases />
            </Grid>
          </Grid>
          </>
      </RootContainer>
    );
  }
}

export default withStyles(dashboardStyles)(Dashboard);
