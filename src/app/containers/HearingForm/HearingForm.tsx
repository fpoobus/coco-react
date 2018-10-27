import * as React from 'react';
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import {hearingFormStyles} from "app/containers/HearingForm/styles";
import Grid from '@material-ui/core/Grid/Grid';
import CalendarCard from "app/components/Calendar/Calendar";
import CourtHearingDate from "app/components/HearingDateContainer/HearingDateContainer";
import CourtHearingCalendar from "app/components/HearingTimeTable/HearingTimeTable";
import CourtParticipants from "app/components/CourtParticipants/CourtParticipants";
import RootContainer from "app/components/Container/RootContainer";
import Button from "../../../../node_modules/@material-ui/core/Button/Button";

interface HearingFormProps extends WithStyles<typeof hearingFormStyles> {
}

class HearingForm extends React.Component<HearingFormProps> {
    render() {
        const { classes } = this.props;
        return (
            <React.Fragment>
                <RootContainer>
                    <Grid container spacing={16}>
                        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                            <div>
                                <h1 className={classes.hearingTitle}>Register hearing</h1>
                                <Button variant="contained" color="primary" className={classes.hearingHeaderButton}>Register</Button>
                                <Button variant="contained" color="primary" className={classes.hearingHeaderButton}>Cancel</Button>
                            </div>
                        </Grid>
                        <Grid item xs={12} sm={12} md={7} lg={7} xl={7}>
                            <CourtHearingDate />
                        </Grid>
                        <Grid item xs={12} sm={12} md={5} lg={5} xl={5}>
                            <CalendarCard />
                        </Grid>
                        <Grid item xs={12} sm={12} md={7} lg={7} xl={7}>
                            <CourtParticipants />
                        </Grid>
                        <Grid item xs={12} sm={12} md={5} lg={5} xl={5}>
                            <CourtHearingCalendar />
                        </Grid>
                    </Grid>
                </RootContainer>
            </React.Fragment>
        );
    }
}

export default withStyles(hearingFormStyles)(HearingForm);
