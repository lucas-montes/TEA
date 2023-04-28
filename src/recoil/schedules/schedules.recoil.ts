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
  hasDatabaseInfo: boolean,
  selectedDay: string;
};

// const localForageEffect = key => ({ setSelf, onSet, trigger }) => {
//   // If there's a persisted value - set it on load
//   const loadPersisted = async () => {
//     const savedValue = await Schedule.getAll();

//     if (savedValue != null) {
//       console.log(savedValue)
//       console.log("savedValue")
//       setSelf(JSON.parse(savedValue));
//     }
//   };

//   // Asynchronously set the persisted data
//   if (trigger === 'get') {
//     loadPersisted();
//   }

//   // Subscribe to state changes and persist them to localForage
//   onSet((newValue, _, isReset) => {
//     isReset
//       ? localStorage.removeItem(key)
//       : localStorage.setItem(key, JSON.stringify(newValue));
//   });
// };

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
  },
  // [localForageEffect('schedulesState')],
);

export const schedulesDatabase: RecoilState<ScheduleState> = customSelector(
  "schedulesDatabase",
  schedulesState,
  isUpdatedFromDatabase,
  updateFromDatabase,
);

function isUpdatedFromDatabase<ScheduleState>(
  get: GetRecoilValue,
  state: RecoilState<ScheduleState>
): boolean {
  return get(state).hasDatabaseInfo;
}

function updateFromDatabase(
  schedules: Schedule[],
  set: SetRecoilState,
  get: GetRecoilValue,
  state: RecoilState<ScheduleState>): void {
  const currentState = structuredClone(get(state));
  for (let i = 0; i < schedules.length; i++) {
    const schedule = schedules[i];
    currentState.items[schedule.day][schedule.id] = schedule;
  }
  currentState.hasDatabaseInfo = true;
  set(state, { ...currentState });
}


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