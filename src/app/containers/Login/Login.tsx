import * as React from 'react';
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import { loginStyles } from 'app/containers/Login/styles';
import Paper from '@material-ui/core/Paper';
import CssBaseline from '@material-ui/core/CssBaseline';
import LoginPassword from 'app/components/LoginPassword/LoginPassword';
import Typography from "@material-ui/core/Typography/Typography";
import Tabs from "@material-ui/core/Tabs/Tabs";
import Tab from "@material-ui/core/Tab/Tab";
import LoginSmartId from "app/components/LoginSmartId/LoginSmartId";
import UserStore from "app/stores/UserStore";


function TabContainer(props) {
    return (
        <Typography component="div" style={{ padding: 8 * 3 }}>
            {props.children}
        </Typography>
    );
}

interface LoginProps extends WithStyles<typeof loginStyles> {
    userStore: UserStore;
}

class Dashboard extends React.Component<LoginProps> {
    state = {
        value: 0,
    };

    handleChange = (event, value) => {
        this.setState({ value });
    };

    render() {
        const { classes, userStore } = this.props;
        const { value } = this.state;
        return (
            <React.Fragment>
                <CssBaseline />
                <main className={classes.layout}>
                    <Paper className={classes.paperNavigation} elevation={1}>
                        <Tabs
                            value={value}
                            onChange={this.handleChange}
                            indicatorColor="primary"
                            textColor="primary"
                            fullWidth
                        >
                            <Tab label="Password Login" />
                            <Tab label="SmartID Login" />
                        </Tabs>
                    </Paper>
                    <Paper className={classes.paper} elevation={1}>
                        {value === 0 && <TabContainer><LoginPassword classes = {classes} userStore={userStore} /></TabContainer>}
                        {value === 1 && <TabContainer><LoginSmartId classes = {classes} /></TabContainer>}
                    </Paper>
                </main>
            </React.Fragment>
        );
    }
}

export default withStyles(loginStyles)(Dashboard);
