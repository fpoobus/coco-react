import {Theme} from '@material-ui/core';
import createStyles from '@material-ui/core/styles/createStyles';

export const caseFormStyles = (theme: Theme) => createStyles({
        root: {},
        paper: {
            padding: theme.spacing(2),
            textAlign: 'center',
            color: theme.palette.text.secondary,
        },
        chip: {
            margin: theme.spacing(1),
        },
        button: {
            margin: theme.spacing(1),
        },
        rightIcon: {
            marginLeft: theme.spacing(1),
        },
        title: {
            fontSize: 14,
        },
        pos: {
            marginBottom: 12,
        },
        alignLeft: {
            textAlign: 'left'
        },
        alignRight: {
            marginLeft: 'auto'
        },
        marginBetween: {
            marginRight: '20px',
            marginLeft: '20px'
        },
        matchParentHeight: {
            height: '100%'
        },
        marginBottom: {
            marginBottom: '20px'
        }
    }
);
