import * as React from 'react';
import {inject, observer} from "mobx-react";
import NewClaimStore from "app/stores/NewClaimStore";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

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

    renderUploadButton() {
        return <>

            <Typography component="h1" variant="h5">
                Please attach the documents relevant to the claim being submitted.
            </Typography>

            <input id="contained-button-file" style={input} multiple type="file"/>
            <label htmlFor="contained-button-file">
                <Button variant="contained" component="span">
                    Upload
                </Button>
            </label></>
    }

    render() {
        return <>
            {this.renderUploadButton()}
        </>
    }
}

export default Documents;
