import {action, observable} from 'mobx';
import User from "app/models/User";
import axios from "axios";
import {Hearing} from "app/model/Hearing";

class HearingStore {

    @observable participants: User[];
    @observable hearing: Hearing;
    @observable activeDate;
    @observable activeTime;
    @observable timetableLoading: boolean;
    @observable participantsLoading: boolean;
    @observable hearingJudge: string;
    @observable isParticipantsModalOpen: boolean;

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


    private createPayload(hearing: Hearing): Object {
        return {caseNumber: hearing.caseNumber, startTime: hearing.startTime, endTime: hearing.endTime, judge: hearing.judge, participants: this.participants};
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
