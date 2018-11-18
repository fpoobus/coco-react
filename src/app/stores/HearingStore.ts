import {action, observable} from 'mobx';
import User from "app/models/User";
import axios from "axios";
import {Hearing} from "app/model/Hearing";
import {PersonResponse} from "app/model/NewClaim";

class HearingStore {

    @observable participants: User[] = [];
    @observable chooseableParticipants: User[] = [];
    @observable hearing: Hearing;
    @observable activeDate;
    @observable activeTime;
    @observable timetableLoading: boolean;
    @observable participantsLoading: boolean;
    @observable hearingJudge: string;
    @observable isParticipantsModalOpen: boolean;

    public participantExists(participant: User) {
        return (this).participants.filter(item => item.personalCode == participant.personalCode).length != 0
    }

    @action
    public toggleParticipant = (participant: User) => {
        if(this.participantExists(participant)){
            let index = this.participants.indexOf(participant);
            this.participants.splice(index, 1);
        }else{
            this.participants.push(participant);
        }
    };
    @action
    public setIsParticipantsModalOpen = (isOpen: boolean) => {
        this.isParticipantsModalOpen = isOpen;
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
    public setHearingEndTime = (endTime: string) => {
        this.hearing.endTime = endTime;
    };
    @action
    public setHearingCaseNumber = (hearingCaseNumber: number) => {
        this.hearing.caseNumber = hearingCaseNumber.toString();
    };
    @action
    public setHearingStartTime = (hearingDate: string) => {
        this.hearing.startTime = hearingDate;
    };
    @action
    public setHearingJudge = (hearingJudge: string) => {
        this.hearingJudge = hearingJudge;
    };
    generateRandomJudge = () => {
        const judgesList = [
            ['Justice Foster Edward Abner', 49],
            ['Justice Roy John Jayce', 69],
            ['Justice Bert Alfred', 85],
            ['Justice Jefferson Archer Jarvis', 88],
            ['Justice Garth Beau', 79],
            ['Justice Wyatt Edwin', 91],
            ['Justice Samson Chauncey Lee', 17]
        ];
        let judgeName = judgesList[Math.floor(Math.random() * judgesList.length)];
        if (judgeName) {
            this.setHearingJudge(judgeName[0].toString());
        }
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
        const response = await axios.get(`http://139.59.148.64/coco-api/persons`,
            {headers: {'Access-Control-Allow-Origin': '*'}});
        return response.data;
    };

    mapPersonsToUsers(persons: Array<PersonResponse>) {
        return persons.map((person) => {
            return {
                firstName: person.firstName,
                lastName: person.lastName,
                personalCode: person.personId
            }
        });
    }

    private createPayload(hearing: Hearing): Object {
        return {
            caseNumber: hearing.caseNumber,
            startTime: hearing.startTime,
            endTime: hearing.endTime,
            judge: hearing.judge,
            participants: this.participants
        };
    }

    public createHearing = async () => {
        await axios.post(`http://139.59.148.64/coco-api/hearings/add`, this.createPayload(this.hearing), {
            headers: {
                'Access-Control-Allow-Origin': '*'
            }
        })
            .then(res => {
                if (res.status === 201) {
                    console.log('HEARING SUCCESS')
                } else {
                    console.log('HEARING FAILED')
                }
            })
    };
}

export default HearingStore;
