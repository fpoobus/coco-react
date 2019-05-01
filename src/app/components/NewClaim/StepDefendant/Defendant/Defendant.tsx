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
import {CSSProperties} from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import List from "@material-ui/core/List";
import DialogActions from "@material-ui/core/DialogActions";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

export interface DefendantProps {
    newClaimStore: NewClaimStore
}

export interface DefendantState {
    /* empty */
}

const textfield = {
    width: '94%'
} as React.CSSProperties;

const findbtn: CSSProperties = {
    bottom: '0.6rem',
    position: 'absolute',
    marginLeft: '0.5rem',
} as React.CSSProperties;

const fieldcontainer: CSSProperties = {
    position: 'relative'
} as React.CSSProperties;

@inject('routerStore', 'newClaimStore')
@observer
export class Defendant extends React.Component<DefendantProps, DefendantState> {

    state = {
        open: false,
        allLegalEntitiesResult: []
    };

    componentDidMount() {
        this.props.newClaimStore.setNextButtonDisabled(true);
    }

    componentWillUnmount(): void {
        runInAction(() => {
            this.props.newClaimStore.defendantResponse = undefined;

        });
    }

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
        this.props.newClaimStore.setNextButtonDisabled(false);
    };

    getAllLegalEntities = () => {

        axios.get(`http://africa.nortal.com/company-registry/api/v1/companies`, {
            headers: {}
        })
            .then(res => {
                runInAction(() => {
                    this.setState({open: true, allLegalEntitiesResult: res.data});
                });
            }).catch(e => {
        });
    };

    handleClickOpen = () => {
        this.getAllLegalEntities();
    };

    handleClose = () => {
        this.setState({open: false});
    };

    searchByEntityId(code) {
        runInAction(() => {
            this.props.newClaimStore.newClaim.defendant.registryCode = code;
            this.setState({open: false});
            this.getDefendantInto();
        })
    }

    renderLegalEntities() {
        let files = [];

        this.state.allLegalEntitiesResult.forEach(legalEntity => {
            files.push({
                name: legalEntity.name,
                regNumber: legalEntity.regNumber
            });
        });

        let elements = [];
        files.forEach(file => {
            elements.push(<ListItem button>
                <ListItemText onClick={() => this.searchByEntityId(file.regNumber)}
                              primary={file.regNumber + " - " + file.name}/>
            </ListItem>);
        });
        return elements;
    }

    renderFindAllModalAndButton() {
        return <><Button variant="contained" onClick={this.handleClickOpen}>Click to choose from list</Button>
            <Dialog
                fullScreen={false}
                open={this.state.open}
                onClose={this.handleClose}
                aria-labelledby="responsive-dialog-title"
            >
                <DialogTitle
                    id="responsive-dialog-title">{"Choose from the options below"}</DialogTitle>
                <DialogContent>
                    <DialogContentText>

                    </DialogContentText>

                    <List component="nav">
                        {this.renderLegalEntities()}
                    </List>


                </DialogContent>
                <DialogActions>
                    <Button onClick={this.handleClose} color="primary" autoFocus>
                        Close
                    </Button>
                </DialogActions>
            </Dialog></>
    }

    renderDefendantInput() {

        return <>
            <h1>Choose the defendant by searching or selecting from list</h1>
            <Divider light/>
            <div>
                <h3>Select defendant from list:</h3>
                <Divider light/>
                <br/>
                {this.renderFindAllModalAndButton()}
            </div>
            <br/>
            <h3>Search defendant by Registry code:</h3>
            <Divider light/>
            <div style={fieldcontainer}>
                <TextField
                    label="Defendant registry code"
                    fullWidth
                    value={this.props.newClaimStore.defendantRegistryCode}
                    onChange={this.handleChange('registryCode')}
                    margin="normal"
                    style={textfield}
                />
                <Button
                    variant="contained"
                    onClick={this.getDefendantInto}
                    style={findbtn}>
                    Find
                </Button>
            </div>
            <br/>
            <div>
                {this.props.newClaimStore.defendantResponse && <>
                    <br/><br/>
                    <Typography component="h2" variant="h6" gutterBottom>
                        Found the following legal entity:
                    </Typography>
                    <Divider light/>
                    <p><strong>Name: </strong>{this.props.newClaimStore.defendantResponse.name}</p>
                    <p><strong>Registry Code: </strong>{this.props.newClaimStore.defendantResponse.registryCode}</p>
                    <p><strong>Activities: </strong>{this.props.newClaimStore.defendantResponse.activities.join(", ")}
                    </p>
                </>}

            </div>
        </>;
    }


    render() {
        return this.renderDefendantInput();
    }
}

export default Defendant;
