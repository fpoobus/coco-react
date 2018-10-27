import { Theme } from '@material-ui/core';
import createStyles from '@material-ui/core/styles/createStyles';

export const hearingFormStyles = (theme: Theme) => createStyles({
    hearingHeaderButton: {
        display: 'inline-block',
        float: 'right',
        justifyContent: 'center',
        margin: '0 auto',
        backgroundColor: '#2196f3',
        color: 'white',
        padding: '10px 25px 10px 25px',
        fontSize: '16px',
        borderRadius: '10px',
        border: 'none',
        marginTop: '25px',
        marginRight: '10px',
        cursor: 'pointer'
    },
    hearingTitle: {
      display: 'inline-block',
        marginLeft: '10px',
        color: '#2196f3',
        fontWeight: 'lighter',
        fontSize: '36px'
    }
});
