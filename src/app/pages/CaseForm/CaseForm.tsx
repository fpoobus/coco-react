import * as React from 'react';
import withStyles, {WithStyles} from '@material-ui/core/styles/withStyles';
import {caseFormStyles} from 'app/pages/CaseForm/styles';
import Grid from '@material-ui/core/Grid/Grid';
import TextField from '@material-ui/core/TextField';
import Paper from "@material-ui/core/es/Paper/Paper";
import Avatar from '@material-ui/core/Avatar/Avatar';
import {Chip} from '@material-ui/core';
import FaceIcon from '@material-ui/icons/Face';
import Typography from "@material-ui/core/es/Typography/Typography";
import Button from "@material-ui/core/es/Button/Button";
import RootContainer from "app/components/Container/RootContainer";
import Icon from '@material-ui/core/es/Icon/Icon';

interface DashboardProps extends WithStyles<typeof caseFormStyles> {

}

class CaseForm extends React.Component<DashboardProps> {
    state = {
        name: 'Case type',
        age: '',
        multiline: 'Controlled',
        currency: 'EUR',
    };

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };


    render() {
        const {classes} = this.props;
        return (
            <RootContainer>
                <Grid container spacing={24}>
                    <Grid item xs={12}>
                        <Typography>New case </Typography>
                        <Chip
                            avatar={<Avatar><FaceIcon/></Avatar>}
                            label="John Doe (Cars Ltd)"
                            onClick={this.handleChange}
                            className={classes.chip}
                        />
                        VS
                        <Chip
                            avatar={<Avatar><FaceIcon/></Avatar>}
                            label="Elon Musk (Tesla Ltd)"
                            onClick={this.handleChange}
                            className={classes.chip}
                        />
                        <Button variant="contained" color="primary" className={classes.button}>
                            PRINT
                        </Button>
                    </Grid>
                    <Grid item xs={12}>
                        <Paper className={classes.paper}>
                            <form className={classes.container} noValidate autoComplete="off">
                                <TextField
                                    id="standard-name"
                                    className={classes.textField}
                                    value={this.state.name}
                                    onChange={this.handleChange('name')}
                                />
                            </form>
                        </Paper>
                    </Grid>

                    <Grid container spacing={24}>
                        <Grid item xs={12}>
                            <Button variant="contained" color="primary" className={classes.button}>
                                Register
                                <Icon className={classes.rightIcon}>send</Icon>
                            </Button>
                            <Button variant="contained" color="secondary" className={classes.button}>
                                Return to claimant
                                <Icon className={classes.rightIcon}>settings_backup_restore</Icon>
                            </Button>
                            <Button variant="contained" color="primary" className={classes.button}>
                                Back
                                <Icon className={classes.rightIcon}>keyboard_arrow_left</Icon>
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </RootContainer>
        );
    }
}

export default withStyles(caseFormStyles)(CaseForm);
