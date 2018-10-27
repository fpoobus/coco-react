import * as React from 'react';
import {inject, observer} from 'mobx-react';
import NewClaimStore from 'app/stores/NewClaimStore';
import TextField from '@material-ui/core/TextField';
import {runInAction} from 'mobx';
import axios from "axios";
import {DefendantResponse} from "app/model/NewClaim";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";

export interface DefendantProps {
    newClaimStore: NewClaimStore
}

export interface DefendantState {
    /* empty */
}


@inject('routerStore', 'newClaimStore')
@observer
export class Defendant extends React.Component<DefendantProps, DefendantState> {


    handleChange = (name) => event => {
        this.props.newClaimStore.setDefendantRegistryCode(event.target.value);

        runInAction(() => {
            console.log(event.target.value);
            this.props.newClaimStore.newClaim.defendant[name] = event.target.value;

        });


    };

    getDefendantInto = () => {

        axios.get(`http://139.59.148.64/coco-api/legal-entities/` + this.props.newClaimStore.newClaim.defendant.registryCode, {
            headers: {
                'Access-Control-Allow-Origin': '*'
            }
        })
            .then(res => {
                runInAction(() => {
                    this.props.newClaimStore.defendantResponse = DefendantResponse.fromJson(res.data);

                });
            }).catch(e => {

        });
    }

    renderDefendantInput() {

        return <>

            <TextField
                label="Defendant registry code"
                fullWidth
                value={this.props.newClaimStore.defendantRegistryCode}
                onChange={this.handleChange('registryCode')}
                margin="normal"
            />
            <Button variant="contained" onClick={this.getDefendantInto}>
                Find
            </Button>

            {this.props.newClaimStore.defendantResponse && <>
                <br/><br/>
                <Typography component="h2" variant="h6" gutterBottom>
                    Found the following legal entity:
                </Typography>
                <Divider light/>
                <p><strong>Name: </strong>{this.props.newClaimStore.defendantResponse.name}</p>
                <p><strong>Registry Code: </strong>{this.props.newClaimStore.defendantResponse.registryCode}</p>
                <p><strong>Activities: </strong>{this.props.newClaimStore.defendantResponse.activities.join(", ")}</p>
            </>}

        </>;
    }


    render() {
        return this.renderDefendantInput();
    }
}

export default Defendant;
