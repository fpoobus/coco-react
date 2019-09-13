import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import * as React from 'react';
import { ReactElement } from 'react';
import NewClaimStore from 'app/stores/NewClaimStore';

const padding = {
  padding: '20px',
  margin: '10px',
  height: '100px'
};

const iconScale = {
  height: '72px'
};

type Props = {
  newClaimStore: NewClaimStore
  nextStepClick: () => void;
}

const CaseFormFirstStep = (props: Props): ReactElement<any> => {


  const nextAndSetTypeNatural = () => {
    props.newClaimStore.setOpenSectionNatural();
    props.newClaimStore.newClaim.isLegalEntity = false;
    props.nextStepClick();
  };

  const nextAndSetTypeLegal = () => {
    props.newClaimStore.setOpenSectionLegal();
    props.newClaimStore.newClaim.isLegalEntity = true;
    props.nextStepClick();
  };

  return (
    <Grid container spacing={8}>
      <Grid item xs={12}>
        <Grid container justify="center">

          <Grid container justify="center">
            <Grid item>
              <Typography component="h2" variant="h4" gutterBottom>
                Please choose who you are <strong>representing</strong>
              </Typography>
              <Divider light />
              <br /><br />
            </Grid>
          </Grid>

          <Grid item xs={12} sm={6}>

            <Paper style={padding} elevation={1}>

              <Grid container justify="center">
                <Grid item>
                  <img style={iconScale} src="../../../../assets/icons/shop-cashier-man.svg" />
                  <br /><br /><br />
                </Grid>
              </Grid>

              <Grid container justify="center">
                <Grid item>

                  <Button variant="contained" color="primary" onClick={nextAndSetTypeNatural}>
                    Yourself
                  </Button>
                </Grid>
              </Grid>
            </Paper>

          </Grid>

          <Grid item xs={12} sm={6}>

            <Paper style={padding} elevation={1}>

              <Grid container justify="center">
                <Grid item>
                  <img style={iconScale} src="../../../../assets/icons/building-modern-1.svg" />
                  <br /><br /><br />
                </Grid>
              </Grid>

              <Grid container justify="center">
                <Grid item>

                  <Button variant="contained" color="primary" onClick={nextAndSetTypeLegal}>
                    Legal Entity
                  </Button>
                </Grid>
              </Grid>
            </Paper>

          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
};

export default CaseFormFirstStep;
