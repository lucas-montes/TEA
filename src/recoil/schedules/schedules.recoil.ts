import {
  RecoilState,
  selector,
  SetRecoilState,
  GetRecoilValue,
  DefaultValue,
  RecoilValue
} from "recoil";

import { Schedule } from "@/models/Schedule";

import { customSelector, customAtom, setItem, getItem } from "@/recoil/base.recoil";

const testSchedules = [

  {
    startTime: 22,
    endTime: 6,
    title: "sleep",
    content: "you have to do this",
    id: 1,
    color: "blue"
  },
  {
    startTime: 6,
    endTime: 13,
    title: "work",
    content: "you have to do this",
    id: 2,
    color: "red"
  }, {
    startTime: 13,
    endTime: 15,
    title: "sport",
    content: "you have to do this",
    id: 3,
    color: "green"
  }, {
    startTime: 15,
    endTime: 18,
    title: "coding",
    content: "you have to do this",
    id: 4,
    color: "yellow"
  }, {
    startTime: 18,
    endTime: 20,
    title: "study",
    content: "you have to do this",
    id: 5,
    color: "red"
  },
  {
    startTime: 20,
    endTime: 22,
    title: "read",
    content: "you have to do this",
    id: 6,
    color: "purple"
  }
]

export type ScheduleState = {
  items: { [key: string]: Schedule[]; };
  selectedItemId: Schedule["id"];
  selectedItem: Schedule;
};

export const schedulesState: RecoilState<ScheduleState> = customAtom(
  "schedulesState",
  {},
  {
    "Monday": testSchedules,
    'Tuesday': [], 'Wednesday': [], 'Thursday': [], 'Friday': [], 'Saturday': [], 'Sunday': []
  }
);

export const schedulesSelector: RecoilState<ScheduleState> = customSelector(
  "schedulesSelector",
  schedulesState,
  getItems
);

export function getItems<ScheduleState>(
  get: GetRecoilValue,
  state: RecoilState<ScheduleState>
): { [key: number]: RecoilValue<ScheduleState> } {
  return get(state).items
}

export const selectScheduleSelector = customSelector(
  "selectScheduleSelector",
  schedulesState,
  getItem,
  setItem
)