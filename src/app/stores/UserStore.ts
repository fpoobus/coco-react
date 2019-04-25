import {action, observable} from 'mobx';
import axios from 'axios';
import User from "app/models/User";
import * as moment from 'moment';

class UserStore {

    constructor() {
        let user = new User();
        if (localStorage.getItem("firstName")) {
            user.firstName = localStorage.getItem("firstName");
            user.lastName = localStorage.getItem("lastName");
            user.personalCode = localStorage.getItem("personalCode");
            console.log(user);
        }
        this.setUser(user)
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

    @observable
    public loginError: boolean;

    @action
    public setUser(user: User) {
        this.user = user;
        this.personalCode = user.personalCode;
    }

    @action
    public setVerificationCode(code: number) {
        this.verificationCode = code;
    }

    @action
    public setSessionId(sessionid: string) {
        this.sessionId = sessionid;
    }

    @action
    public setLoginError(loginError: boolean) {
        this.loginError = loginError;
    }

    public doLogIn = (params: { identityCode: string, password: string }) => {
        axios.post(`http://139.59.148.64/coco-api/login`, {
            identityCode: params.identityCode,
            password: params.password
        }, {
            headers: {
                'Access-Control-Allow-Origin': '*'
            }
        })
            .then(res => {
                if (res.status == 200) {
                    this.fillUserInfoLogin(res.data);
                    window.location.href = "/"
                }
            }).catch(() => {
                this.setLoginError(true);
        })
    };

    public doSmartIdLogIn = async (identityCode: string) => {
        await axios.post(`http://139.59.148.64/coco-api/smartid`, {identityCode: identityCode}, {
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
        axios.post(`http://139.59.148.64/coco-api/poll`, {sessionId: sessionId}, {
            headers: {
                'Access-Control-Allow-Origin': '*'
            }
        })
            .then(res => {
                if (res.data) {
                    this.fillUserInfoSmartId(res.data);
                    window.location.href = "/";
                }
            })
    };

    public fillUserInfoLogin = (data: any) => {
        let user = new User();
        user.personalCode = data.personId;
        user.firstName = data.firstName;
        user.lastName = data.lastName;
        this.user = user;
        localStorage.setItem('personalCode', user.personalCode);
        localStorage.setItem('firstName', user.firstName);
        localStorage.setItem('lastName', user.lastName);
    };

    public fillUserInfoSmartId = (data: any) => {
        let user = new User();
        user.personalCode = data.identityCode;
        user.firstName = data.givenName;
        user.lastName = data.surName;
        this.user = user;
        localStorage.setItem('personalCode', user.personalCode);
        localStorage.setItem('firstName', user.firstName);
        localStorage.setItem('lastName', user.lastName);
    };

    public get currentTime() {
        return moment().format('LLLL');
    }

    @action
    public doLogout = () => {
        this.user = undefined;
        this.personalCode = "";
        this.isAuthenticated = false;
        this.verificationCode = 0;
        this.sessionId = "";
        this.loginError = false;
    }
}

export default UserStore;
