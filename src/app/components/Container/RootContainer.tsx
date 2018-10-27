import * as React from 'react';
import { Theme, WithStyles } from '@material-ui/core';
import createStyles from '@material-ui/core/styles/createStyles';
import withStyles from '@material-ui/core/styles/withStyles';
import Header from 'app/components/Header/Header';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';

const theme = createMuiTheme({
  palette: {
    primary: { main: '#ecddac', light: '#f4f4f4', dark: '#131b23' },
    secondary: { main: '#6d6160', light: '#e7dfc6', dark: '#816c61' }
  }
});

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

  componentDidMount() {
    document.body.style.backgroundColor = theme.palette.primary.light;
  }

  render() {
    const { classes, children } = this.props;
    return (
      <MuiThemeProvider theme={theme}>
        <div className={classes.background}>
          <Header />
          <div className={classes.root}>
            <div className={classes.container}>
              {children}
            </div>
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default withStyles(styles)(RootContainer);
