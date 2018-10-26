import {Theme} from '@material-ui/core';
import createStyles from '@material-ui/core/styles/createStyles';

export const caseFormStyles = (theme: Theme) => createStyles({
        root: {},
        container: {
            display: 'flex',
            flexWrap: 'wrap',
        },
        textField: {
            marginLeft: theme.spacing.unit,
            marginRight: theme.spacing.unit,
            width: 200,

        },
        paper: {
            padding: theme.spacing.unit * 2,
            textAlign: 'center',
            color: theme.palette.text.secondary,
        },
        chip: {
            margin: theme.spacing.unit,
        },
    }
);
