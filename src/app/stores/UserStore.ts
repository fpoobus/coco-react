import { observable } from 'mobx';
import axios from 'axios';
import * as moment from 'moment';

class UserStore {

  @observable user: User;
  @observable personalCode: string;
  @observable isAuthenticated: boolean;

  public doLogIn = async (params: { personalCode: string, password: string }) => {
    axios.post(`https://jsonplaceholder.typicode.com/users`, { params })
      .then(res => {
        console.log(res);
        console.log(res.data);
      });
  };

  public get currentTime() {
    return moment().format('LLLL');
  }
}

export default UserStore;
