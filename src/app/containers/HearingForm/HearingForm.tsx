import * as React from 'react';
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import {hearingFormStyles} from "app/containers/HearingForm/styles";
import Grid from '@material-ui/core/Grid/Grid';
import CalendarCard from "app/components/Calendar/Calendar";
import CourtHearingDate from "app/components/CourtHearingDate/CourtHearingDate";
import CourtParticipantsProps from "app/components/CourtParticipants/CourtParticipants";
import RootContainer from "app/components/Container/RootContainer";

interface HearingFormProps extends WithStyles<typeof hearingFormStyles> {

}

class HearingForm extends React.Component<HearingFormProps> {
    render() {
        const { classes } = this.props;
        return (
            <React.Fragment>
                <RootContainer>
                    <Grid container spacing={16}>
                        <Grid xs={12} sm={12} md={12} lg={12} xl={12}>
                            <div>
                                <h1 className={classes.hearingTitle}>Register hearing</h1>
                                <button className={classes.hearingHeaderButton}>Register and print</button>
                                <button className={classes.hearingHeaderButton}>Register</button>
                                <button className={classes.hearingHeaderButton}>Cancel</button>
                            </div>
                        </Grid>
                        <Grid item xs={12} sm={12} md={7} lg={7} xl={7}>
                            <CourtHearingDate />
                        </Grid>
                        <Grid item xs={12} sm={12} md={5} lg={5} xl={5}>
                            <CalendarCard />
                        </Grid>
                        <Grid item xs={12} sm={12} md={7} lg={7} xl={7}>
                            <CourtParticipantsProps />
                        </Grid>
                        <Grid item xs={12} sm={12} md={7} lg={7} xl={7}>
                        </Grid>
                    </Grid>
                </RootContainer>
            </React.Fragment>
        );
    }
}

export default withStyles(hearingFormStyles)(HearingForm);
