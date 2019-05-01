import * as React from 'react';
import withStyles, {WithStyles} from '@material-ui/core/styles/withStyles';
import {loginStyles} from 'app/containers/Login/styles';
import TextField from "@material-ui/core/TextField";
import {runInAction} from "mobx";
import {inject, observer} from "mobx-react";
import AdminStore from "app/stores/AdminStore";
import Button from "@material-ui/core/Button";


interface AdminMultiFormProps extends WithStyles<typeof loginStyles> {
    adminStore?: AdminStore
}

@inject('adminStore')
@observer
class AdminMultiForm extends React.Component<AdminMultiFormProps> {

    handleChange = (who, value) => event => {

        runInAction(() => {
            this.props.adminStore.formProps[who][value] = event.target.value;
        });


    };

    addFather = async () => {
        let data = {
            addressId: 2,
            date: "1980-05-09T21:00:00.000Z",
            familyName: "Tamm",
            givenName: "Tarmo",
            personCode: 99000000012,
            sex: "MALE",
        }
        console.log(data);
    }

    addMother = async () => {
        let data = {
            addressId: 2,
            date: "1980-05-09T21:00:00.000Z",
            familyName: "Tamm",
            givenName: "Tarmo",
            personCode: 99000000012,
            sex: "MALE",
        }
        console.log(data);
    }

    addChild7 = async () => {
        let data = {
            addressId: 2,
            date: "1980-05-09T21:00:00.000Z",
            familyName: "Tamm",
            givenName: "Tarmo",
            personCode: 99000000012,
            sex: "MALE",
        }
        console.log(data);
    }

    addChild18 = async () => {
        let data = {
            addressId: 2,
            date: "1980-05-09T21:00:00.000Z",
            familyName: "Tamm",
            givenName: "Tarmo",
            personCode: 99000000012,
            sex: "MALE",
        }
        console.log(data);
    }

    addToMarry = async () => {
        let data = {
            addressId: 2,
            date: "1980-05-09T21:00:00.000Z",
            familyName: "Tamm",
            givenName: "Tarmo",
            personCode: 99000000012,
            sex: "MALE",
        }
        console.log(data);
    }

    addToCreateCompanyWith = async () => {
        let data = {
            addressId: 2,
            date: "1980-05-09T21:00:00.000Z",
            familyName: "Tamm",
            givenName: "Tarmo",
            personCode: 99000000012,
            sex: "MALE",
        }
        console.log(data);
    }

    createPersonSet = async () => {
        await this.addMother();
        await this.addFather();

        await this.addChild7();
        await this.addChild18();

        await this.addToMarry();
        await this.addToCreateCompanyWith();
    }

    render() {
        return (
            <React.Fragment>
                <h1>Father</h1>
                <TextField
                    label="Given name"
                    fullWidth
                    margin="normal"
                    value={this.props.adminStore.formProps.father.firstName}
                    onChange={this.handleChange('father', 'firstName')}
                />
                <TextField
                    label="Family name"
                    fullWidth
                    margin="normal"
                    value={this.props.adminStore.formProps.father.lastName}
                    onChange={this.handleChange('father', 'lastName')}
                />
                <TextField
                    label="Address ID"
                    fullWidth
                    margin="normal"
                />

                <h1>Mother</h1>
                <TextField
                    label="Given name"
                    fullWidth
                    margin="normal"
                    value={this.props.adminStore.formProps.mother.firstName}
                    onChange={this.handleChange('mother', 'firstName')}
                />
                <TextField
                    label="Family name"
                    fullWidth
                    margin="normal"
                    value={this.props.adminStore.formProps.mother.lastName}
                    onChange={this.handleChange('mother', 'lastName')}
                />
                <TextField
                    label="Address ID"
                    fullWidth
                    margin="normal"
                />

                <h1>Child (7 years old)</h1>
                <TextField
                    label="Given name"
                    fullWidth
                    margin="normal"
                    value={this.props.adminStore.formProps.child1.firstName}
                    onChange={this.handleChange('child1', 'firstName')}
                />
                <TextField
                    label="Family name"
                    fullWidth
                    margin="normal"
                    value={this.props.adminStore.formProps.child1.lastName}
                    onChange={this.handleChange('child1', 'lastName')}
                />
                <TextField
                    label="Address ID"
                    fullWidth
                    margin="normal"
                />

                <h1>Child (18 years old)</h1>
                <TextField
                    label="Given name"
                    fullWidth
                    margin="normal"
                    value={this.props.adminStore.formProps.child2.firstName}
                    onChange={this.handleChange('child2', 'firstName')}
                />
                <TextField
                    label="Family name"
                    fullWidth
                    margin="normal"
                    value={this.props.adminStore.formProps.child2.lastName}
                    onChange={this.handleChange('child2', 'lastName')}
                />
                <TextField
                    label="Address ID"
                    fullWidth
                    margin="normal"
                />

                <h1>Person to marry with</h1>
                <TextField
                    label="Given name"
                    fullWidth
                    margin="normal"
                    value={this.props.adminStore.formProps.toMarry.firstName}
                    onChange={this.handleChange('toMarry', 'firstName')}
                />
                <TextField
                    label="Family name"
                    fullWidth
                    margin="normal"
                    value={this.props.adminStore.formProps.toMarry.lastName}
                    onChange={this.handleChange('toMarry', 'lastName')}
                />
                <TextField
                    label="Address ID"
                    fullWidth
                    margin="normal"
                />

                <h1>Person to create company with</h1>
                <TextField
                    label="Given name"
                    fullWidth
                    margin="normal"
                    value={this.props.adminStore.formProps.toCompany.firstName}
                    onChange={this.handleChange('toCompany', 'firstName')}
                />
                <TextField
                    label="Family name"
                    fullWidth
                    margin="normal"
                    value={this.props.adminStore.formProps.toCompany.lastName}
                    onChange={this.handleChange('toCompany', 'lastName')}
                />
                <TextField
                    label="Address ID"
                    fullWidth
                    margin="normal"
                />

                <Button
                    variant="contained"
                    onClick={this.createPersonSet}>
                    Create person set
                </Button>
            </React.Fragment>
        );
    }
}

export default withStyles(loginStyles)(AdminMultiForm);
