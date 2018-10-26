import * as React from 'react';
import Avatar from "@material-ui/core/Avatar/Avatar";
import LockIcon from "@material-ui/core/SvgIcon/SvgIcon";
import Typography from "@material-ui/core/Typography/Typography";
import FormControl from "@material-ui/core/FormControl/FormControl";
import InputLabel from "@material-ui/core/InputLabel/InputLabel";
import Input from "@material-ui/core/Input/Input";
import FormControlLabel from "@material-ui/core/FormControlLabel/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox/Checkbox";
import Button from "@material-ui/core/Button/Button";
import UserStore from "app/stores/UserStore";
import {inject} from "mobx-react";

interface LoginPasswordProps {
    classes?: any;
    userStore: UserStore;
}

@inject('userStore')
export class LoginPassword extends React.Component<LoginPasswordProps> {
    constructor(props) {
        super(props);

        this.handleChangePersonalCode = this.handleChangePersonalCode.bind(this);
        this.handleChangePassword = this.handleChangePassword.bind(this);
        this.redirectToPage = this.redirectToPage.bind(this);
    }

    handleChangePersonalCode(event) {
        console.log('PersonalCode: ', event.target.value)
    };

    handleChangePassword(event) {
        console.log('Password: ', event.target.value)
    };
    redirectToPage = () => {
        window.location.href="/";
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
                  control={<Checkbox value="remember" color="primary" />}
                  label="Remember me"
              />
              <Button
                  onClick={() => { this.redirectToPage(); }}
                  type="submit"
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
