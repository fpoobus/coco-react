import { Theme } from '@material-ui/core';
import createStyles from '@material-ui/core/styles/createStyles';

export const loginStyles = (theme: Theme) => createStyles({
    root: {},
    layout: {
        width: 'auto',
        display: 'block', // Fix IE 11 issue.
        marginLeft: theme.spacing(3),
        marginRight: theme.spacing(3),
        [theme.breakpoints.up(400 + theme.spacing(6))]: {
            width: 400,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
    typo: {
        textAlign: 'center',
        display: 'contents',
        justifyContent: 'center',
        alignContent: 'center'
    },
    paper: {
        marginTop: theme.spacing(4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: `${theme.spacing(2)}px ${theme.spacing(3)}px ${theme.spacing(3)}px`,
    },
    paperNavigation: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: 'auto',
        backgroundColor: theme.palette.secondary.main,
        marginBottom: '30px',
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        marginTop: theme.spacing(3),
        '&:hover': {
            backgroundColor: '#e8d081',
        }
    },
    verificationText: {
        marginTop: '45px',
        textAlign: 'center',
    },
});
