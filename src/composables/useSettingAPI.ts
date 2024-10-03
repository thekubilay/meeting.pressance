import {AxiosResponse} from "axios";
import {API} from "@/config.ts";

import useStore from "./useStore.ts";
import SettingAPIClient from "../server/SettingAPI.ts";

const useSettingAPI = () => {
  const {settings} = useStore()
  const client: SettingAPIClient = new SettingAPIClient(API);

  const UPDATE = async (payload: object): Promise<void> => {
    const response: AxiosResponse = await client.update(payload);
    return;
  }


  return {
    UPDATE,
  }
}

export default useSettingAPI;