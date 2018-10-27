import {Theme} from '@material-ui/core';
import createStyles from '@material-ui/core/styles/createStyles';

export const caseFormStyles = (theme: Theme) => createStyles({
        root: {},
        paper: {
            padding: theme.spacing.unit * 2,
            textAlign: 'center',
            color: theme.palette.text.secondary,
        },
        chip: {
            margin: theme.spacing.unit,
        },
        button: {
            margin: theme.spacing.unit,
            '&:hover': {
                backgroundColor: '#e8d081',
            },
        },
        rightIcon: {
            marginLeft: theme.spacing.unit,
        },
        title: {
            fontSize: 14,
        },
        pos: {
            marginBottom: 12,
        }
    }
);
