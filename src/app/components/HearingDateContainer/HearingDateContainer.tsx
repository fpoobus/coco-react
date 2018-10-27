import * as React from 'react';
import { WithStyles } from '@material-ui/core';
import withStyles from '@material-ui/core/styles/withStyles';
import {courtHearingDateStyles} from "app/components/CourtHearingDate/styles";
import Divider from "../../../../node_modules/@material-ui/core/Divider/Divider";
import '../../../../node_modules/react-datepicker/dist/react-datepicker-cssmodules.css';
import '../../../../node_modules/react-datepicker/dist/react-datepicker.css';
import Paper from "../../../../node_modules/@material-ui/core/Paper/Paper";
import DatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';
import 'react-datepicker/dist/react-datepicker-cssmodules.css';

interface CourtHearingDateProps extends WithStyles<typeof courtHearingDateStyles> {
  //hearingStore?: HearingStore
}

class CourtHearingDate extends React.Component<CourtHearingDateProps> {
    constructor (props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(date) {

    }

  render() {
    const { classes } = this.props;
    return (
      <>
          <Paper>
              <div>
                  <p className={classes.heading}>1st hearing in case 132-CIV-2018</p>
              </div>
              <Divider />
            <div className={classes.dateContainer}>
                <h3>Date: </h3>
                <h3>Time: </h3>
            </div>
          </Paper>
      </>
    );
  }
}

export default withStyles(courtHearingDateStyles)(CourtHearingDate);
