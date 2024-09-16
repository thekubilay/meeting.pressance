import store from "../store";
import {storeToRefs} from "pinia";

export default function () {
  const STORE = store();

  return {
    ...storeToRefs(STORE),
  };
}
