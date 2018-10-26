import * as React from 'react';
import { inject, observer } from 'mobx-react';
import NewClaimStore from 'app/stores/NewClaimStore';
import TextField from '@material-ui/core/TextField';
import { runInAction } from 'mobx';

export interface ClaimInformationProps {
  newClaimStore: NewClaimStore
}

export interface ClaimInformationState {
  /* empty */
}


@inject('routerStore', 'newClaimStore')
@observer
export class ClaimInformation extends React.Component<ClaimInformationProps, ClaimInformationState> {

  renderClaimInfo() {
    let claim = this.props.newClaimStore.newClaim.claim;
    return <>

      <TextField
        label="Case Type"
        value={claim.case_type}
        onChange={this.handleChange('case_type')}
        margin="normal"
      />

      <TextField
        label="Description"
        value={claim.description}
        onChange={this.handleChange('description')}
        margin="normal"
        multiline
      />


      State fee: 10

    </>;
  }

  handleChange = name => event => {
    runInAction(() => {
      this.props.newClaimStore.newClaim.claim[name] = event.target.value;

    });
  };

  render() {
    return this.renderClaimInfo();
  }
}

export default ClaimInformation;
