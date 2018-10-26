import * as React from 'react';
import Card from '@material-ui/core/Card/Card';
import CardHeader from '@material-ui/core/CardHeader/CardHeader';
import CardContent from '@material-ui/core/CardContent/CardContent';
import Typography from '@material-ui/core/Typography/Typography';


interface ClaimsSubmitterProps {

}

class ClaimsSubmitter extends React.Component<ClaimsSubmitterProps> {
  render() {
    return (
      <>
        <Card>
          <CardHeader>
            <Typography>Claims</Typography>
          </CardHeader>
          <CardContent>

          </CardContent>
        </Card>
      </>
    );
  }
}

export default ClaimsSubmitter;
