import * as React from 'react';
import { ReactElement } from 'react';
import { DefendantResponse } from 'app/model/NewClaim';
import makeStyles from '@material-ui/styles/makeStyles/makeStyles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Gavel from '@material-ui/icons/Gavel';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import { Card } from '@material-ui/core';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import CardContent from '@material-ui/core/CardContent';

const useStyles = makeStyles(() => ({
  paper: {
    padding: 20,
    margin: 10
  },
  iconGrid: {
    height: 100
  }
}));

type Props = {
  defendant?: DefendantResponse
  onModalOpen: () => void;
}

const DefendantOverView = (props: Props): ReactElement<any> => {
  const classes = useStyles({});

  const renderDefendant = (): ReactElement<any> => (
    <>
      <Typography component="h2" variant="h5" gutterBottom>Found the following legal entity</Typography>
      <Divider light />
      <br />
      <List>
        <ListItem>
          <Typography component="p"><strong>Name: </strong>{props.defendant.name}</Typography>
        </ListItem>
        <ListItem>
          <Typography component="p"><strong>Registry Code: </strong>{props.defendant.registryCode}</Typography>
        </ListItem>
        <ListItem>
          <Typography component="p"><strong>Activities: </strong>{props.defendant.activities.join(', ')}</Typography>
        </ListItem>
      </List>
    </>
  );

  const renderIcon = (): ReactElement<any> => (
    <Grid className={classes.iconGrid} container alignItems="center" justify="center" direction="column">
      <Grid item><Gavel fontSize="large" /><br /><br /></Grid>
      <Grid item>
        <Typography variant="body2" color="textSecondary" component="p">
          To continue, please select a defendant for your claim.
        </Typography>
      </Grid>
    </Grid>
  );

  return (
    <Card className={classes.paper} elevation={2}>
      <CardContent>
        {props.defendant ? renderDefendant() : renderIcon()}
      </CardContent>
      <CardActions>
        <Button size="large" variant="contained" onClick={props.onModalOpen}>
          Select defendant
        </Button>
      </CardActions>
    </Card>
  );
};

export default DefendantOverView
