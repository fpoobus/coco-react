import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import List from '@material-ui/core/List';
import DialogActions from '@material-ui/core/DialogActions';
import * as React from 'react';
import { ReactElement } from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

type Props = {
  onClose: () => void;
  onEntityPick: (regNumber: string) => void;
  legalEntities: { name: string, regNumber: string }[];
  open: boolean;
}

const DefendantFinderModal = (props: Props): ReactElement<any> => {

  const renderLegalEntities = (): ReactElement<any> => {
    return (
      <>
        {props.legalEntities.map((legalEntity) =>
          <ListItem button>
            <ListItemText onClick={() => props.onEntityPick(legalEntity.regNumber)}
                          primary={legalEntity.regNumber + ' - ' + legalEntity.name} />
          </ListItem>
        )}
      </>
    )
  };

  return (
    <>
      <Dialog
        fullScreen={false}
        open={props.open}
        onClose={props.onClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">{'Choose from the options below'}</DialogTitle>
        <DialogContent>
          <DialogContentText>

          </DialogContentText>
          <List component="nav">
            {renderLegalEntities()}
          </List>
        </DialogContent>
        <DialogActions>
          <Button onClick={props.onClose} color="primary" autoFocus> Close </Button>
        </DialogActions>
      </Dialog></>
  )
};

export default DefendantFinderModal;
