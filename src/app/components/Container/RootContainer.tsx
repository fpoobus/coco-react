import * as React from 'react';
import { Theme, WithStyles } from '@material-ui/core';
import createStyles from '@material-ui/core/styles/createStyles';
import withStyles from '@material-ui/core/styles/withStyles';

const styles = (theme: Theme) => createStyles({
  background: {
    backgroundImage: `url(${'../../../assets/img/skyline.svg'})`,
    backgroundPosition: 'center bottom',
    backgroundRepeat: 'no-repeat',
    width: '100%',
    height: '100%',
    position: 'fixed'
  },
  root: {
    display: 'flex',
    justifyContent: 'center',
    padding: '0px 16px',
    width: '100%'
  },
  container: {
    maxWidth: 1200,
    width: '75%'
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
      </div>
    );
  }
}

export default withStyles(styles)(RootContainer);
