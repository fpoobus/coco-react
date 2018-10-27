import { observable } from 'mobx';
import axios from 'axios';

class HearingStore {

    @observable personalCode: string;
    @observable isAuthenticated: boolean;

    public doLogIn = async (params: {personalCode: string, password: string}) => {
        axios.post(`https://jsonplaceholder.typicode.com/users`, { params })
            .then(res => {
                console.log(res);
                console.log(res.data);
            })
    }

}

export default HearingStore;
