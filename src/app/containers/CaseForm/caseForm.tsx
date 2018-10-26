import * as React from 'react';
import withStyles, {WithStyles} from '@material-ui/core/styles/withStyles';
import {caseFormStyles} from 'app/containers/CaseForm/styles';
import Grid from '@material-ui/core/Grid/Grid';
import TextField from '@material-ui/core/TextField';
import Paper from "@material-ui/core/es/Paper/Paper";
import Avatar from '@material-ui/core/Avatar/Avatar';
import {Chip} from '@material-ui/core';
import FaceIcon from '@material-ui/icons/Face';


interface DashboardProps extends WithStyles<typeof caseFormStyles> {

}

class CaseForm extends React.Component<DashboardProps> {
    state = {
        name: 'Cat in the Hat',
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
            <div className={classes.root}>
                <Grid container spacing={24}>
                    <Grid item xs={12}>
                        <h1>New case </h1>
                        <Chip
                            avatar={<Avatar><FaceIcon/></Avatar>}
                            label="John Doe (Cars Ltd)"
                            onClick={this.handleChange}
                            className={classes.chip}
                        />
                        <Chip
                            avatar={<Avatar><FaceIcon/></Avatar>}
                            label="Elon Musk (Tesla Ltd)"
                            onClick={this.handleChange}
                            className={classes.chip}
                        />

                    </Grid>
                </Grid>
                <Grid container spacing={24}>
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
                </Grid>
            </div>
        );
    }
}

export default withStyles(caseFormStyles)(CaseForm);
