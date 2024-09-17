import {MeetingContent} from "../types/MeetingContent.ts";

const useMeetingTableHelpers = () => {
  const groupBy = (data: MeetingContent[]): { [roomType: string]: MeetingContent[] } => {
    const result: { [roomType: string]: MeetingContent[] } = {};

    data.forEach((mainItem) => {
      const roomTypes = new Set(mainItem.plan_contents.map((pc) => pc.room_type));
      roomTypes.forEach((roomType) => {
        if (!result[roomType]) {
          result[roomType] = [];
        }
        result[roomType].push(mainItem);
      });
    });

    return result;
  }


  return {
    groupBy,
  }
}

export default useMeetingTableHelpers;