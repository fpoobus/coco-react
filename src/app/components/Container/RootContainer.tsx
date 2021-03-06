import * as React from 'react';
import createStyles from '@material-ui/core/styles/createStyles';
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import Footer from 'app/components/Footer/Footer';
import { Theme } from '@material-ui/core/styles/createMuiTheme';

const styles = (theme: Theme) => createStyles({
  background: {
    backgroundImage: `url(${'../../../assets/img/skyline.svg'})`,
    backgroundPosition: 'center bottom',
    backgroundRepeat: 'repeat-x',
    backgroundSize: '70%',
    width: '100%',
    height: '100%',
    bottom: '0'
  },
  root: {
    display: 'flex',
    justifyContent: 'center',
    width: '100%'
  },
  container: {
    maxWidth: 1200,
    width: '75%',
    [theme.breakpoints.down('md')]: {
      width: '95%'
    }
  }
});

interface RootContainerProps extends WithStyles<typeof styles> {
  children: JSX.Element
}

class RootContainer extends React.Component<RootContainerProps> {

  render() {
    const { classes, children } = this.props;
    return (
      <div className={classes.background}>
        <div className={classes.root}>
          <div className={classes.container}>
            {children}
          </div>
        </div>
        <div style={{ height: '200px' }} />
        <Footer />
      </div>
    );
  }
}

export default withStyles(styles)(RootContainer);
