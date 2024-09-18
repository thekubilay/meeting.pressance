import {computed, reactive, ref} from "vue";
import useStore from "./useStore.ts";
import NEXT from "@/utilities/next.ts";

const useMeetingForm = (time: string, start_time: string) => {
  const {date, times} = useStore()

  const rooms = ref([
    {label: "社長室", value: "room_seven"},
    {label: "大会議室", value: "room_one"},
    {label: "応接 1 (6人席)", value: "room_two"},
    {label: "応接 2 (4人席)", value: "room_three"},
    {label: "応接 3 (4人席)", value: "room_four"},
    {label: "応接 4 (8人席)", value: "room_five"},
    {label: "ブース (4人席)", value: "room_six"},
  ])

  const form = reactive<{
    id?: string,
    time_table: any[],
    room_type?: string,
    start_time?: string,
    finish_time: string,
    people: string,
    content: string,
    content_id: string,
    in_charge: string,
    created_at: string,
    poped?:string
  }>({
    time_table: [],
    room_type: "",
    start_time: "",
    finish_time: "",
    people: "",
    content: "",
    content_id: "",
    in_charge: "",
    created_at: date.value.toISOString().substring(0, 10),
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

  const start_times = computed(() => {
    return times.value.map(item => item.time.substring(0, 5))
  })

  const finish_times = computed(() => {
    const container: string[] = times.value.map(item => item.time.substring(0, 5))

    // get index of start_time
    const index: number = container.indexOf(start_time.substring(0,5))
    const result: string[] = container.splice(index + 1, 19)
    const ft: string | null = NEXT(result)

    if (ft) {
      form.finish_time = ft as string
    } else {
      form.finish_time = "18:30"
    }

    result.push('18:30')
    return result
  })


  return {
    rooms, form, format, start_times, finish_times
  }
}

export default useMeetingForm;
