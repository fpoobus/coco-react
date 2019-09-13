import * as React from 'react';
import { ReactElement } from 'react';
import { DefendantResponse } from 'app/model/NewClaim';
import { Paper } from '@material-ui/core';
import makeStyles from '@material-ui/styles/makeStyles/makeStyles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Gavel from '@material-ui/icons/Gavel';

const useStyles = makeStyles(() => ({
  paper: {
    padding: 20,
    margin: 10,
    height: 100
  },
}));

type Props = {
  defendant?: DefendantResponse
}

const DefendantOverView = (props: Props): ReactElement<any> => {
  const classes = useStyles({});

  const renderDefendant = (): ReactElement<any> => (
    <>
      <br /><br />
      <Typography component="h2" variant="h6" gutterBottom> Found the following legal entity: </Typography>
      <Divider light />
      <p><strong>Name: </strong>{props.defendant.name}</p>
      <p><strong>Registry Code: </strong>{props.defendant.registryCode}</p>
      <p><strong>Activities: </strong>{props.defendant.activities.join(', ')}
      </p>*/
    </>
  );

  return (
    <Paper className={classes.paper} elevation={2}>
      <Grid container alignItems="center" justify="center">
        {props.defendant ? renderDefendant() : <Grid item><br /><br /><Gavel fontSize="large" /></Grid>}
      </Grid>
    </Paper>
  );
};

export default DefendantOverView
