import { Theme } from '@material-ui/core';
import createStyles from '@material-ui/core/styles/createStyles';

export const hearingFormStyles = (theme: Theme) => createStyles({
    hearingHeaderButton: {
        display: 'inline-block',
        float: 'right',
        justifyContent: 'center',
        margin: '0 auto',
        fontSize: '16px',
        marginTop: '25px',
        marginRight: '10px',

    },
    hearingTitle: {
      display: 'inline-block',
        marginLeft: '10px',
        color: '#000000',
        fontWeight: 'lighter',
        fontSize: '36px'
    },
    alertText: {
        color: 'red',
        textDecoration: 'underline'
    },
    alignCenter: {
        textAlign: 'center'
    },
    paper: {
        position: 'absolute',
        width: theme.spacing(50),
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing(4),
    },
});
