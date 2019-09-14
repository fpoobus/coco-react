import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import * as React from 'react';
import { ReactElement, useEffect } from 'react';
import NewClaimStore from 'app/stores/NewClaimStore';
import { observer } from 'mobx-react';
import CircularProgress from '@material-ui/core/CircularProgress';
import makeStyles from '@material-ui/styles/makeStyles';
import { green } from '@material-ui/core/colors';

const padding = {
  padding: '20px',
  margin: '10px',
  height: '100px'
};

const iconScale = {
  height: '72px'
};

const useStyles = makeStyles(() => ({
  buttonProgress: {
    color: green[500],
    position: 'absolute',
    top: '85%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
  wrapper: {
    position: 'relative',
  },
}));

type Props = {
  newClaimStore: NewClaimStore
  nextStepClick: () => void;
}

const CaseFormFirstStep = (props: Props): ReactElement<any> => {
  const classes = useStyles({});

  useEffect(() => {
    props.newClaimStore.setOpenSection(null);
  }, []);

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

  const getElevation = (currentSection: boolean): number => (props.newClaimStore.openSection && currentSection) ? 24 : 1;
  const showSpinner = (currentSection: boolean): boolean => props.newClaimStore.isLoading &&
    (!props.newClaimStore.personResponse || currentSection);
  const renderYourCard = (): ReactElement<any> => {
    const USER_IMG = '../../../../assets/icons/shop-cashier-man.svg';
    return (
      <Grid item xs={12} sm={6}>
        <Paper style={padding} elevation={getElevation(props.newClaimStore.isNaturalSection)}>
          <Grid container justify="center" className={classes.wrapper}>
            <Grid item>
              <img style={iconScale} src={USER_IMG} alt="No image" />
              <br /><br /><br />
            </Grid>
            {showSpinner(props.newClaimStore.isNaturalSection) &&
            <CircularProgress size={24} className={classes.buttonProgress} />}
          </Grid>

          <Grid container justify="center">
            <Grid item hidden={props.newClaimStore.isLoading}>
              <Button
                disabled={!props.newClaimStore.personResponse}
                variant="contained"
                color="primary"
                onClick={nextAndSetTypeNatural}>
                Yourself
              </Button>
            </Grid>
          </Grid>
        </Paper>

      </Grid>
    );
  };

  const renderLegalCard = (): ReactElement<any> => {
    const LEGAL_IMG = '../../../../assets/icons/building-modern-1.svg';
    return (
      <Grid item xs={12} sm={6}>
        <Paper style={padding} elevation={getElevation(props.newClaimStore.isLegalSection)}>
          <Grid container justify="center" className={classes.wrapper}>
            <Grid item>
              <img style={iconScale} src={LEGAL_IMG} alt="No image" />
              <br /><br /><br />
            </Grid>
            {showSpinner(props.newClaimStore.isLegalSection) &&
            <CircularProgress size={24} className={classes.buttonProgress} />}
          </Grid>

          <Grid container justify="center">
            <Grid item className={classes.wrapper} hidden={props.newClaimStore.isLoading}>
              <Button
                disabled={!props.newClaimStore.personResponse || !props.newClaimStore.personResponse.legalEntities.length}
                variant="contained"
                color="primary"
                onClick={nextAndSetTypeLegal}>
                Legal Entity
              </Button>
            </Grid>
          </Grid>
        </Paper>

      </Grid>
    );
  };

  return (
    <Grid container spacing={8}>
      <Grid item xs={12}>
        <Grid container justify="center">
          <Grid container justify="center">
            <Grid item>
              <Typography variant="h4" gutterBottom>
                Please choose who you are <strong>representing</strong>
              </Typography>
              <Divider light />
              <br /><br />
            </Grid>
          </Grid>
          {renderYourCard()}
          {renderLegalCard()}
        </Grid>
      </Grid>
    </Grid>
  )
};

export default observer(CaseFormFirstStep);
