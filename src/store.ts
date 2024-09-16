import {defineStore} from "pinia";
import {Memo} from "@/types/Memo.ts";
import {Setting} from "@/types/Setting.ts";
import {Time} from "./types/Time.ts";
import {MeetingContent} from "./types/MeetingContent.ts";

interface Store {
  errors: { [key: string]: string } | null
  date: Date,
  memos: Memo[],
  settings: Setting[],
  times: Time[],
  contents: MeetingContent[]
}

const store = defineStore({
  id: 'main',
  state: (): Store => ({
    errors: null,
    date: new Date(),
    memos: [],
    settings: [],
    times: [],
    contents: []
  }),
})

export default store