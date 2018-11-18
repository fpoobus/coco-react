import * as React from 'react';
import Avatar from "@material-ui/core/Avatar/Avatar";
import Typography from "@material-ui/core/Typography/Typography";
import FormControl from "@material-ui/core/FormControl/FormControl";
import InputLabel from "@material-ui/core/InputLabel/InputLabel";
import Input from "@material-ui/core/Input/Input";
import FormControlLabel from "@material-ui/core/FormControlLabel/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox/Checkbox";
import Button from "@material-ui/core/Button/Button";
import UserStore from "app/stores/UserStore";
import LockIcon from '@material-ui/icons/LockOutlined';
import Snackbar from "@material-ui/core/es/Snackbar/Snackbar";
import SnackbarContent from "@material-ui/core/es/SnackbarContent/SnackbarContent";
import {observer} from "mobx-react";

interface LoginPasswordProps {
    classes?: any;
    userStore: UserStore;
}

@observer
export class LoginPassword extends React.Component<LoginPasswordProps> {
    constructor(props) {
        super(props);

        console.log(this.props.userStore);
        this.handleChangePersonalCode = this.handleChangePersonalCode.bind(this);
        this.handleChangePassword = this.handleChangePassword.bind(this);
        this.redirectToPage = this.redirectToPage.bind(this);
    }

    handleChangePersonalCode(event) {
        this.props.userStore.user.personalCode = event.target.value;
    };

    handleChangePassword(event) {
        this.props.userStore.user.password = event.target.value;
    };

    redirectToPage = () => {
        const user = this.props.userStore.user;
        this.props.userStore.doLogIn({identityCode: user.personalCode, password: user.password})
    };

    render() {
        const {classes, userStore} = this.props;
        return (
            <React.Fragment>
                <div className={classes.typo}>
                    <Avatar className={classes.avatar}>
                        <LockIcon/>
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                </div>
                <form className={classes.form}>
                    <Snackbar open={userStore.loginError}
                              anchorOrigin={{horizontal: 'center', vertical: 'top'}}>
                        <SnackbarContent
                            className={"error"}
                            aria-describedby="client-snackbar"
                            message={"Invalid login credentials. Try again"}
                        />
                    </Snackbar>
                    <FormControl margin="normal" required fullWidth>
                        <InputLabel htmlFor="personalCode">Personal code</InputLabel>
                        <Input
                            onChange={this.handleChangePersonalCode}
                            id="personalCode"
                            name="personalCode"
                            autoComplete="personalCode"
                            autoFocus
                        />
                    </FormControl>
                    <FormControl margin="normal" required fullWidth>
                        <InputLabel htmlFor="password">Password</InputLabel>
                        <Input
                            onChange={this.handleChangePassword}
                            name="password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                        />
                    </FormControl>
                    <FormControlLabel
                        control={<Checkbox value="remember" color="primary"/>}
                        label="Remember me"
                    />
                    <Button
                        onClick={this.redirectToPage}
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Sign in
                    </Button>
                </form>
            </React.Fragment>
        );
    }
}

export default LoginPassword;
