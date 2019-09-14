import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import List from '@material-ui/core/List';
import DialogActions from '@material-ui/core/DialogActions';
import * as React from 'react';
import { ReactElement, useEffect, useState } from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import makeStyles from '@material-ui/styles/makeStyles/makeStyles';
import { createStyles, Theme } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import Search from '@material-ui/icons/Search';
import cocoAxios from 'app/axiosConfig';

type LegalEntity = { name: string, registryCode: string };

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    searchButtonRoot: {
      marginTop: 10,
      padding: '2px 4px',
      display: 'flex',
      alignItems: 'center',
      width: 400,
    },
    input: {
      marginLeft: theme.spacing(1),
      flex: 1,
    },
    iconButton: {
      padding: 10,
    },
    paperContent: {
      height: '75vh'
    }
  }),
);

type Props = {
  onClose: () => void;
  onEntityPick: (regNumber: string) => void;
  open: boolean;
}

const DefendantFinderModal = (props: Props): ReactElement<any> => {
  const classes = useStyles({});
  const [query, setQuery] = useState<string>('');
  const [legalEntities, setLegalEntities] = useState<LegalEntity[]>([]);

  useEffect(() => {
    getAllLegalEntities()
  }, []);

  const getAllLegalEntities = () => {
    cocoAxios.get(`/coco-api/legal-entities`, {
      headers: {}
    }).then(res => setLegalEntities(res.data));
  };

  const renderLegalEntities = (): ReactElement<any> => {
    return (
      <>
        {legalEntities.filter((legalEntity: LegalEntity) =>
          legalEntity.name.toLowerCase().includes(query) || legalEntity.registryCode.toLowerCase().includes(query)
        ).map((legalEntity, index) =>
          <ListItem key={`legal-entity-${index}`} button onClick={() => props.onEntityPick(legalEntity.registryCode)}>
            <ListItemText primary={legalEntity.registryCode + ' - ' + legalEntity.name} />
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
        <DialogTitle id="responsive-dialog-title">
          Choose from the options below
          <Paper className={classes.searchButtonRoot}>
            <InputBase
              className={classes.input}
              value={query}
              onChange={({ target }) => setQuery(target.value)}
              placeholder="Search by name or id..."
              inputProps={{ 'aria-label': 'search by name or id' }}
            />
            <IconButton disabled className={classes.iconButton} aria-label="search">
              <Search />
            </IconButton>
          </Paper>
        </DialogTitle>
        <DialogContent className={classes.paperContent} dividers>
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
