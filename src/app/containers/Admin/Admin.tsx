import * as React from 'react';
import withStyles, {WithStyles} from '@material-ui/core/styles/withStyles';
import {loginStyles} from 'app/containers/Login/styles';


interface AdminProps extends WithStyles<typeof loginStyles> {

}


class Admin extends React.Component<AdminProps> {


    render() {
        return (
            <React.Fragment>
                <a href="/admin/multiform">Form</a>
                <br/>
                <a href="/admin/persons">Persons</a>
            </React.Fragment>
        );
    }
}

export default withStyles(loginStyles)(Admin);
