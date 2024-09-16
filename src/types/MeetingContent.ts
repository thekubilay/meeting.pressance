export interface PlanContent {
  id: string;
  time: string;
  people: string;
  content: string;
  in_charge: string;
  room_type: string;
  created_at: string;
}

export interface MeetingContent {
  id: string;
  start_time: string;
  finish_time: string;
  created_at: string;
  plan_contents: PlanContent[];
}