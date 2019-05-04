import * as React from 'react';
import withStyles, {WithStyles} from '@material-ui/core/styles/withStyles';
import {modalStyles} from "app/components/Modals/styles";
import {observer} from "mobx-react";
import UserStore from "app/stores/UserStore";


interface VerificationModalProps extends WithStyles<typeof modalStyles> {
    verificationCode?: number;
    userStore?: UserStore;
}

@observer
class VerificationModal extends React.Component<VerificationModalProps> {

    render() {
        return (
            <>
                <h1>{this.props.userStore.verificationCode}</h1>
                <h1>{this.props.userStore.sessionId}</h1>
            </>
        );
    }
}

export default withStyles(modalStyles)(VerificationModal);