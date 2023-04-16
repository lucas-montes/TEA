import {
  RecoilState,
  SetRecoilState,
  GetRecoilValue,
  RecoilValue
} from "recoil";

import { Schedule } from "@/models/Schedule";

import { customSelector, customAtom } from "@/recoil/base.recoil";


export type ScheduleState = {
  items: { [key: string]: { [key: Schedule["id"]]: Schedule; }; };
  selectedItemId: Schedule["id"];
  selectedItem: Schedule;
  selectedDay: string;
};

export const schedulesState: RecoilState<ScheduleState> = customAtom(
  "schedulesState",
  { selectedDay: "Monday" },
  {
    "Monday": {},
    'Tuesday': {},
    'Wednesday': {},
    'Thursday': {},
    'Friday': {},
    'Saturday': {},
    'Sunday': {}
  }
);

export const schedulesSelector: RecoilState<ScheduleState> = customSelector(
  "schedulesSelector",
  schedulesState,
  getSchedulesPerDay,
  addScheduleForDay,
);

function getSchedulesPerDay<ScheduleState>(
  get: GetRecoilValue,
  state: RecoilState<ScheduleState>
): { [key: number]: RecoilValue<ScheduleState> } {
  const currentSate = get(state);
  const daySchedules = currentSate.items[currentSate.selectedDay];
  return Object.values(daySchedules);
}

function addScheduleForDay(
  schedule: Schedule,
  set: SetRecoilState,
  get: GetRecoilValue,
  state: RecoilState<ScheduleState>): void {
  const currentState = structuredClone(get(state));
  const dayState = currentState.items[currentState.selectedDay];
  dayState[schedule.id] = schedule;
  set(state, { ...currentState });
}

export const selectScheduleSelector = customSelector(
  "selectScheduleSelector",
  schedulesState,
  getDay,
  setDay
)

function getDay(
  get: GetRecoilValue,
  state: ScheduleState
): string {
  return get(state).selectedDay
}

function setDay(day: string, set: SetRecoilState, get: GetRecoilValue,
  state: ScheduleState): void {
  set(state, { ...get(state), selectedDay: day })
}