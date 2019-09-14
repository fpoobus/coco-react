import { action, computed, observable } from 'mobx';
import { Hearing } from 'app/model/Hearing';
import * as moment from 'moment';
import cocoAxios from "app/axiosConfig";

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
    const response = await cocoAxios.get(`/coco-api/hearings/byPerson/${personId}`,
      { headers: { 'Access-Control-Allow-Origin': '*' } });
    return response.data;
  }

  private static getDateFromHearing(hearing: Hearing): Date {
    const mDate = moment(hearing.startTime);
    return new Date(mDate.format('LLLL'));
  }
}

export default HearingsDataStore;
