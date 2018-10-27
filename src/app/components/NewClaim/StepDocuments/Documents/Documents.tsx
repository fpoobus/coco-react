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
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>File Name</TableCell>
                        <TableCell numeric>Size</TableCell>
                        <TableCell numeric>Modified</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                </TableBody>
            </Table>

            <input id="contained-button-file" style={input} multiple type="file"/>
            <br/>
            <br/>
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
