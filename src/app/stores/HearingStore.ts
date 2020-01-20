import {action, observable} from 'mobx';
import User from 'app/models/User';
import {Hearing} from 'app/model/Hearing';
import {PersonResponse} from 'app/model/NewClaim';
import {Participant} from 'app/model/Participant';
import cocoAxios from "app/axiosConfig";

class HearingStore {

    @observable participants: User[] = [];
    @observable chooseableParticipants: User[] = [];
    @observable activeDate;
    @observable activeTime;
    @observable judge: string;
    @observable timetableLoading: boolean;
    @observable participantsLoading: boolean;
    @observable isParticipantsModalOpen: boolean;
    @observable isHearingValid: boolean = false;
    @observable isHearingSuccess: boolean = false;

    public participantExists(participant: User) {
        return (this).participants.filter(item => item.personalCode == participant.personalCode).length != 0
    }

    @action
    public toggleParticipant = (participant: User) => {
        if (this.participantExists(participant)) {
            let index = this.participants.indexOf(participant);
            this.participants.splice(index, 1);
        }
        else {
            this.participants.push(participant);
        }
    };
    @action
    public emptyParticipants = () => {
        this.participants = [];
    };
    @action
    public clearJudge = () => {
        this.judge = undefined
    };

    @action
    public setIsHearingFormCompleted = (isHearingFormCompleted: boolean) => {
        this.isHearingSuccess = isHearingFormCompleted;
    };
    @action
    public setJudge = (judge: string) => {
        this.judge = judge;
    };
    @action
    public setIsParticipantsModalOpen = (isOpen: boolean) => {
        this.isParticipantsModalOpen = isOpen;
    };
    @action
    public setIsHearingSuccess = (isHearingSuccess: boolean) => {
        this.isHearingSuccess = isHearingSuccess;
    };
    @action
    public setTimeTableLoading = (isLoading: boolean) => {
        this.timetableLoading = isLoading;
    };
    @action
    public setParticipantsLoading = (isLoading: boolean) => {
        this.participantsLoading = isLoading;
    };
    @action
    public setActiveDate = (activeDate: string) => {
        this.activeDate = activeDate;
    };
    @action
    public setActiveTime = (activeTime: string) => {
        this.activeTime = activeTime;
    };

    @action
    setChooseableParticipants(persons: Array<User>) {
        this.chooseableParticipants = persons;
    }

    async getChooseableParticipants() {
        let allPersons = await this.getPersons();
        return this.mapPersonsToUsers(allPersons);
    }

    async getPersons(): Promise<Array<PersonResponse>> {
        const response = await cocoAxios.get(`/coco-api/persons`,
            {headers: {'Access-Control-Allow-Origin': '*'}});
        return response.data;
    };

    buildStartTimeObject = () => {
        let newDate = new Date(this.activeDate);
        newDate.setHours(15);
        newDate.setMinutes(0);
        newDate.setSeconds(0);
        return newDate.toISOString();
    };
    buildEndTimeObject = () => {
        let newDate = new Date(this.activeDate);
        newDate.setHours(17);
        newDate.setMinutes(0);
        newDate.setSeconds(0);
        return newDate.toISOString();
    };

    isHearingFormCompleted = (hearing: Hearing): boolean => {
        return !!(hearing.judge && hearing.endTime && hearing.startTime && hearing.caseNumber);
    };

    @action
    getErrorMessageByHearingField(): string {
        if (!this.judge) {
            return 'Judge is missing. Please select judge from case view';
        }
        else if (!this.activeDate) {
            return 'Date is missing. Please select date from the calendar';
        }
        else if (!this.activeTime) {
            return 'Please select available time from the timetable';
        }
        else {
            return 'Invalid or missing credentials. Try again';
        }
    }

    mapUserToParticipant = (user: User): Participant => {
        if (user.personalCode) {
            return {
                personId: user.personalCode
            }
        }
    };

    mapPersonsToUsers(persons: PersonResponse[]): User[] {
        return persons.map((person) => {
            const user = new User();
            user.firstName = person.firstName;
            user.lastName = person.lastName;
            user.personalCode = person.personId;
            return user
        });
    }

    public createPayload(): Hearing {
        const participants: Participant[] = this.participants.map(user => this.mapUserToParticipant(user));
        console.log('Court participants count' + participants.length);
        return {
            caseNumber: '134-CIVI-2018',
            endTime: this.buildEndTimeObject(),
            judge: this.judge,
            startTime: this.buildStartTimeObject(),
            participants: participants
        };
    }

    public createHearing = async (hearing: Hearing) => {
        if (Array.isArray(hearing.participants) && hearing.participants.length) {
            //TODO create endpoint for saving hearing paricipants
        }
        await cocoAxios.post(`/coco-api/hearings/add`, hearing, {
            headers: {
                'Access-Control-Allow-Origin': '*'
            }
        })
            .then(res => {
                if (res.status === 201) {
                    console.log('HEARING SUCCESS')
                }
                else {
                    console.log('HEARING FAILED')
                }
            })
    };

    @action
    public async loadCaseHearings(caseNumber: number): Promise<Array<Hearing>> {
        const response = await cocoAxios.get(`/coco-api/hearings/byCase/${caseNumber}`,
            {headers: {'Access-Control-Allow-Origin': '*'}});
        return response.data;
    }

    @action
    public clearData() {
        this.activeDate = undefined;
        this.judge = undefined;
        this.activeTime = undefined;
        this.participants = [];
        this.chooseableParticipants = [];
        this.timetableLoading = false;
        this.participantsLoading = false;
        this.isParticipantsModalOpen = false;
    }
}

export default HearingStore;
