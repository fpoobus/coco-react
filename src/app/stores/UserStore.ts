import {action, observable} from 'mobx';
import axios from 'axios';
import User from "app/models/User";
import * as moment from 'moment';

class UserStore {

    constructor() {
        let user = new User();
        this.user = user;
        if (localStorage.getItem("firstName")) {
            user.firstName = localStorage.getItem("firstName");
            user.lastName = localStorage.getItem("lastName");
            user.personalCode = localStorage.getItem("personalCode");
            user.password = localStorage.getItem("password");
        }
    }

    @observable
    public user: User;

    @observable
    public personalCode: string;

    @observable
    public isAuthenticated: boolean;

    @observable
    public verificationCode: number;

    @observable
    public sessionId: string;

    @action
    public setVerificationCode(code: number) {
        this.verificationCode = code;
    }

    @action
    public setSessionId(sessionid: string) {
        this.sessionId = sessionid;
    }

    public doLogIn = (params: { identityCode: string, password: string }) => {
        axios.post(`http://localhost:9701/coco-api/login`, {identityCode: params.identityCode, password: params.password}, {
            headers: {
                'Access-Control-Allow-Origin': '*'
            }
        })
            .then(res => {
                if(res.status == 200){
                    window.location.href = "/dashboard"
                }
            })
    };

    public doSmartIdLogIn = async (identityCode: string) => {
        await axios.post(`http://localhost:9701/coco-api/smartid`, {identityCode: identityCode}, {
            headers: {
                'Access-Control-Allow-Origin': '*'
            }
        })
            .then(res => {
                console.log('AAAAAA');
                this.setVerificationCode(res.data.verificationCode);
                this.setSessionId(res.data.sessionId);
            })
    };

    public pollSmartId = (sessionId: string) => {
        axios.post(`http://localhost:9701/coco-api/poll`, {sessionId: sessionId}, {
            headers: {
                'Access-Control-Allow-Origin': '*'
            }
        })
            .then(res => {
                console.log(res.data);
            })
    };

    public get currentTime() {
        return moment().format('LLLL');
    }
}

export default UserStore;
