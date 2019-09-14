import * as React from 'react';
import { inject, observer } from 'mobx-react';
import NewClaimStore from 'app/stores/NewClaimStore';
import { runInAction } from 'mobx';
import { AxiosResponse } from 'axios';
import DefendantFinderModal from 'app/components/NewClaim/StepDefendant/Defendant/DefendantFinderModal';
import { DefendantResponse } from 'app/model/NewClaim';
import DefendantOverView from 'app/components/NewClaim/StepDefendant/Defendant/DefendantOverView';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider/Divider';
import cocoAxios from 'app/axiosConfig';

export interface DefendantProps {
  newClaimStore: NewClaimStore
}

export interface DefendantState {
  /* empty */
}

@inject('routerStore')
@observer
export class Defendant extends React.Component<DefendantProps, DefendantState> {
  state = {
    modalOpen: false
  };

  componentDidMount() {
    this.props.newClaimStore.setNextButtonDisabled(true);
  }

  componentWillUnmount(): void {
    runInAction(() => {
      this.props.newClaimStore.defendantResponse = undefined;

    });
  }

  getDefendantInto = () => {
    const regCode = this.props.newClaimStore.newClaim.defendant.registryCode;
    cocoAxios.get(`/coco-api/legal-entities/${regCode}`, {
      headers: { 'Access-Control-Allow-Origin': '*' }
    }).then((res: AxiosResponse<DefendantResponse>) => this.props.newClaimStore.setDefendant(res.data))
      .catch(() => {
      });
    this.props.newClaimStore.setNextButtonDisabled(false);
  };

  searchByEntityId = (code: string) => {
    runInAction(() => {
      this.props.newClaimStore.newClaim.defendant.registryCode = code;
      this.setState({ modalOpen: false });
      this.getDefendantInto();
    })
  };

  renderDefendantInput() {

    return (
      <>
        <div>
          <Grid container justify="center">
            {/*<Button variant="contained" onClick={this.getAllLegalEntities}>Click to choose from list</Button>*/}
            <Grid item xs={12}>
              <h1>Defendant information</h1>
              <Divider light />
              <br />
            </Grid>
            <Grid item xs={12}>
              <DefendantOverView
                onModalOpen={() => this.setState({ modalOpen: true })}
                defendant={this.props.newClaimStore.defendantResponse}
              />
            </Grid>
          </Grid>
        </div>
        <br />
        <DefendantFinderModal
          onClose={() => this.setState({ modalOpen: false })}
          onEntityPick={this.searchByEntityId}
          open={this.state.modalOpen}
        />
      </>
    );
  }


  render() {
    return this.renderDefendantInput();
  }
}

export default Defendant;
