import * as React from 'react';
import {inject, observer} from 'mobx-react';
import NewClaimStore from 'app/stores/NewClaimStore';
import TextField from '@material-ui/core/TextField';
import {runInAction} from 'mobx';
import axios from 'axios';
import {LegalEntityResponse, PersonResponse} from 'app/model/NewClaim';
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";

export interface ClaimantProps {
    newClaimStore: NewClaimStore
}

export interface ClaimantState {
    /* empty */
}


@inject('routerStore', 'newClaimStore')
@observer
export class Claimant extends React.Component<ClaimantProps, ClaimantState> {

    state = {
        value: '',
    };

    handleRadioChange = event => {
        console.log("Setting value to " + event.target.value)
        this.setState({value: event.target.value});
    };

    componentDidMount() {
        axios.get(`http://139.59.148.64/coco-api/persons/70102010000`, {
            headers: {
                'Access-Control-Allow-Origin': '*'
            }
        })
            .then(res => {
                runInAction(() => {
                    console.log(res.data);
                    this.props.newClaimStore.personResponse = PersonResponse.fromJson(res.data);
                    this.state.value = this.props.newClaimStore.newClaim.legalPerson.registry_code;
                    console.log(this.props.newClaimStore.personResponse);
                });
            });
    }

    naturalEntityFields() {
        let newClaim = this.props.newClaimStore.newClaim;
        return <>

            <TextField
                label="First Name"
                fullWidth
                value={newClaim.naturalPerson.first_name}
                onChange={this.handleChange('first_name')}
                margin="normal"
            />

            <TextField
                label="Middle Names"
                fullWidth
                value={newClaim.naturalPerson.middle_names}
                onChange={this.handleChange('middle_names')}
                margin="normal"
            />

            <TextField
                label="Last Name"
                fullWidth
                value={newClaim.naturalPerson.last_name}
                onChange={this.handleChange('last_name')}
                margin="normal"
            />

            <TextField
                label="Date of Birth"
                fullWidth
                type="date"
                value={newClaim.naturalPerson.date_of_birth}
                onChange={this.handleChange('date_of_birth')}
                margin="normal"
                InputLabelProps={{
                    shrink: true
                }}
            />

            <TextField
                label="Date of Birth"
                fullWidth
                value={newClaim.naturalPerson.address}
                onChange={this.handleChange('address')}
                margin="normal"
            />
        </>;
    }

    handleChange = name => event => {
        runInAction(() => {
            this.props.newClaimStore.newClaim.naturalPerson[name] = event.target.value;
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
        this.props.newClaimStore.newClaim.legalPerson.name = entity.name;
        this.props.newClaimStore.newClaim.legalPerson.registry_code = entity.entityId;
       // this.nextStepWithLoader();
    };


    legalEntityFields() {

        let result = [];

        if (this.props.newClaimStore.personResponse) {
            this.props.newClaimStore.personResponse.legalEntities.map((legalEntity, index) => {
                /*
                result.push(<Button onClick={() => this.setActiveLegalEntity(legalEntity)} variant="contained"
                                    color="primary">

                </Button>);
                result.push(<br/>);
                */

                result.push(<FormControlLabel onClick={() => this.setActiveLegalEntity(legalEntity)} value={"" + legalEntity.registryCode}
                                              control={<Radio onClick={() => this.setActiveLegalEntity(legalEntity)}/>}
                                              label={legalEntity.registryCode + " " + legalEntity.name}/>)
            })
        }

        return result;
    }


    claimantInfo() {
        return <>
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
