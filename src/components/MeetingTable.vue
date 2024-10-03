<template>
  <div class="w-[15%] min-w-[300px] sp:min-w-[224px] pb-10">
    <table class="table-auto w-full border-2 border-app-blue mb-10">
      <caption class="text-center mb-7">
        <p class="text-app-blue text-2xl font-medium mb-1">{{ datatable[room_type] }}</p>
        <p class="text-red-500 text-lg h-[40px]">{{ room_type === "room_seven" ? '社長来客以外使用不可' : '' }}</p>
      </caption>
      <thead>
      <tr>
        <th class="w-[20%] min-w-[20%] px-1 text-app-blue border-r-2 border-b-2 py-2 border-app-blue font-semibold text-sm sp:text-xs">時間</th>
        <th class="w-[14%] min-w-[12%] px-1 text-app-blue border-r-2 border-b-2 py-2 border-app-blue font-semibold text-sm sp:text-xs">人数</th>
        <th class="w-[50%] min-w-[50%] px-2 text-app-blue border-r-2 border-b-2 py-2 border-app-blue font-semibold text-sm sp:text-xs">物件(内容)/来客</th>
        <th class="w-[18%] min-w-[18%] px-2 text-app-blue border-b-2 py-2 border-app-blue font-semibold text-sm sp:text-xs">担当</th>
      </tr>
      </thead>
      <tbody class="text-xs">
      <tr v-for="(item, idx) in times" :key="idx">
        <td class="min-h-[40px] px-0.5 py-0.5 border-r-2 border-b-2 border-app-blue">
          <Button class="bg-app-dark-blue w-full py-1 sp:text-xs" @click="open('meeting', item.time)">{{ item.time.substring(0, 5) }}</Button>
        </td>
        <td class="min-h-[40px] border-r-2 border-b-2 border-app-blue text-center">
          {{ planContentMap[item.time.substring(0, 5)]?.people || '' }}
        </td>
        <td class="min-h-[40px] border-r-2 px-1 border-b-2 border-app-blue text-left leading-3">
          <p class="break-words">{{ planContentMap[item.time.substring(0, 5)]?.content || '' }}</p>
        </td>
        <td class="min-h-[40px] border-b-2 border-app-blue text-center leading-3">
          <p>{{ planContentMap[item.time.substring(0, 5)]?.in_charge || '' }}</p>
        </td>
      </tr>
      </tbody>
    </table>

    <Button class="bg-app-dark-blue w-[80px] py-1 mb-4" @click="open('memo')">備考</Button>
    <p class="text-xs pl-2">{{ memo }}</p>

    <Dialog v-model="isDialogVisible">
      <MeetingForm v-if="dialogType==='meeting'" v-model:dialog="isDialogVisible" :data="getMeetingData()" :room_type="room_type" :meeting-id="meetingId" :content-id="contentId" :time="jikan"/>
      <MemoForm v-else v-model="tableMemoTextRef" v-model:dialog="isDialogVisible" :id="tableMemoIdRef" :room_type="room_type"/>
    </Dialog>
  </div>
</template>
<script setup lang="ts">
import Button from "@/components/Button.vue";
import Dialog from "@/components/Dialog.vue";
import MemoForm from "@/components/MemoForm.vue";
import MeetingForm from "@/components/MeetingForm.vue";

import {computed, ref} from "vue";
import {MeetingContent, PlanContent} from "@/types/MeetingContent.ts";

import NEXT from "@/utilities/next.ts";
import useStore from "@/composables/useStore.ts";
import useMeetingTableHelpers from "@/composables/useMeetingTableHelpers.ts";


const props = defineProps<{
  room_type: string;
}>();

const {settings, times, memos, contents, date} = useStore();
const {groupBy} = useMeetingTableHelpers();
const meetingId = ref('');
const contentId = ref('');
const dialogType = ref('');
const jikan = ref('');
const isDialogVisible = ref(false);
const tableMemoIdRef = ref('');
const tableMemoTextRef = ref('');
const datatable = computed<any>(() => {
  return NEXT(settings.value);
});

const data = computed(() => {
  const grouped = groupBy(contents.value);
  return grouped[props.room_type] || [];
});

const memo = computed(() => {
  const d = memos.value.find(item => item.room_type === props.room_type);
  return d?.memo || '';
});

// extract all plan_contents for the current room_type
const planContentsForRoom = computed(() => {
  const roomType = props.room_type;
  const planContents: PlanContent[] = [];

  data.value.forEach((mainItem) => {
    mainItem.plan_contents.forEach((pc) => {
      if (pc.room_type === roomType) {
        planContents.push(pc);
      }
    });
  });

  return planContents;
});

// create a map from time to plan_content
const planContentMap = computed(() => {
  const map: { [time: string]: PlanContent } = {};

  planContentsForRoom.value.forEach((pc) => {
    // ensure time is in consistent format (e.g., "HH:mm")
    const timeKey = pc.time.substring(0, 5); // "HH:mm"
    map[timeKey] = pc;
  });

  return map;
});

const getMeetingData = () => {
  return data.value.find(item => item.id === meetingId.value);
};

function getObjectByTime(arr: any, time: string) {
  // Helper function to convert time strings to seconds since midnight
  function timeToSeconds(timeStr: string) {
    const [hours, minutes, seconds] = timeStr.split(":").map(Number);
    return hours * 3600 + minutes * 60 + seconds;
  }

  const targetTime = timeToSeconds(time);

  // Iterate over each object in the array
  for (const obj of arr) {
    const startTime = timeToSeconds(obj.start_time);
    const finishTime = timeToSeconds(obj.finish_time);

    // Check if the given time falls within the start and finish times
    if (targetTime >= startTime && targetTime <= finishTime) {
      return obj; // Return the matching object
    }
  }

  // If no matching object is found, return null
  return null;
}

const open = (type: string, time: string | null = null) => {
  contentId.value = '';
  meetingId.value = '';

  dialogType.value = type;
  isDialogVisible.value = true;

  if (type === 'meeting') {
    jikan.value = time?.substring(0, 5) || '';
    meetingId.value = getObjectByTime(data.value, time as string)?.id || '';
    contentId.value = planContentMap.value[time?.substring(0, 5) || '']?.id || '';
    return;
  }

  tableMemoIdRef.value = memos.value.find(item => item.room_type === props.room_type)?.id || '';
  tableMemoTextRef.value = memo.value;

};

</script>