import {action, observable} from 'mobx';
import User, {RawUser} from "app/models/User";
import * as moment from 'moment';
import cocoAxios from "app/axiosConfig";

class UserStore {

    constructor() {
        let user = new User();
        if (localStorage.getItem("firstName")) {
            user.firstName = localStorage.getItem("firstName");
            user.lastName = localStorage.getItem("lastName");
            user.personalCode = localStorage.getItem("personalCode");
            user.role = localStorage.getItem("role");
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
        this.loginWithUser(user);
    }

    @action
    public setUseFromRaw(rawUser: RawUser) {
        this.user = new User().userFromRaw(rawUser);
        this.personalCode = rawUser.code;
        this.loginWithUser(this.user);
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
        cocoAxios.post(`/coco-api/login`, {
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
        await cocoAxios.post(`/coco-api/smartid`, {identityCode: identityCode}, {
            headers: {
                'Access-Control-Allow-Origin': '*'
            }
        })
            .then(res => {
                this.setVerificationCode(res.data.verificationCode);
                this.setSessionId(res.data.sessionId);
            })
    };

    public pollSmartId = (sessionId: string) => {
        cocoAxios.post(`/coco-api/poll`, {sessionId: sessionId}, {
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
        localStorage.setItem('role', user.role)
    };

    public loginWithUser(user: User) {
        this.user = user;
        localStorage.setItem('personalCode', user.personalCode);
        localStorage.setItem('firstName', user.firstName);
        localStorage.setItem('lastName', user.lastName);
        localStorage.setItem('role', user.role)
    }

    public fillUserInfoSmartId = (data: any) => {
        let user = new User();
        user.personalCode = data.identityCode;
        user.firstName = data.givenName;
        user.lastName = data.surName;
        this.user = user;
        localStorage.setItem('personalCode', user.personalCode);
        localStorage.setItem('firstName', user.firstName);
        localStorage.setItem('lastName', user.lastName);
        localStorage.setItem('role', user.role);
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
