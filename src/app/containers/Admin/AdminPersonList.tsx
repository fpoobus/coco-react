import * as React from 'react';
import withStyles, {WithStyles} from '@material-ui/core/styles/withStyles';
import {loginStyles} from 'app/containers/Login/styles';
import {inject, observer} from "mobx-react";
import AdminStore from "app/stores/AdminStore";
import {runInAction} from "mobx";
import cocoAxios from "app/axiosConfig";


interface AdminPersonListProps extends WithStyles<typeof loginStyles> {
    adminStore?: AdminStore
}

@inject('adminStore')
@observer
class AdminPersonList extends React.Component<AdminPersonListProps> {

    state = {
        entitiesResult: []
    };

    componentDidMount(): void {
        this.getEntities();
    }


    getEntities = () => {

        cocoAxios.get(`/person/api/v1/persons?dateFrom=1900-05-01T19%3A15%3A41.617Z`, {
            headers: {}
        })
            .then(res => {
                runInAction(() => {
                    this.setState({entitiesResult: res.data});
                });
            }).catch(e => {
        });
    };

    renderEntities() {
        let elements = [];
        this.state.entitiesResult.forEach(entity => {
            elements.push(<tr>
                <td>{entity.code}</td>
                <td>{entity.givenName}</td>
                <td>{entity.middleNames}</td>
                <td>{entity.familyName}</td>
                <td>{entity.sex}</td>
                <td>{entity.birthday}</td>
                <td>{entity.addressId}</td>
                <td>{entity.email}</td>
            </tr>);
        });
        return elements;
    }

    render() {
        return (
            <React.Fragment>
                <table>
                    <tr>
                        <th>Code</th>
                        <th>Given name</th>
                        <th>Middle names</th>
                        <th>Family name</th>
                        <th>Gender</th>
                        <th>Date of birth</th>
                        <th>Address Id</th>
                        <th>E-Mail</th>
                    </tr>
                    {this.renderEntities()}
                </table>
            </React.Fragment>
        );
    }
}

export default withStyles(loginStyles)(AdminPersonList);
