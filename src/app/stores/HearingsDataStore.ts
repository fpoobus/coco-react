import { action, computed, observable } from 'mobx';
import axios from 'axios';
import { Hearing } from 'app/model/Hearing';
import * as moment from 'moment';

class HearingsDataStore {
  @observable hearingDates = observable.array<Date>();

  @computed
  get userHearingDates(): Date[] {
    return Array.from(this.hearingDates.values());
  }

  @action
  public async loadHearingDates(): Promise<Array<Date>> {
    const hearings = await this.loadHearings(1);
    this.setHearingDates(hearings);
    return this.hearingDates;
  }

  @action
  public setHearingDates(hearingDates: Array<Hearing>) {
    this.hearingDates.replace(hearingDates.map(hearing => HearingsDataStore.getDateFromHearing(hearing)));
  }

  public async loadHearings(personId: number): Promise<Array<Hearing>> {
    const response = await axios.get(`http://139.59.148.64/coco-api/hearings/byPerson/${personId}`,
      { headers: { 'Access-Control-Allow-Origin': '*' } });
    console.log(response)
    return response.data;
  }

  private static getDateFromHearing(hearing: Hearing): Date {
    const mDate = moment(hearing.dateOfRegistration, 'YYYY-MM-DD');
    return new Date(mDate.format('LLLL'));
  }
}

export default HearingsDataStore;
