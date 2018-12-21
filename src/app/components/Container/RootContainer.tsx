import * as React from 'react';
import { Theme, WithStyles } from '@material-ui/core';
import createStyles from '@material-ui/core/styles/createStyles';
import withStyles from '@material-ui/core/styles/withStyles';
import Header from 'app/components/Header/Header';


const styles = (theme: Theme) => createStyles({
  background: {
    backgroundImage: `url(${'../../../assets/img/skyline.svg'})`,
    backgroundPosition: 'center bottom',
    backgroundRepeat: 'repeat-x',
    backgroundSize: '70%',
    width: '100%',
    height: '100%',
    position: 'absolute'
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
        <Header />
        <div className={classes.root}>
          <div className={classes.container}>
            {children}
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(RootContainer);
