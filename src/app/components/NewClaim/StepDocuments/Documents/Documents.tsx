import * as React from 'react';
import {inject, observer} from "mobx-react";
import NewClaimStore from "app/stores/NewClaimStore";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import {ClaimDocument} from "app/model/NewClaim";
import {runInAction} from "mobx";

export interface DocumentsProps {
    newClaimStore: NewClaimStore
}

export interface DocumentsState {
    /* empty */
}

const input = {
    display: 'none'
}

@inject('routerStore', 'newClaimStore')
@observer
export class Documents extends React.Component<DocumentsProps, DocumentsState> {
    state = {
        open: false,
    };

    handleClickOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    attachFile(file) {
        runInAction(() => {
            this.props.newClaimStore.attachedFiles.push(file);
        })
        this.handleClose();
    }

    renderFiles() {
        let files = [];
        files.push({
            name: 'Proof of claim.pdf',
            added_by: '',
            modified: '2017.10.11 14:15'
        } as ClaimDocument);
        files.push({
            name: 'Evidence1.png',
            added_by: '',
            modified: '2017.10.30 12:33'
        } as ClaimDocument);
        files.push({
            name: 'Copy of emails.pdf',
            added_by: '',
            modified: '2018.09.30 20:55'
        } as ClaimDocument);


        let elements = [];
        files.forEach(file => {
            elements.push(<ListItem button>
                <ListItemText onClick={() => this.attachFile(file)} primary={file.name} />
            </ListItem>);
        });
        return elements;
    }

    renderButton() {
        return <><Button onClick={this.handleClickOpen}>Attach Documents</Button>
        <Dialog
        fullScreen={false}
        open={this.state.open}
        onClose={this.handleClose}
        aria-labelledby="responsive-dialog-title"
            >
            <DialogTitle id="responsive-dialog-title">{"Please attach the documents relevant to the claim being submitted."}</DialogTitle>
        <DialogContent>
            <DialogContentText>

            </DialogContentText>

            <List component="nav">
                {this.renderFiles()}
            </List>


            </DialogContent>
            <DialogActions>
                <Button onClick={this.handleClose} color="primary" autoFocus>
                    Close
                </Button>
            </DialogActions>
            </Dialog></>
    }

    attachedFiles() {
        let result = [];
        this.props.newClaimStore.attachedFiles.forEach(item => {
            result.push(<>
                <TableRow>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>{item.modified}</TableCell>
                    <TableCell>
                        <Button onClick={() => this.removeItem(item)} color="primary" autoFocus>
                            Remove
                        </Button>
                    </TableCell>
                </TableRow>
            </>);
        })
        return result;
    }

    removeItem(item) {
        let index = this.props.newClaimStore.attachedFiles.indexOf(item);
        if (index > -1) {
            runInAction(() => {
                this.props.newClaimStore.attachedFiles.splice(index, 1);
            })
        }
    }

    renderUploadButton() {
        return <>

            <Typography component="h1" variant="h5">
                Please attach the documents relevant to the claim being submitted.
            </Typography>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>File Name</TableCell>
                        <TableCell>Modified</TableCell>
                        <TableCell>Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {this.attachedFiles()}
                </TableBody>
            </Table>

            <input id="contained-button-file" style={input} multiple type="file"/>
            <br/>
            <br/>
            <label htmlFor="contained-button-file">
                {this.renderButton()}
            </label></>
    }

    render() {
        return <>
            {this.renderUploadButton()}
        </>
    }
}

export default Documents;
