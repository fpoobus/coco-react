import { Theme } from '@material-ui/core';
import createStyles from '@material-ui/core/styles/createStyles';

export const loginStyles = (theme: Theme) => createStyles({
    root: {},
    layout: {
        width: 'auto',
        display: 'block', // Fix IE 11 issue.
        marginLeft: theme.spacing.unit * 3,
        marginRight: theme.spacing.unit * 3,
        [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
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
        marginTop: theme.spacing.unit * 4,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
    },
    paperNavigation: {
        marginTop: theme.spacing.unit * 8,
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
        marginTop: theme.spacing.unit,
    },
    submit: {
        marginTop: theme.spacing.unit * 3,
        '&:hover': {
            backgroundColor: '#e8d081',
        }
    },
    verificationText: {
        marginTop: '45px',
        textAlign: 'center',
    },
});
