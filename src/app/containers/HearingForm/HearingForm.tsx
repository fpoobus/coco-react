import * as React from 'react';
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import {hearingFormStyles} from "app/containers/HearingForm/styles";
import Grid from '@material-ui/core/Grid/Grid';
import CourtHearingDate from "app/components/HearingDateContainer/HearingDateContainer";
import CourtHearingCalendar from "app/components/HearingTimeTable/HearingTimeTable";
import CourtParticipants from "app/components/CourtParticipants/CourtParticipants";
import RootContainer from "app/components/Container/RootContainer";
import Button from "../../../../node_modules/@material-ui/core/Button/Button";
import HearingCalendar from "app/components/HearingCalender/HearingCalendar";
import {inject, observer} from "mobx-react";
import HearingStore from "app/stores/HearingStore";
import {RouteComponentProps} from "react-router";
import SnackbarContent from "../../../../node_modules/@material-ui/core/es/SnackbarContent/SnackbarContent";
import Snackbar from "../../../../node_modules/@material-ui/core/es/Snackbar/Snackbar";

interface HearingFormProps extends WithStyles<typeof hearingFormStyles>, RouteComponentProps<any> {
    hearingStore?: HearingStore
}

@inject('hearingStore')
@observer
class HearingForm extends React.Component<HearingFormProps> {

    toClaims = () => {
        this.props.hearingStore.setIsHearingSuccess(false);
        this.props.hearingStore.setIsHearingFormCompleted(false);
        this.props.hearingStore.clearData();
        this.props.history.push('/');
    };

    registerHearing = async () => {
        const { hearingStore } = this.props;

        const hearing = hearingStore.createPayload();
        if(hearingStore.isHearingFormCompleted(hearing) && hearingStore.activeTime){
            await this.props.hearingStore.createHearing(hearing);
            this.props.history.push('/');
            this.props.hearingStore.clearData();
            hearingStore.setIsHearingSuccess(true);
        } else {
            setTimeout(() => {
                this.props.hearingStore.setIsHearingFormCompleted(false);
            }, 3000);
            this.props.hearingStore.setIsHearingFormCompleted(true)
        }
    };

    render() {
        const { classes } = this.props;

        return (
            <React.Fragment>
                <RootContainer>
                    <div>
                        <Snackbar open={this.props.hearingStore.isHearingSuccess}
                                  anchorOrigin={{horizontal: 'center', vertical: 'top'}}>
                            <SnackbarContent
                                className={"error"}
                                aria-describedby="client-snackbar"
                                message={this.props.hearingStore.getErrorMessageByHearingField()}
                            />
                        </Snackbar>
                        <Grid container spacing={16}>
                            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                                <div>
                                    <h1 className={classes.hearingTitle}>Register hearing</h1>
                                    <Button variant="contained" color="primary" className={classes.hearingHeaderButton} onClick={this.registerHearing}>Register</Button>
                                    <Button variant="contained" color="primary" className={classes.hearingHeaderButton} onClick={this.toClaims}>Cancel</Button>
                                </div>
                            </Grid>
                            <Grid item xs={12} sm={12} md={7} lg={7} xl={7}>
                                <CourtHearingDate />
                            </Grid>
                            <Grid item xs={12} sm={12} md={5} lg={5} xl={5}>
                                <HearingCalendar />
                            </Grid>
                            <Grid item xs={12} sm={12} md={7} lg={7} xl={7}>
                                <CourtParticipants />
                            </Grid>
                            <Grid item xs={12} sm={12} md={5} lg={5} xl={5}>
                                <CourtHearingCalendar />
                            </Grid>
                        </Grid>
                    </div>
                </RootContainer>
            </React.Fragment>
        );
    }
}

export default withStyles(hearingFormStyles)(HearingForm);
