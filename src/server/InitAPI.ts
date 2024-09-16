import {API} from "@/config.ts";
import {AxiosResponse} from "axios";

import SettingAPIClient from "@/server/SettingAPI.ts";
import MeetingAPIClient from "@/server/MeetingAPI.ts";
import useStore from "@/composables/useStore.ts";

class InitApiClient {
  private settingAPIClient: SettingAPIClient;
  private meetingAPIClient: MeetingAPIClient;

  constructor() {
    this.settingAPIClient = new SettingAPIClient(API);
    this.meetingAPIClient = new MeetingAPIClient(API);
  }

  async init(): Promise<void> {

  }

  async store(): Promise<void> {
    let response: AxiosResponse;
    const {settings, times, contents}: any = useStore()


    response = await this.settingAPIClient.search();

    if (response.status === 200) {
      settings.value = response.data;
    }

    response = await this.meetingAPIClient.search_times();

    if (response.status === 200) {
      times.value = response.data.splice(0,19);
    }

    response = await this.meetingAPIClient.search_contents({date: new Date().toISOString().substring(0, 10)});

    if (response.status === 200) {
      contents.value = response.data;
    }


  }

}

export default InitApiClient;
