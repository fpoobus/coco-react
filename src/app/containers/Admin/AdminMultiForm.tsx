import * as React from 'react';
import withStyles, {WithStyles} from '@material-ui/core/styles/withStyles';
import {loginStyles} from 'app/containers/Login/styles';
import TextField from "@material-ui/core/TextField";
import {runInAction} from "mobx";
import {inject, observer} from "mobx-react";
import AdminStore from "app/stores/AdminStore";
import Button from "@material-ui/core/Button";
import axios from "axios";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import Grid from "@material-ui/core/Grid";
import CircularProgress from "@material-ui/core/CircularProgress";
import {Paper} from "@material-ui/core";


interface AdminMultiFormProps extends WithStyles<typeof loginStyles> {
    adminStore?: AdminStore
}


const proxy = "https://cors-anywhere.herokuapp.com/";
@inject('adminStore')
@observer
class AdminMultiForm extends React.Component<AdminMultiFormProps> {


    handleChange = (who, value) => event => {

        runInAction(() => {
            this.props.adminStore.formProps[who][value] = event.target.value;
        });


    };

    registerPerson = async (data) => {
        /*
            addressId: 2
            date: "2000-05-21T22:00:00.000Z"
            familyName: "Maasikas"
            givenName: "Malle"
            personCode: 11000000001
            sex: "FEMALE"
         */
        return axios.post(proxy + 'http://africa.nortal.com/person-registry/api/v1/persons', data, {
            headers: {}
        })
            .then(res => {
                return Promise.resolve();
            })
            .catch(error => {
                return Promise.reject(error);
            })

    };

    registerBirth = async (data) => {
        /*
            date: "2018-05-05T11:01:00"
            day: "2018-05-05T21:00:00.000Z"
            fatherCode: "11000000000"
            height: 30
            motherCode: "11000000001"
            sex: "MALE"
            time: "11:01"
            weight: 2
         */
        // Code from location header


        return axios.post(proxy + 'http://africa.nortal.com/person-registry/api/v1/birth', data
        )
            .then(res => {
                return Promise.resolve(res.headers);
            })
            .catch(error => {
                return Promise.reject(error);
            })
    };

    registerName = async (code: string, data) => {
        /*
        familyName: "Saabas"
        givenName: "Karl"
        personCode: "71805050005"
         */
        return axios.put(proxy + 'http://africa.nortal.com/person-registry/api/v1/persons/' + code, data, {
            headers: {}
        })
            .then(res => {
                return Promise.resolve();
            })
            .catch(error => {
                return Promise.reject(error);
            })
    };

    registerMarriage = async (data) => {
        /*
            brideCode: "11000000001"
            date: "2018-05-13T21:00:00.000Z"
            day: "2018-05-13T21:00:00.000Z"
            groomCode: "11000000000"
            prenuptial: "JOINT"
            surnameType: "TAKE_HUSBAND"
         */
        // Response location header: http://africa.nortal.com/person-registry/api/v1/marriage/d09efee7-b9a5-4812-806f-18f327b30396
        return axios.post(proxy + 'http://africa.nortal.com/person-registry/api/v1/marriage', data, {
            headers: {}
        })
            .then(res => {
                return Promise.resolve();
            })
            .catch(error => {
                return Promise.reject(error);
            })
    };

    addFather = async () => {
        let data = {
            addressId: this.props.adminStore.formProps.father.addressId,
            date: this.props.adminStore.formProps.father.dateOfBirth,
            familyName: this.props.adminStore.formProps.father.lastName,
            givenName: this.props.adminStore.formProps.father.firstName,
            personCode: this.props.adminStore.formProps.father.personId,
            sex: this.props.adminStore.formProps.father.gender,
        };
        await this.registerPerson(data);
    };

    addMother = async () => {
        let data = {
            addressId: this.props.adminStore.formProps.mother.addressId,
            date: this.props.adminStore.formProps.mother.dateOfBirth,
            familyName: this.props.adminStore.formProps.mother.lastName,
            givenName: this.props.adminStore.formProps.mother.firstName,
            personCode: this.props.adminStore.formProps.mother.personId,
            sex: this.props.adminStore.formProps.mother.gender,
        };
        await this.registerPerson(data);
    };

    addChild7 = async () => {

        /*

            date: "2018-05-05T11:01:00"
            day: "2018-05-05T21:00:00.000Z"
            fatherCode: "11000000000"
            height: 30
            motherCode: "11000000001"
            sex: "MALE"
            time: "11:01"
            weight: 2


         */
        let birthData = {
            date: this.props.adminStore.formProps.child1.dateOfBirth,
            day: this.props.adminStore.formProps.child1.day,
            fatherCode: this.props.adminStore.formProps.father.personId,
            height: 30,
            motherCode: this.props.adminStore.formProps.mother.personId,
            sex: this.props.adminStore.formProps.child1.gender,
            time: "11:01",
            weight: 2
        };
        let headers = await this.registerBirth(birthData);
        let code = headers.location.split("/").reverse()[0];

        let nameData = {
            givenName: this.props.adminStore.formProps.child1.firstName,
            familyName: this.props.adminStore.formProps.child1.lastName,
            personCode: code
        };

        await this.registerName(code, nameData);
    };

    addChild18 = async () => {
        let birthData = {
            date: this.props.adminStore.formProps.child2.dateOfBirth,
            day: this.props.adminStore.formProps.child2.day,
            fatherCode: this.props.adminStore.formProps.father.personId,
            height: 30,
            motherCode: this.props.adminStore.formProps.mother.personId,
            sex: this.props.adminStore.formProps.child2.gender,
            time: "11:01",
            weight: 2
        };
        let headers = await this.registerBirth(birthData);
        let code = headers.location.split("/").reverse()[0];

        let nameData = {
            givenName: this.props.adminStore.formProps.child2.firstName,
            familyName: this.props.adminStore.formProps.child2.lastName,
            personCode: code
        };

        await this.registerName(code, nameData);
    }

    addToMarry = async () => {
        let data = {
            addressId: this.props.adminStore.formProps.toMarry.addressId,
            date: this.props.adminStore.formProps.toMarry.dateOfBirth,
            familyName: this.props.adminStore.formProps.toMarry.lastName,
            givenName: this.props.adminStore.formProps.toMarry.firstName,
            personCode: this.props.adminStore.formProps.toMarry.personId,
            sex: this.props.adminStore.formProps.toMarry.gender,
        };
        await this.registerPerson(data);
    };

    addToCreateCompanyWith = async () => {
        let data = {
            addressId: this.props.adminStore.formProps.toCompany.addressId,
            date: this.props.adminStore.formProps.toCompany.dateOfBirth,
            familyName: this.props.adminStore.formProps.toCompany.lastName,
            givenName: this.props.adminStore.formProps.toCompany.firstName,
            personCode: this.props.adminStore.formProps.toCompany.personId,
            sex: this.props.adminStore.formProps.toCompany.gender,
        };
        await this.registerPerson(data);
    };

    timeout(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    createPersonSet = async () => {
        this.props.adminStore.setLoading(true);
        //await this.timeout(3000);

        await this.addMother();
        await this.addFather();

        let marriageData = {
            brideCode: this.props.adminStore.formProps.mother.personId,
            groomCode: this.props.adminStore.formProps.father.personId,
            date: "2018-05-13T21:00:00.000Z",
            day: "2018-05-13T21:00:00.000Z",
            prenuptial: "JOINT",
            surnameType: "TAKE_HUSBAND"
        }
        await this.registerMarriage(marriageData);

        await this.addChild7();
        await this.addChild18();
        await this.addToMarry();
        await this.addToCreateCompanyWith();

        this.props.adminStore.setLoading(false);
    };

    renderLoading() {
        return <>
            <Dialog
                fullScreen={false}
                open={this.props.adminStore.queryLoading}
                aria-labelledby="responsive-dialog-title"
            >
                <DialogTitle
                    id="responsive-dialog-title">{"Loading..."}</DialogTitle>
                <DialogContent>
                    <Grid container justify="center">
                        <Grid item>

                            <CircularProgress size={50}/>

                        </Grid>
                    </Grid>
                </DialogContent>
            </Dialog></>
    }

    renderFormFields = (who, exclude) => {
        return <>

            <Grid container spacing={16}>
                <Grid item xs={12}>
                    <Grid container justify="center" spacing={16}>
                        <Grid item xs={6}>
                            <Paper style={{padding: "10px"}}>

                                {!exclude.personId &&
                                <TextField
                                    label="Person ID"
                                    fullWidth
                                    margin="normal"
                                    value={this.props.adminStore.formProps[who]['personId']}
                                    onChange={this.handleChange(who, 'personId')}
                                />
                                }
                                <TextField
                                    label="Given name"
                                    fullWidth
                                    margin="normal"
                                    value={this.props.adminStore.formProps[who]['firstName']}
                                    onChange={this.handleChange(who, 'firstName')}
                                />
                                <TextField
                                    label="Family name"
                                    fullWidth
                                    margin="normal"
                                    value={this.props.adminStore.formProps[who]['lastName']}
                                    onChange={this.handleChange(who, 'lastName')}
                                />

                            </Paper>
                        </Grid>

                        <Grid item xs={6}>
                            <Paper style={{padding: "10px"}}>

                                <TextField
                                    label="Gender"
                                    fullWidth
                                    margin="normal"
                                    value={this.props.adminStore.formProps[who]['gender']}
                                    onChange={this.handleChange(who, 'gender')}
                                />
                                <TextField
                                    label="Date of birth"
                                    fullWidth
                                    margin="normal"
                                    value={this.props.adminStore.formProps[who]['dateOfBirth']}
                                    onChange={this.handleChange(who, 'dateOfBirth')}
                                />
                                {!exclude.day &&
                                <TextField
                                    label="Day"
                                    fullWidth
                                    margin="normal"
                                    value={this.props.adminStore.formProps[who]['day']}
                                    onChange={this.handleChange(who, 'day')}
                                />
                                }
                                <TextField
                                    label="Address ID"
                                    fullWidth
                                    margin="normal"
                                    value={this.props.adminStore.formProps[who]['addressId']}
                                    onChange={this.handleChange(who, 'addressId')}
                                />

                            </Paper>
                        </Grid>

                    </Grid>
                </Grid>
            </Grid>


        </>
    }

    render() {
        return (
            <React.Fragment>
                <div style={{margin: "30px"}}>
                <Grid container spacing={16}>
                    <Grid item xs={12}>
                        <Grid container justify="center" spacing={16}>

                            {this.renderLoading()}

                            <Grid container justify="center" spacing={16}>
                            <h1>Demo data set creator utility</h1>

                            </Grid>

                            <h1>Father</h1>
                            {this.renderFormFields('father', {day: true})}

                            <h1>Mother</h1>
                            {this.renderFormFields('mother', {day: true})}


                            <h1>Child #1</h1>
                            {this.renderFormFields('child1', {personId: true})}


                            <h1>Child #2</h1>
                            {this.renderFormFields('child2', {personId: true})}


                            <h1>Person to marry with</h1>
                            {this.renderFormFields('toMarry', {day: true})}


                            <h1>Person to create company with</h1>
                            {this.renderFormFields('toCompany', {day: true})}

                            <Grid item xs={12}>
                            <div style={{height: "30px"}}/>
                            <Button
                                variant="contained"
                                onClick={this.createPersonSet}>
                                Create person set
                            </Button>
                            <div style={{height: "30px"}}/>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                </div>
            </React.Fragment>
        );
    }
}

export default withStyles(loginStyles)(AdminMultiForm);
