<template>
  <header class="flex justify-between items-center px-16 py-14">
    <div class="flex items-center justify-between gap-10 w-1/2">
      <h1 class="w-1/2 text-app-blue font-bold text-3xl">応接予約表</h1>
      <ul class="w-1/2">
        <li class="flex mb-2.5">
          <Button class="min-w-[50px] py-1 text-sm bg-app-blue" @click="open('dengon1')">伝言</Button>
          <span class="px-4">{{ dengons.dengon1 }}</span>
        </li>
        <li class="flex mb-2.5">
          <Button class="min-w-[50px] py-1 text-sm bg-app-blue" @click="open('dengon2')">伝言</Button>
          <span class="px-4">{{ dengons.dengon2 }}</span>
        </li>
        <li class="flex mb-2.5">
          <Button class="min-w-[50px] py-1 text-sm bg-app-blue" @click="open('dengon3')">伝言</Button>
          <span class="px-4">{{ dengons.dengon3 }}</span>
        </li>
        <li class="flex">
          <Button class="min-w-[50px] py-1 text-sm bg-app-blue" @click="open('dengon4')">伝言</Button>
          <span class="px-4">{{ dengons.dengon4 }}</span>
        </li>
      </ul>
    </div>
    <div class="w-1/2 flex justify-end">
      <div class="relative flex flex-col items-center gap-6">
        <div class="flex gap-4">
          <VueDatePicker v-model="setDate" auto-apply :format-locale="ja" :format="format" :enable-time-picker="false" class="w-[322px]"/>
          <Button class="w-[70px] py-1 text-sm bg-app-dark-blue" @click="update">更新</Button>
        </div>
        <div class="flex gap-4">
          <Button class="px-3 py-1 text-sm bg-app-dark-blue" @click="goToPrevWeek">< 先週</Button>
          <Button class="px-3 py-1 text-sm bg-app-dark-blue" @click="goToPrevDay">< 前日</Button>
          <Button class="px-3 py-1 text-sm bg-app-dark-blue" @click="goToToday">本日の予約</Button>
          <Button class="px-3 py-1 text-sm bg-app-dark-blue" @click="goToNextDay">翌日 ></Button>
          <Button class="px-3 py-1 text-sm bg-app-dark-blue" @click="goToNextWeek">来週 ></Button>
        </div>
      </div>
    </div>

    <Dialog v-model="isDialogVisible">
      <MemoForm v-model="dengonText" v-model:dialog="isDialogVisible" :id="dengonId" :room_type="dengonType"/>
    </Dialog>
  </header>
</template>
<script setup lang="ts">
import Button from "./Button.vue";
import Dialog from "@/components/Dialog.vue";
import MemoForm from "@/components/MemoForm.vue";

import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'

import {ja} from 'date-fns/locale';
import {computed, onMounted, reactive, ref, watch} from "vue";

import useMemoAPI from "../composables/useMemoAPI.ts";
import useStore from "../composables/useStore.ts";
import useMeetingAPI from "@/composables/useMeetingAPI.ts";

onMounted(async () => {
  const payload = {
    date: date.value.toISOString().substring(0, 10)
  };
  await SEARCH(payload);
  await getDengon();
})

const {SEARCH} = useMemoAPI()
const {SEARCH_CONTENTS} = useMeetingAPI()
const {date, memos} = useStore()
const isDialogVisible = ref(false);
const dengonType = ref('');
const dengonId = ref('');
const dengonText = ref('');
const dengons = reactive<{ [key: string]: string }>({
  dengon1: '',
  dengon2: '',
  dengon3: '',
  dengon4: ''
});


const setDate = computed({
  get: () => date.value,
  set: (value: Date) => {
    date.value = value;
    update();
  }
});

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


const update = async (): Promise<void> => {
  const payload = {
    date: date.value.toISOString().substring(0, 10)
  };

  await SEARCH(payload);
  await SEARCH_CONTENTS(payload);
  await getDengon();
};

const getDengon = async (): Promise<void> => {
  dengons.dengon1 = '';
  dengons.dengon2 = '';
  dengons.dengon3 = '';
  dengons.dengon4 = '';

  memos.value.forEach(item => {
    Object.keys(dengons).forEach(key => {
      if (item.room_type === key) {
        dengons[key] = item.memo;
      }
    });
  });
};


const open = (type: string) => {
  dengonType.value = type;
  dengonId.value = memos.value.find(item => item.room_type === type)?.id || '';
  dengonText.value = memos.value.find(item => item.room_type === type)?.memo || '';
  isDialogVisible.value = true;
};

// method to go to last week
const goToPrevWeek = async (): Promise<void> => {
  date.value = new Date(date.value.getTime() - 7 * 24 * 60 * 60 * 1000);
  await update();
};

// method to go to previous day
const goToPrevDay = async (): Promise<void> => {
  date.value = new Date(date.value.getTime() - 24 * 60 * 60 * 1000);
  await update();
};

// method to go to today
const goToToday = async (): Promise<void> => {
  date.value = new Date();
  await update();
};

// method to go to next day
const goToNextDay = async (): Promise<void> => {
  date.value = new Date(date.value.getTime() + 24 * 60 * 60 * 1000);
  await update();
};

// method to go to next week
const goToNextWeek = async (): Promise<void> => {
  date.value = new Date(date.value.getTime() + 7 * 24 * 60 * 60 * 1000);
  await update();
};

watch(memos, val => {
  getDengon();
})

</script>
<style>
.dp__input_icons {
  display: none;
}

input.dp__pointer {
  border: none;
  width: 322px;
  text-align: center;
  font-size: 24px;
  color: #00008b;
}
</style>