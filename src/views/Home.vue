<template>
  <Header/>
  <div class="flex gap-4 px-4">
    <MeetingTable v-for="(room_type,i) in tables" :key="i" :room_type="room_type"/>
  </div>
  <Footer/>
</template>

<script setup lang="ts">
import Header from "@/components/Header.vue";
import MeetingTable from "@/components/MeetingTable.vue";
import Footer from "@/components/Footer.vue";

import { onMounted, onUnmounted } from "vue";
import NEXT from "@/utilities/next.ts";
import useStore from "@/composables/useStore.ts";
import useMeetingAPI from "@/composables/useMeetingAPI.ts";

const tables = ["room_seven", "room_one", "room_two", "room_three", "room_four", "room_five", "room_six"];

const { date, settings } = useStore();
const { SEARCH_CONTENTS } = useMeetingAPI();
const updateTime = Number(NEXT(settings.value)?.update_time) || 5; // in minutes

const update = async (): Promise<void> => {
  await SEARCH_CONTENTS({ date: date.value.toISOString().substring(0, 10) });
};

let intervalId: ReturnType<typeof setInterval>;

onMounted(() => {
  update(); // Run update immediately if needed
  intervalId = setInterval(update, updateTime * 60 * 1000); // Convert minutes to milliseconds
});

onUnmounted(() => {
  clearInterval(intervalId);
});
</script>