import * as React from 'react';
import {inject, observer} from "mobx-react";
import NewClaimStore from "app/stores/NewClaimStore";
import Button from "@material-ui/core/Button";

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
        return <><input id="contained-button-file" style={input} multiple type="file"/>
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
