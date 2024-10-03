<template>
  <table class="mx-auto">
    <caption>
      <p class="text-xl font-bold py-10">設定ファイルの編集/更新</p>
    </caption>
    <thead>
    <tr class="text-sm border-b">
      <th class="w-[100px] py-2">#num</th>
      <th class="w-[200px] py-2">項目</th>
      <th class="w-[120px] py-2">設定値</th>
      <th class="w-[170px] py-2">備考</th>
    </tr>
    </thead>
    <tbody class="text-sm">
    <tr>
      <td class="py-3">1</td>
      <td class="py-3">自動更新時間 :</td>
      <td class="py-3">
        <input v-model="form.update_time" type="text"
               class="w-[120px] px-2 text-white py-1 box-border border-2 border-t-zinc-800 border-l-zinc-800 border-r-zinc-500 border-b-zinc-500 border-inset bg-app-dark-blue">
      </td>
      <td class="py-3 px-2">1～25（分）で設定</td>
    </tr>
    <tr class="text-sm">
      <td class="py-3">2</td>
      <td class="py-3">線色 :</td>
      <td class="py-3">
        <input v-model="form.line_color" type="text"
               class="w-[120px] px-2 text-white py-1 box-border border-2 border-t-zinc-800 border-l-zinc-800 border-r-zinc-500 border-b-zinc-500 border-inset bg-app-dark-blue">
      </td>
      <td class="py-3 px-2">16進数カラーコード</td>
    </tr>
    <tr class="text-sm">
      <td class="py-3">3</td>
      <td class="py-3">部屋 No.1 名称 :</td>
      <td class="py-3">
        <input v-model="form.room_one" type="text"
               class="w-[120px] px-2 text-white py-1 box-border border-2 border-t-zinc-800 border-l-zinc-800 border-r-zinc-500 border-b-zinc-500 border-inset bg-app-dark-blue">
      </td>
      <td class="py-3 px-2">15文字以内</td>
    </tr>
    <tr class="text-sm">
      <td class="py-3">4</td>
      <td class="py-3">部屋 No.2 名称 :</td>
      <td class="py-3">
        <input v-model="form.room_two" type="text"
               class="w-[120px] px-2 text-white py-1 box-border border-2 border-t-zinc-800 border-l-zinc-800 border-r-zinc-500 border-b-zinc-500 border-inset bg-app-dark-blue">
      </td>
      <td class="py-3 px-2">15文字以内</td>
    </tr>
    <tr class="text-sm">
      <td class="py-3">5</td>
      <td class="py-3">部屋 No.3 名称 :</td>
      <td class="py-3">
        <input v-model="form.room_three" type="text"
               class="w-[120px] px-2 text-white py-1 box-border border-2 border-t-zinc-800 border-l-zinc-800 border-r-zinc-500 border-b-zinc-500 border-inset bg-app-dark-blue">
      </td>
      <td class="py-3 px-2">15文字以内</td>
    </tr>
    <tr class="text-sm">
      <td class="py-3">6</td>
      <td class="py-3">部屋 No.4 名称 :</td>
      <td class="py-3">
        <input v-model="form.room_four" type="text"
               class="w-[120px] px-2 text-white py-1 box-border border-2 border-t-zinc-800 border-l-zinc-800 border-r-zinc-500 border-b-zinc-500 border-inset bg-app-dark-blue">
      </td>
      <td class="py-3 px-2">15文字以内</td>
    </tr>
    <tr class="text-sm">
      <td class="py-3">7</td>
      <td class="py-3">部屋 No.5 名称 :</td>
      <td class="py-3">
        <input v-model="form.room_five" type="text"
               class="w-[120px] px-2 text-white py-1 box-border border-2 border-t-zinc-800 border-l-zinc-800 border-r-zinc-500 border-b-zinc-500 border-inset bg-app-dark-blue">
      </td>
      <td class="py-3 px-2">15文字以内</td>
    </tr>
    <tr class="text-sm">
      <td class="py-3">8</td>
      <td class="py-3">部屋 No.6 名称 :</td>
      <td class="py-3">
        <input v-model="form.room_six" type="text"
               class="w-[120px] px-2 text-white py-1 box-border border-2 border-t-zinc-800 border-l-zinc-800 border-r-zinc-500 border-b-zinc-500 border-inset bg-app-dark-blue">
      </td>
      <td class="py-3 px-2">15文字以内</td>
    </tr>
    <tr class="text-sm">
      <td class="py-3">9</td>
      <td class="py-3">部屋 No.7 名称 :</td>
      <td class="py-3">
        <input v-model="form.room_seven" type="text"
               class="w-[120px] px-2 text-white py-1 box-border border-2 border-t-zinc-800 border-l-zinc-800 border-r-zinc-500 border-b-zinc-500 border-inset bg-app-dark-blue">
      </td>
      <td class="py-3 px-2">15文字以内</td>
    </tr>
    <tr class="text-sm">
      <td class="py-3">10</td>
      <td class="py-3">備考 :</td>
      <td class="py-3 text-center">
        <input v-model="form.memo_visible" type="checkbox" class="w-[30px] h-[30px]">
      </td>
      <td class="py-3 px-2">応接予約表備考欄の表示</td>
    </tr>
    </tbody>
  </table>
  <div class="w-full flex justify-center py-10 gap-24">
    <Button class="py-1.5 w-[150px] text-sm bg-app-dark-blue" @click="back">応接予約表へ戻る</Button>
    <Button class="py-1.5 w-[150px] text-sm bg-app-dark-blue" @click="submit">決定</Button>

  </div>
</template>
<script setup lang="ts">

import {onMounted, reactive} from "vue";
import useStore from "@/composables/useStore.ts";
import NEXT from "@/utilities/next.ts";
import {Setting} from "@/types/Setting.ts";
import Button from "@/components/Button.vue";
import {useRouter} from "vue-router";
import useSettingAPI from "@/composables/useSettingAPI.ts";

onMounted(() => {
  const data = NEXT(settings.value) as Setting
  form.update_time = data.update_time
  form.line_color = data.line_color
  form.room_one = data.room_one
  form.room_two = data.room_two
  form.room_three = data.room_three
  form.room_four = data.room_four
  form.room_five = data.room_five
  form.room_six = data.room_six
  form.room_seven = data.room_seven
  form.memo_visible = data.memo_visible === "1"

})

const {settings} = useStore()
const {UPDATE} = useSettingAPI()
const router = useRouter()
const form = reactive({
  id: '1',
  update_time: "0",
  line_color: '',
  room_one: '',
  room_two: '',
  room_three: '',
  room_four: '',
  room_five: '',
  room_six: '',
  room_seven: '',
  memo_visible: false
})

const back = () => {
  router.push({name: "Home"})
}

const submit = async (): Promise<void> => {
  await UPDATE(form)
}

</script>