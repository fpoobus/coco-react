import {observable} from 'mobx';
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
            user.password = localStorage.getItem("password");
        }
    }

    @observable
    public user: User;

    @observable
    public personalCode: string;

    @observable
    public isAuthenticated: boolean;

    public doLogIn = (params: { personalCode: string, password: string }) => {
        axios.post(`https://jsonplaceholder.typicode.com/users`, {params})
            .then(res => {
                console.log(res);
                console.log(res.data);
            })
    };

    public doSmartIdLogIn = (identityCode: string) => {
        console.log('%%%%%%%%%%%%%%%%%%%%%%%%5');
        axios.post(`http://localhost:9701/coco-api/smartid`, {identityCode: identityCode}, {
            headers: {
                'Access-Control-Allow-Origin': '*'
            }
        })
            .then(res => {
                console.log(res);
                console.log(res.data);
            })
    }

  public get currentTime() {
    return moment().format('LLLL');
  }
}

export default UserStore;
