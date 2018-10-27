import * as React from 'react';
import { WithStyles } from '@material-ui/core';
import withStyles from '@material-ui/core/styles/withStyles';
import ClaimsDataStore from 'app/stores/ClaimsDataStore';
import { inject } from 'mobx-react';
import {courtHearingDateStyles} from "app/components/CourtHearingDate/styles";
import Divider from "../../../../node_modules/@material-ui/core/Divider/Divider";
import '../../../../node_modules/react-datepicker/dist/react-datepicker-cssmodules.css';
import '../../../../node_modules/react-datepicker/dist/react-datepicker.css';
import Paper from "../../../../node_modules/@material-ui/core/Paper/Paper";

interface CourtHearingDateProps extends WithStyles<typeof courtHearingDateStyles> {
  claimsDataStore?: ClaimsDataStore
}
@inject('claimsDataStore')
class CourtHearingDate extends React.Component<CourtHearingDateProps> {
  constructor (props) {
    super(props)
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

            </div>
          </Paper>
      </>
    );
  }
}

export default withStyles(courtHearingDateStyles)(CourtHearingDate);
