import * as React from 'react';
import withStyles, {WithStyles} from '@material-ui/core/styles/withStyles';
import {loginStyles} from 'app/containers/Login/styles';
import {inject, observer} from "mobx-react";
import AdminStore from "app/stores/AdminStore";


interface AdminPersonListProps extends WithStyles<typeof loginStyles> {
    adminStore?: AdminStore
}

@inject('adminStore')
@observer
class AdminPersonList extends React.Component<AdminPersonListProps> {


    componentDidMount(): void {
    }


    render() {
        return (
            <React.Fragment>
                PersonList
            </React.Fragment>
        );
    }
}

export default withStyles(loginStyles)(AdminPersonList);
