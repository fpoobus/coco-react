import * as React from 'react';
import { ReactElement } from 'react';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import { DefendantResponse } from 'app/model/NewClaim';

type Props = {
  defendant?: DefendantResponse
}

const DefendantOverView = (props: Props): ReactElement<any> => {

  const renderDefendant = (): ReactElement<any> => (
    <>
      <br /><br />
      <Typography component="h2" variant="h6" gutterBottom> Found the following legal entity: </Typography>
      <Divider light />
      <p><strong>Name: </strong>{props.defendant.name}</p>
      <p><strong>Registry Code: </strong>{props.defendant.registryCode}</p>
      <p><strong>Activities: </strong>{props.defendant.activities.join(', ')}
      </p>
    </>
  );

  return props.defendant && renderDefendant();
};

export default DefendantOverView
