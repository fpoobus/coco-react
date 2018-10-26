import * as React from 'react';

import Card from 'react-bulma-components/lib/components/card';


interface ClaimsSubmitterProps {

}

class ClaimsSubmitter extends React.Component<ClaimsSubmitterProps> {
  render() {
    return (
      <Card>
        <Card.Header>
          <Card.Header.Title>My Claims</Card.Header.Title>
        </Card.Header>
      </Card>
    );
  }
}

export default ClaimsSubmitter;
