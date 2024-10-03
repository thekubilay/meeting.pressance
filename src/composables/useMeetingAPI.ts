import {AxiosResponse} from "axios";
import {API} from "@/config.ts";

import useStore from "./useStore.ts";
import MeetingAPIClient from "../server/MeetingAPI.ts";

const useMeetingAPI = () => {
  const {times, contents}: any = useStore()
  const client: MeetingAPIClient = new MeetingAPIClient(API);

  const SEARCH_TIMES = async (): Promise<void> => {
    const response: AxiosResponse = await client.search_times();

    if (response.status === 200) {
      times.value = response.data
      return;
    }

    return;
  }

  const SEARCH_CONTENTS = async (fd: object): Promise<void> => {
    const response: AxiosResponse = await client.search_contents(fd);

    if (response.status === 200) {
      const filteredData = response.data.filter((item: any) => item.plan_contents && item.plan_contents.length > 0);

      // console.log(filteredData)
      contents.value = filteredData
      return;
    }

    return;
  }

  const INSERT_MEETING = async (payload: object): Promise<void> => {
    const response: AxiosResponse = await client.insert_meeting(payload);

    if (response.status === 200) {
      return;
    }

    return;
  }

  const UPDATE_MEETING = async (payload: object): Promise<void> => {
    const response: AxiosResponse = await client.update_meeting(payload);

    if (response.status === 200) {
      return;
    }

    return;
  }

  const DELETE_MEETING = async (payload: object): Promise<void> => {
    const response: AxiosResponse = await client.delete_meeting(payload);

    if (response.status === 200) {
      return;
    }

    return;
  }

  return {
    SEARCH_TIMES,
    SEARCH_CONTENTS,
    INSERT_MEETING,
    UPDATE_MEETING,
    DELETE_MEETING,
  }
}

export default useMeetingAPI;