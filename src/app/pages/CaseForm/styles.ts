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
        }
    }
);
