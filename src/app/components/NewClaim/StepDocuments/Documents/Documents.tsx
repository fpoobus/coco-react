import * as React from 'react';
import { inject, observer } from 'mobx-react';
import NewClaimStore from 'app/stores/NewClaimStore';
import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableBody from '@material-ui/core/TableBody';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { ClaimDocument } from 'app/model/NewClaim';
import { runInAction } from 'mobx';
import Divider from '@material-ui/core/Divider';

export interface DocumentsProps {
  newClaimStore: NewClaimStore
}

export interface DocumentsState {
  /* empty */
}

const input = {
  display: 'none'
};

@inject('routerStore', 'newClaimStore')
@observer
export class Documents extends React.Component<DocumentsProps, DocumentsState> {
  state = {
    open: false,
  };

  private handleClickOpen = () => this.setState({ open: true });
  private handleClose = () => this.setState({ open: false });

  attachFile(file) {
    runInAction(() => {
      this.props.newClaimStore.attachedFiles.push(file);
      this.props.newClaimStore.newClaim.documents.push(file)
    });
    this.handleClose();
  }

  renderFiles() {
    const files: ClaimDocument[] = [{
      name: 'Proof of claim.pdf',
      addedBy: '',
      modified: '2017.10.11 14:15'
    }, {
      name: 'Evidence1.png',
      addedBy: '',
      modified: '2017.10.30 12:33'
    }, {
      name: 'Copy of emails.pdf',
      addedBy: '',
      modified: '2018.09.30 20:55'
    }];

    return files.map((file, index: number) => (
      <ListItem key={`file-${index}`} button>
        <ListItemText onClick={() => this.attachFile(file)} primary={file.name} />
      </ListItem>
    ));
  }

  componentWillUnmount() {
    runInAction(() => {
      this.props.newClaimStore.newClaim.documents = this.props.newClaimStore.attachedFiles;
    });
  }

  renderButton() {
    return <><Button variant="contained" onClick={this.handleClickOpen}>Click To Attach Documents</Button>
      <Dialog
        fullScreen={false}
        open={this.state.open}
        onClose={this.handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle
          id="responsive-dialog-title">{'Please attach the documents relevant to the claim being submitted.'}</DialogTitle>
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

      <h1>
        Please attach the documents relevant to the claim being submitted.
      </h1>
      <Divider light />
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

      <input id="contained-button-file" style={input} multiple type="file" />
      <br />
      <br />
      <label htmlFor="contained-button-file">
        {this.renderButton()}
      </label>
      <br />
      <br />
    </>
  }

  render() {
    return <>
      {this.renderUploadButton()}
    </>
  }
}

export default Documents;
