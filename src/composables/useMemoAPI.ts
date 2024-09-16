import {AxiosResponse} from "axios";
import {API} from "@/config.ts";

import useStore from "./useStore.ts";
import MemoAPIClient from "../server/MemoAPI.ts";

interface UpsertPayload {
  id?: string,
  room_type: string,
  memo: string,
  created_at: string
}

const useMemoAPI = () => {
  const {memos} = useStore()
  const client: MemoAPIClient = new MemoAPIClient(API);

  const SEARCH = async (payload: Object): Promise<void> => {
    const response: AxiosResponse = await client.search(payload);

    if (response.status === 200) {
      memos.value = response.data
      return;
    }

    return;
  }

  const UPSERT = async (payload: UpsertPayload): Promise<void> => {
    const response: AxiosResponse = await client.upsert(payload);

    const p: object = {date: payload.created_at}
    await SEARCH(p)

    return;
  }


  return {
    SEARCH,
    UPSERT,
  }
}

export default useMemoAPI;