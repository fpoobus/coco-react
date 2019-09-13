import * as React from 'react';
import {inject, observer} from 'mobx-react';
import NewClaimStore from 'app/stores/NewClaimStore';
import TextField from '@material-ui/core/TextField';
import {reaction, runInAction} from 'mobx';
import {LegalEntityResponse, NaturalPerson, PersonResponse} from 'app/model/NewClaim';
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import UserStore from "app/stores/UserStore";
import axios from 'axios';
import Divider from "@material-ui/core/Divider";

export interface ClaimantProps {
    newClaimStore?: NewClaimStore,
    userStore?: UserStore
}

export interface ClaimantState {
    /* empty */
}


@inject('routerStore', 'userStore', 'newClaimStore')
@observer
export class Claimant extends React.Component<ClaimantProps, ClaimantState> {

    disposer = null;

    state = {
        value: '',
        naturalPerson: {
            first_name: '',
            last_name: '',
            address: '',
            date_of_birth: '',
            personId: ''
        } as NaturalPerson,
    };

    handleRadioChange = event => {
        console.log("Setting value to " + event.target.value);
        this.setState({value: event.target.value});
    };

    componentDidMount() {
        this.prefillUser();
        this.disposer = reaction(() => this.props.userStore.user, (change) => {
            this.prefillUser();
        });
    }

    componentWillUnmount(): void {
        this.disposer();
    }

    prefillUser() {
        this.props.newClaimStore.setLoading(true);
        let personId = this.props.userStore.personalCode;
        if (personId) {
            //81010260002
            axios.get(`http://139.59.148.64/coco-api/persons/` + personId, {
                headers: {
                    'Access-Control-Allow-Origin': '*'
                }
            })
                .then(res => {
                    runInAction(() => {
                        console.log(res.data);
                        this.props.newClaimStore.personResponse = PersonResponse.fromJson(res.data);
                        this.state.value = this.props.newClaimStore.newClaim.legalPerson.registry_code;

                        this.props.newClaimStore.newClaim.naturalPerson = {
                            first_name: this.props.newClaimStore.personResponse.firstName,
                            last_name: this.props.newClaimStore.personResponse.lastName,
                            address: this.props.newClaimStore.personResponse.address,
                            date_of_birth: this.props.newClaimStore.personResponse.dateOfBirth,
                            personId: this.props.newClaimStore.personResponse.personId
                        } as NaturalPerson;

                        this.state.naturalPerson =
                            Object.assign({}, this.props.newClaimStore.newClaim.naturalPerson);

                        console.log("Claim obj", this.props.newClaimStore.newClaim);
                        console.log(this.props.newClaimStore.personResponse);

                        this.setState(this.state);
                    });
                    this.props.newClaimStore.setLoading(false);
                }).catch(() => {
                this.props.newClaimStore.setNoLeglaEntities(true);

            });
        } else {
            this.props.newClaimStore.setNoLeglaEntities(true);
            this.props.newClaimStore.setLoading(false);
        }
    }

    naturalEntityFields() {
        let newClaim = this.props.newClaimStore.newClaim;
        console.log("naturalEntityFields", newClaim.naturalPerson);
        return <>

            <TextField
                label="First Name"
                fullWidth
                value={this.state.naturalPerson.first_name}
                onChange={this.handleChange('first_name')}
                margin="normal"
            />

            <TextField
                label="Middle Names"
                fullWidth
                value={this.state.naturalPerson.middle_names}
                onChange={this.handleChange('middle_names')}
                margin="normal"
            />

            <TextField
                label="Last Name"
                fullWidth
                value={this.state.naturalPerson.last_name}
                onChange={this.handleChange('last_name')}
                margin="normal"
            />

            <TextField
                label="Date of Birth"
                fullWidth
                type="date"
                value={this.state.naturalPerson.date_of_birth}
                onChange={this.handleChange('date_of_birth')}
                margin="normal"
                InputLabelProps={{
                    shrink: true
                }}
            />

            <TextField
                label="Address"
                fullWidth
                value={this.state.naturalPerson.address}
                onChange={this.handleChange('address')}
                margin="normal"
            />
        </>;
    }

    handleChange = name => event => {
        runInAction(() => {
            this.props.newClaimStore.newClaim.naturalPerson[name] = event.target.value;
            this.state.naturalPerson[name] = event.target.value;
            this.setState(this.state);
        });
    };


    nextStepWithLoader = () => {
        this.props.newClaimStore.setLoading(true);
        setTimeout(() => {
            this.props.newClaimStore.setLoading(false);
            this.props.newClaimStore.nextStep();
        }, 800);
    }

    setActiveLegalEntity = (entity: LegalEntityResponse) => {
        console.log("setActiveLegalEntity", entity);
        this.props.newClaimStore.newClaim.isLegalEntity = true;
        this.props.newClaimStore.newClaim.legalPerson.name = entity.name;
        this.props.newClaimStore.newClaim.legalPerson.registry_code = entity.registryCode;
        // this.nextStepWithLoader();
    };


    legalEntityFields() {

        let result = [];

        if (this.props.newClaimStore.personResponse) {
            console.log("legalEntityFields", this.props.newClaimStore.personResponse.legalEntities);
            this.props.newClaimStore.personResponse.legalEntities.map((legalEntity, index) => {
                /*
                result.push(<Button onClick={() => this.setActiveLegalEntity(legalEntity)} variant="contained"
                                    color="primary">

                </Button>);
                result.push(<br/>);
                */

                result.push(<FormControlLabel onClick={() => this.setActiveLegalEntity(legalEntity)}
                                              value={"" + legalEntity.registryCode}
                                              control={<Radio onClick={() => this.setActiveLegalEntity(legalEntity)}/>}
                                              label={legalEntity.registryCode + " " + legalEntity.name}/>)
            })
        }
        if(this.props.newClaimStore.noLegalEntities) {
            result.push(<p>No legal entities found</p>);
        }
        return result;
    }


    claimantInfo() {
        return <>
            <h1>Claimant Information</h1>
            <Divider light/>
            {this.props.newClaimStore.isNaturalSection && this.naturalEntityFields()}
            {this.props.newClaimStore.isLegalSection && <>
                <RadioGroup
                    aria-label="Gender"
                    name="gender1"
                    value={this.state.value}
                    onChange={this.handleRadioChange}
                >
                    {this.legalEntityFields()}
                </RadioGroup>
            </>}
        </>;
    }

    render() {
        return this.claimantInfo();
    }
}

export default Claimant;
