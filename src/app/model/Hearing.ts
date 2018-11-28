import {Participant} from "app/model/Participant";

export class Hearing {
  caseNumber: string;
  endTime: string;
  judge: string;
  startTime: string;
  participants?: Participant[];
}
