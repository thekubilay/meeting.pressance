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
      <input v-model="form.content" type="text"
             class="w-[calc(100%-117px)] block ml-4 border border-gray-600 h-[32px] px-2">
    </div>
    <div class="flex items-center mb-3">
      <p class="w-[100px] h-[32px] bg-app-light-blue text-sm text-white flex items-center justify-center">担当者</p>
      <input v-model="form.in_charge" type="text" class="w-[100px] block ml-4 border border-gray-600 h-[32px] px-2">
    </div>

    <div class="flex gap-6 w-[85%] mx-auto">
      <Button class="bg-red-500 text-white w-1/2 py-2 mt-4" @click="del">使用予定登録</Button>
      <Button class="bg-app-dark-blue text-white w-1/2 py-2 mt-4" @click="submit">予定を削除</Button>
    </div>
  </div>
</template>
<script setup lang="ts">
import Button from "@/components/Button.vue";

import useStore from "@/composables/useStore.ts";
import {computed, onBeforeMount, onMounted, PropType, reactive, ref, watch} from "vue";
import useMeetingAPI from "@/composables/useMeetingAPI.ts";
import NEXT from "@/utilities/next.ts";
import {all} from "axios";
import useMeetingForm from "@/composables/useMeetingForm.ts";

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


onBeforeMount(() => {
  allTime.value = times.value.map(item => item.time.substring(0, 5))
  allTime.value.push('18:30')
})

const {date, times} = useStore()
const {SEARCH_CONTENTS, INSERT_MEETING, UPDATE_MEETING} = useMeetingAPI()
const {rooms, form, format, start_times, finish_times} = useMeetingForm(String(props.time))
const allTime = ref<string[]>([])
const isoDate = computed(() => date.value.toISOString().substring(0, 10))

const del = (): void => {
  dialog.value = false;
}

const submit = async (): Promise<void> => {
  await INSERT_MEETING(form)
  await SEARCH_CONTENTS({date: isoDate.value})
  dialog.value = false;
};

// watch for changes in start_time and finish_time and update time_table
watch([() => form.start_time, () => form.finish_time], ([newStartTime, newFinishTime]) => {
  form.time_table = [];

  if (!newStartTime || !newFinishTime) return;

  const stIdx = allTime.value.findIndex(item => item === newStartTime);
  const ftIdx = allTime.value.findIndex(item => item === newFinishTime);

  if (stIdx >= 0 && ftIdx >= 0) {
    form.time_table = allTime.value.slice(stIdx, ftIdx + 1).map(item => item) as [];
  }
});


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