import * as React from 'react';
import Avatar from "@material-ui/core/Avatar/Avatar";
import LockIcon from "@material-ui/core/SvgIcon/SvgIcon";
import Typography from "@material-ui/core/Typography/Typography";
import FormControl from "@material-ui/core/FormControl/FormControl";
import InputLabel from "@material-ui/core/InputLabel/InputLabel";
import Input from "@material-ui/core/Input/Input";
import Button from "@material-ui/core/Button/Button";
import UserStore from "app/stores/UserStore";
import VerificationModal from "app/components/Modals/VerificationModal";
import {observer} from "mobx-react";
import CircularProgress from "@material-ui/core/CircularProgress/CircularProgress";
import Grid from "@material-ui/core/Grid/Grid";

interface LoginSmartIdProps {
    classes?: any;
    userStore: UserStore;
}

@observer
export class LoginSmartId extends React.Component<LoginSmartIdProps> {

    constructor(props) {
        super(props);

        console.log(this.props.userStore);
        this.handleChangePersonalCode = this.handleChangePersonalCode.bind(this);
        this.redirectToPage = this.redirectToPage.bind(this);
    }

    state = {
        verificationCode: this.props.userStore.verificationCode,
    };

    handleChangePersonalCode(event) {
        this.props.userStore.personalCode = event.target.value;
    };

    redirectToPage = async () => {
        const personalCode = this.props.userStore.personalCode;
        await this.props.userStore.doSmartIdLogIn(personalCode);
        const sessionId = this.props.userStore.sessionId;
        console.log(sessionId);
        await this.props.userStore.pollSmartId(sessionId);
    };

    renderLoginForm = () => {


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
                    <VerificationModal userStore={this.props.userStore}/>
                </form>
            </React.Fragment>
        );
    };

    renderVerificationStep = () => {
        const { classes } = this.props;

        return (
          <Grid
              container
              direction="row"
              justify="center"
              alignItems="center"
          >

              <Grid container xs={6} justify="center" alignItems="center">
                  <CircularProgress size={50}/>
                  <br/>
                  <h3 className={classes.verificationText}>Verification Code</h3>
                  <h1>{this.props.userStore.verificationCode}</h1>
              </Grid>
          </Grid>
      );
    };

    render() {
        return (
            this.props.userStore.verificationCode ? this.renderVerificationStep() : this.renderLoginForm()
        );
    };
}

export default LoginSmartId;
