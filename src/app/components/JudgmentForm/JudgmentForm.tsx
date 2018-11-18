import * as React from 'react';
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import { Theme } from '@material-ui/core';
import createStyles from '@material-ui/core/styles/createStyles';
import RootContainer from 'app/components/Container/RootContainer';
import Paper from '@material-ui/core/Paper/Paper';
import Typography from '@material-ui/core/Typography/Typography';
import TextField from '@material-ui/core/TextField/TextField';
import RadioGroup from '@material-ui/core/RadioGroup/RadioGroup';
import FormControl from '@material-ui/core/FormControl/FormControl';
import { inject, observer } from 'mobx-react';
import CaseStore from 'app/stores/CaseStore';
import FormControlLabel from '@material-ui/core/FormControlLabel/FormControlLabel';
import Radio from '@material-ui/core/Radio/Radio';
import Button from '@material-ui/core/Button/Button';
import axios from 'axios';
import InputLabel from '@material-ui/core/InputLabel/InputLabel';
import Select from '@material-ui/core/Select/Select';
import OutlinedInput from '@material-ui/core/OutlinedInput/OutlinedInput';
import { judgmentSanctions, judgmentTypes } from 'app/model/JudgmentForm';
import MenuItem from '@material-ui/core/MenuItem/MenuItem';
import { Link } from 'react-router-dom';
import {runInAction} from "mobx";

const styles = (theme: Theme) => createStyles({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2
  },
  margin: {
    marginTop: 20
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120
  }
});

interface JudgmentFormProps extends WithStyles<typeof styles> {
  caseStore?: CaseStore;
}

@inject('caseStore')
@observer
class JudgmentForm extends React.Component<JudgmentFormProps> {

    componentDidMount() {
        const courtCase = this.props.caseStore.casesData.find(c => {
            return c.id === this.props.caseStore.selectedCaseId;
        });
        if(courtCase.judgmentFormType) {
            this.props.caseStore.setJudgmentFormDescription(courtCase.judgmentDescription);
            this.props.caseStore.setJudgmentFormType(courtCase.judgmentFormType);
            this.props.caseStore.setJudgmentFormSanction(courtCase.sanction);
        }
    }

  renderSanctionsPicker = (): JSX.Element => {
    const { classes, caseStore } = this.props;
    return (
      <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel
          htmlFor="outlined-age-simple"
        >
          Sanctions
        </InputLabel>
        <Select
          value={caseStore.judgmentForm.sanction}
          onChange={event => caseStore.setJudgmentFormSanction(+event.target.value)}
          input={
            <OutlinedInput
              labelWidth={120}
              name="sanction"
              id="outlined-sanction-simple"
            />
          }
        >
          {judgmentSanctions
            .map(sanction => <MenuItem value={sanction.type}>{sanction.label}</MenuItem>)}
        </Select>
      </FormControl>
    );
  };

  renderUploadButton = (): JSX.Element => {
    return (
      <>
        <input id="contained-button-file" multiple type="file" style={{ display: 'none' }} />
        <label htmlFor="contained-button-file">
          <Button variant="contained" component="span">
            Upload
          </Button>
        </label>
      </>
    );
  };

  renderJudgmentType = (): JSX.Element => {
    const { caseStore } = this.props;
    return (
      <FormControl>
        <RadioGroup
          aria-label="Judgement type"
          name="judgement-type"
          value={caseStore.judgmentForm.type}
          onChange={(event, value) => caseStore.setJudgmentFormType(value)}
        >
          {judgmentTypes.map(type => (
            <FormControlLabel value={type.type} key={type.type} control={<Radio />} label={type.label} />
          ))}
        </RadioGroup>
      </FormControl>
    );
  };

  renderJudgmentSummary = (): JSX.Element => {
    return (
      <TextField
        id="outlined-full-width"
        style={{ margin: 8 }}
        placeholder="Write a summary here"
        fullWidth
        margin="normal"
        variant="outlined"
        value={this.props.caseStore.judgmentForm.description}
        onChange={this.updateDescription()}
        multiline
        rows={8}
        InputLabelProps={{
          shrink: true
        }}
      />
    );
  };

  updateDescription = () => event => {
    runInAction(() => {
        this.props.caseStore.judgmentForm.description = event.target.value;
    });
  };

  updateCase = (): void => {
      const data = this.props.caseStore.casesData.find(c => {
          return c.id === this.props.caseStore.selectedCaseId;
      });

      data.status = 'CLOSED';
      data.judgmentFormType = this.props.caseStore.judgmentForm.type;
      data.sanction = this.props.caseStore.judgmentForm.sanction;
      data.judgmentDescription = this.props.caseStore.judgmentForm.description;

      axios.put('http://localhost:9701/coco-api/cases/' + this.props.caseStore.selectedCaseId, data)
          .then(res => {
          })
          .catch(error => {
              console.log(error)
          })
  };

  caseLink = (props, id) => <Link to={'/case?id=' + id} {...props} />;

  render() {
    const { classes, caseStore } = this.props;
    return (
      <RootContainer>
        <Paper className={classes.root}>
          <Typography component="h1" variant="h4" align="center">Judgment Form</Typography>
          <div className={classes.margin}>
            <Typography component="h2" variant="h5">Judgment type</Typography>
            {this.renderJudgmentType()}
          </div>
          <div className={classes.margin}>
            <Typography component="h2" variant="h5">File upload</Typography>
            <Typography variant="body1">Upload files related to the judgment.</Typography>
            <br />
            {this.renderUploadButton()}
          </div>
          <div className={classes.margin}>
            <Typography component="h2" variant="h5">Sanctions</Typography>
            {this.renderSanctionsPicker()}
          </div>
          <div className={classes.margin}>
            <Typography component="h2" variant="h5">Judgment summary</Typography>
            {this.renderJudgmentSummary()}
          </div>
          <Button variant="contained" onClick={this.updateCase} component={props => this.caseLink(props, caseStore.selectedCaseId)} color="primary">
            Submit form
          </Button>
        </Paper>
      </RootContainer>
    );
  }

}

export default withStyles(styles)(JudgmentForm);
