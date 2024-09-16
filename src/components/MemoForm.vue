<template>
  <div class="w-[400px]">
    <p class="text-lg font-medium text-center mb-4">備考入力フォーム</p>
    <textarea v-model="modelValue" class="border border-gray-600 rounded-sm w-full h-[100px] text-sm px-2 py-2"></textarea>
    <Button class="bg-app-dark-blue text-white w-full py-2 mt-4" @click="submit">備考登録</Button>
  </div>
</template>
<script setup lang="ts">
import Button from "@/components/Button.vue";

import useMemoAPI from "@/composables/useMemoAPI.ts";
import useStore from "@/composables/useStore.ts";
import {PropType} from "vue";

const dialog = defineModel("dialog", {type: Boolean, required: true});
const modelValue = defineModel("modelValue", {type: String, required: true});
const props = defineProps({
  modelValue: {
    type: String as PropType<string>,
    required: true
  },
  id: {
    type: String as PropType<string>,
  },
  room_type: {
    type: String,
    required: true
  }
});

const {date} = useStore()
const {UPSERT} = useMemoAPI()

const submit = async (): Promise<void> => {
  const payload: any = {
    created_at: date.value.toISOString().substring(0, 10),
    room_type: props.room_type,
    memo: modelValue.value
  }

  if (props.id) {
    payload.id = props.id
  }
  await UPSERT(payload);
  dialog.value = false;
};
</script>