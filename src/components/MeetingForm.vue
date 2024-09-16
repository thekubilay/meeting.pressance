<template>
  <div class="w-[400px]">
    <p class="text-lg font-medium text-center mb-4">使用予定入力フォーム</p>
    <div class="flex items-center mb-3">
      <p class="w-[100px] h-[32px] bg-app-light-blue text-sm text-white flex items-center justify-center">使用年月日</p>
      <p class="ml-4">{{ format }}</p>
    </div>
    <div class="flex items-center mb-3">
      <p class="w-[100px] h-[32px] bg-app-light-blue text-sm text-white flex items-center justify-center">会議室</p>
      <select v-model="form.room_type" class="w-1/2 ml-4 border border-gray-600 rounded-sm h-[32px]">
        <option v-for="room in rooms" :value="room.value">{{ room.label }}</option>
      </select>
    </div>
    <div class="flex items-center mb-3">
      <p class="w-[100px] h-[32px] bg-app-light-blue text-sm text-white flex items-center justify-center">時間</p>
      <select v-model="form.start_time" class="w-[75px] ml-4 border border-gray-600 rounded-sm h-[32px]">
        <option v-for="item in start_times" :value="item">{{ item }}</option>
      </select>
      <p class="mx-2">から</p>
      <select v-model="form.finish_time" class="w-[76px] border border-gray-600 rounded-sm h-[32px]">
        <option v-for="item in finish_times" :value="item">{{ item }}</option>
      </select>
    </div>
    <div class="flex items-center mb-3">
      <p class="w-[100px] h-[32px] bg-app-light-blue text-sm text-white flex items-center justify-center">人数</p>
      <input v-model="form.people" type="text" class="w-[75px] block ml-4 border border-gray-600 h-[32px] px-2">
    </div>
    <div class="flex items-center mb-3">
      <p class="w-[100px] h-[32px] bg-app-light-blue text-sm text-white flex items-center justify-center">物件(内容)</p>
      <input v-model="form.content" type="text" class="w-[calc(100%-117px)] block ml-4 border border-gray-600 h-[32px] px-2">
    </div>
    <div class="flex items-center mb-3">
      <p class="w-[100px] h-[32px] bg-app-light-blue text-sm text-white flex items-center justify-center">担当者</p>
      <input v-model="form.in_charge" type="text" class="w-[100px] block ml-4 border border-gray-600 h-[32px] px-2">
    </div>

    <div class="flex gap-6 w-[85%] mx-auto">
      <Button class="bg-red-500 text-white w-1/2 py-2 mt-4" @click="submit">使用予定登録</Button>
      <Button class="bg-app-dark-blue text-white w-1/2 py-2 mt-4" @click="del">予定を削除</Button>
    </div>
  </div>
</template>
<script setup lang="ts">
import Button from "@/components/Button.vue";

import useStore from "@/composables/useStore.ts";
import {computed, PropType, reactive, ref} from "vue";
import useMeetingAPI from "@/composables/useMeetingAPI.ts";
import NEXT from "@/utilities/next.ts";

const dialog = defineModel("dialog", {type: Boolean, required: true});
const props = defineProps({
  time: {
    type: String as PropType<string>,
    required: false
  },
  room_type: {
    type: String as PropType<string>,
    required: true
  },
})
const {date, times} = useStore()
const {} = useMeetingAPI()
const form = reactive({
  room_type: "room_two",
  start_time: props.time,
  finish_time: "",
  people: "",
  content: "",
  in_charge: "",
})
const rooms = ref([
  {label: "社長室", value: "room_seven"},
  {label: "大会議室", value: "room_one"},
  {label: "応接 1 (6人席)", value: "room_two"},
  {label: "応接 2 (4人席)", value: "room_three"},
  {label: "応接 3 (4人席)", value: "room_four"},
  {label: "応接 4 (8人席)", value: "room_five"},
  {label: "ブース (4人席)", value: "room_six"},
])
const start_times = computed(() => {
  return times.value.map(item => item.time.substring(0, 5))
})

const finish_times = computed(() => {
  const container = times.value.map(item => item.time.substring(0, 5))

  // get index of start_time
  const index = container.indexOf(props.time as string)
  const result = container.splice(index, 19)
  const ft = NEXT(result)

  if (ft) {
    form.finish_time = ft as string
  } else {
    form.finish_time = "18:30"
  }

  console.log(result)
  return result.push("18:30")
})

const format = computed(() => {
  const parts: any = new Intl.DateTimeFormat('ja-JP', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    weekday: 'long'
  }).formatToParts(date.value);

  const year = parts.find((part: any) => part.type === 'year').value;
  const month = parts.find((part: any) => part.type === 'month').value;
  const day = parts.find((part: any) => part.type === 'day').value;
  const weekday = parts.find((part: any) => part.type === 'weekday').value;

  return `${year}年${month}月${day}日 ${weekday}`;
})

const del = (): void => {
  dialog.value = false;
}

const submit = async (): Promise<void> => {
  // const payload: any = {
  //   created_at: date.value.toISOString().substring(0, 10),
  //   room_type: props.room_type,
  //   memo: modelValue.value
  // }
  //
  // if (props.id) {
  //   payload.id = props.id
  // }
  // await UPSERT(payload);
  dialog.value = false;
};


// http://ik1-329-24605.vs.sakura.ne.jp:8004/api/meeting/insert_check.php
const insert_payload = {
  "time_table": ["09:00", "09:30", "10:00", "10:30"],
  "people": "2",
  "content": "asd",
  "in_charge": "asd",
  "created_at": "2024-09-16",
  "room_type": "room_two",
  "content_id": "",
  "start_time": "09:00",
  "finish_time": "11:00"
}

// http://ik1-329-24605.vs.sakura.ne.jp:8004/api/meeting/update.php
const update_payload = {
  "time_table": ["09:00"],
  "id": "18230",
  "finish_time": "09:30",
  "content_id": "70712",
  "people": "2",
  "content": "asd 22",
  "in_charge": "asd",
  "room_type": "room_two",
  "created_at": "2024-09-16",
  "poped": "09:30"
}

// http://ik1-329-24605.vs.sakura.ne.jp:8004/api/meeting/delete.php
const delete_payload = {"id": "18229", "finish_time": "11:30", "created_at": "2024-09-16"}

</script>