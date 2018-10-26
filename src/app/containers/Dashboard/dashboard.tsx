import * as React from 'react';
import Section from 'react-bulma-components/lib/components/section';
import Container from 'react-bulma-components/lib/components/container';
import Columns from 'react-bulma-components/lib/components/columns';
import ClaimsSubmitter from 'app/components/ClaimsSubmitter/ClaimsSubmitter';

interface DashboardProps {

}

class Dashboard extends React.Component<DashboardProps> {
  render() {
    return (
      <div>
        <Container>
          <Section>
            <Columns>
              <Columns.Column>
                <ClaimsSubmitter/>
              </Columns.Column>
              <Columns.Column>

              </Columns.Column>
            </Columns>
          </Section>
          <Section>
            <Columns>
              <Columns.Column>

              </Columns.Column>
            </Columns>
          </Section>
        </Container>
      </div>
    );
  }
}

export default Dashboard;
