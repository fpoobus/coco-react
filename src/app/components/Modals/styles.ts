import { Theme } from '@material-ui/core';
import createStyles from '@material-ui/core/styles/createStyles';

export const modalStyles = (theme: Theme) => createStyles({
    paper: {
        position: 'absolute',
        width: theme.spacing(50),
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing(4),
    },
});
