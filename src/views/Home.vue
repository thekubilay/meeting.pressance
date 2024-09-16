<template>
  <Header/>
  <div class="flex gap-4 px-4">
    <MeetingTable v-for="(room_type,i) in tables" :key="i" :room_type="room_type"/>
  </div>
  <Footer />
</template>
<script setup lang="ts">

import Header from "@/components/Header.vue";
import MeetingTable from "@/components/MeetingTable.vue";
import Footer from "@/components/Footer.vue";


const tables = ["room_seven", "room_one", "room_two", "room_three", "room_four", "room_five", "room_six"];
</script>