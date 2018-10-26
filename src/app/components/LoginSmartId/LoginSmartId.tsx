import * as React from 'react';
import Avatar from "@material-ui/core/Avatar/Avatar";
import LockIcon from "@material-ui/core/SvgIcon/SvgIcon";
import Typography from "@material-ui/core/Typography/Typography";
import FormControl from "@material-ui/core/FormControl/FormControl";
import InputLabel from "@material-ui/core/InputLabel/InputLabel";
import Input from "@material-ui/core/Input/Input";
import Button from "@material-ui/core/Button/Button";
import UserStore from "app/stores/UserStore";

interface LoginSmartIdProps {
    classes?: any;
    userStore: UserStore;
}

export class LoginSmartId extends React.Component<LoginSmartIdProps> {

    constructor(props) {
        super(props);

        console.log(this.props.userStore)
        this.handleChangePersonalCode = this.handleChangePersonalCode.bind(this);
        this.redirectToPage = this.redirectToPage.bind(this);
    }

    handleChangePersonalCode(event) {
        console.log('PersonalCode: ', event.target.value);
        this.props.userStore.personalCode = event.target.value;
    };

    redirectToPage = () => {
        console.log('%%%%%%%%%%%%%%%%5')
        const personalCode = this.props.userStore.personalCode;
        console.log(this.props.userStore.personalCode)
        console.log(personalCode)
        this.props.userStore.doSmartIdLogIn(personalCode);
    };

    render() {
        const { classes } = this.props;
        return (
            <React.Fragment>
                <div  className={classes.typo}>
                    <Avatar className={classes.avatar}>
                        <LockIcon/>
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                </div>
                <form className={classes.form}>
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

export default LoginSmartId;
