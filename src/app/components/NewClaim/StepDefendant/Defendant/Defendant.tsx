import * as React from 'react';
import { CSSProperties } from 'react';
import { inject, observer } from 'mobx-react';
import NewClaimStore from 'app/stores/NewClaimStore';
import TextField from '@material-ui/core/TextField';
import { runInAction } from 'mobx';
import axios, { AxiosResponse } from 'axios';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import DefendantFinderModal from 'app/components/NewClaim/StepDefendant/Defendant/DefendantFinderModal';
import { DefendantResponse } from 'app/model/NewClaim';
import DefendantOverView from 'app/components/NewClaim/StepDefendant/Defendant/DefendantOverView';

export interface DefendantProps {
  newClaimStore: NewClaimStore
}

export interface DefendantState {
  /* empty */
}

const textfield = {
  width: 'calc(100% - 70px)'
};

const findbtn: CSSProperties = {
  bottom: '0.6rem',
  position: 'absolute',
  width: '70px',
};

const fieldContainer: CSSProperties = {
  position: 'relative'
};

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
    const regCode = this.props.newClaimStore.newClaim.defendant.registryCode;
    axios.get(`http://139.59.148.64/coco-api/legal-entities/${regCode}`, {
      headers: { 'Access-Control-Allow-Origin': '*' }
    }).then((res: AxiosResponse<DefendantResponse>) => this.props.newClaimStore.setDefendant(res.data))
      .catch(() => {
      });
    this.props.newClaimStore.setNextButtonDisabled(false);
  };

  getAllLegalEntities = () => {
    axios.get(`http://139.59.148.64/coco-api/legal-entities`, {
      headers: {}
    }).then(res => this.setState({ open: true, allLegalEntitiesResult: res.data }))
      .catch(() => {
      });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  searchByEntityId = (code: string) => {
    runInAction(() => {
      this.props.newClaimStore.newClaim.defendant.registryCode = code;
      this.setState({ open: false });
      this.getDefendantInto();
    })
  };

  renderDefendantInput() {

    return <>
      <h1>Choose the defendant by searching or selecting from list</h1>
      <Divider light />
      <div>
        <h3>Select defendant from list:</h3>
        <Divider light />
        <br />
        <Button variant="contained" onClick={this.getAllLegalEntities}>Click to choose from list</Button>
        <DefendantOverView defendant={this.props.newClaimStore.defendantResponse} />
      </div>
      <br />
      <h3>Search defendant by Registry code:</h3>
      <Divider light />
      <div style={fieldContainer}>
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
      <br />
      <DefendantFinderModal
        onClose={this.handleClose}
        onEntityPick={this.searchByEntityId}
        legalEntities={this.state.allLegalEntitiesResult}
        open={this.state.open}
      />
    </>;
  }


  render() {
    return this.renderDefendantInput();
  }
}

export default Defendant;
