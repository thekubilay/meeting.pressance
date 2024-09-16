import {AxiosResponse} from "axios";
import {API} from "@/config.ts";

import useStore from "./useStore.ts";
import MeetingAPIClient from "../server/MeetingAPI.ts";

const useMeetingAPI = () => {
  const {times, contents}: any = useStore()
  const client: MeetingAPIClient = new MeetingAPIClient(API);

  const SEARCH_TIMES = async (fd: FormData): Promise<void> => {
    const response: AxiosResponse = await client.search_times();

    if (response.status === 200) {
      times.value = response.data
      return;
    }

    return;
  }

  const SEARCH_CONTENTS = async (fd: Object): Promise<void> => {
    const response: AxiosResponse = await client.search_contents(fd);

    if (response.status === 200) {
      contents.value = response.data
      return;
    }

    return;
  }

  return {
    SEARCH_TIMES,
    SEARCH_CONTENTS
  }
}

export default useMeetingAPI;