import React from "react";
import { SetterOrUpdater, useRecoilValue } from "recoil";

import { schedulesState } from "@/recoil/schedules/schedules.recoil";
import { Schedule } from "@/models/Schedule";

type Props = {
    schedule?: Schedule,
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>,
    setSchedule: SetterOrUpdater<{
        [key: number]: Schedule;
    }>,
    currentDay: string,
}

export default function ScheduleForm({ schedule, setShowModal, setSchedule, currentDay }: Props) {

    const [inputs, setInputs] = React.useState(
        {
            title: schedule ? schedule.title : "",
            content: schedule ? schedule.content : "",
            startTime: schedule ? schedule.startTime : "",
            endTime: schedule ? schedule.endTime : "",
            color: schedule ? schedule.color : "",
        }
    );

    const handleSubmit = (event: any) => {
        event.preventDefault();
        saveTask(schedule?.id)
        setShowModal(false);
    };

    function saveTask(id: number = 0): void {
        const newSchedule = new Schedule(
            inputs.title,
            inputs.startTime,
            inputs.endTime,
            inputs.color,
            currentDay,
            inputs.content,
            schedule?.createdAt
        )
        if (id > 0) {
            newSchedule.update(id)
                .then(value => { setNewTask(value, newSchedule) })
                .catch(er => { console.error(er) })
        } else {
            newSchedule.create()
                .then(value => { setNewTask(value, newSchedule) })
                .catch(er => { console.error(er) })
        }
    };

    function setNewTask(id: number, newSchedule: Schedule): void {
        newSchedule.id = id;
        setSchedule(newSchedule);
    }

    function handleChange(event: any) {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({ ...values, [name]: value }));
    };
    return (
        <form onSubmit={handleSubmit}>
            <div className="mb-5">
                <label htmlFor="taskStatus" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Status</label>
                <select
                    id="taskStatus"
                    name="taskStatus"
                    value={inputs.taskStatus}
                    onChange={handleChange}
                    className="
                        focus:outline-none focus:ring bg-gray-50
                        border border-gray-300 text-gray-900
                        text-sm rounded-lg focus:ring-primary-500
                        focus:border-primary-500 block w-full p-2.5
                        dark:bg-gray-700 dark:border-gray-600
                        dark:placeholder-gray-400 dark:text-white
                        dark:focus:ring-primary-500 dark:focus:border-primary-500">
                    <option value="to-do">TODO</option>
                    <option value="doing">Doing</option>
                    <option value="done">Done</option>
                </select>
            </div>

            <div className="mb-5">
                <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Title</label>
                <input
                    type="text"
                    name="title"
                    id="title"
                    value={inputs.title}
                    onChange={handleChange}
                    className="
                            bg-gray-50 border border-gray-300
                            text-gray-900 text-sm rounded-lg
                            focus:ring-primary-600
                            focus:border-primary-600
                            focus:outline-none focus:ring
                            block w-full p-2.5
                            dark:bg-gray-700
                            dark:border-gray-600
                            dark:placeholder-gray-400
                            dark:text-white
                            dark:focus:ring-primary-500
                            dark:focus:border-primary-500"
                />
            </div>

            <div className="mb-3">
                <label htmlFor="content" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Content</label>
                <textarea
                    id="content"
                    name="content"
                    value={inputs.content}
                    onChange={handleChange}
                    rows={5}
                    className="
                        block focus:outline-none
                        focus:ring p-2.5 w-full
                        text-sm text-gray-900 bg-gray-50
                        rounded-lg border border-gray-300
                        focus:ring-primary-500
                        focus:border-primary-500
                        dark:bg-gray-700 dark:border-gray-600
                        dark:placeholder-gray-400 dark:text-white
                        dark:focus:ring-primary-500
                        dark:focus:border-primary-500"
                    placeholder="Write a description...">
                </textarea>
            </div>
            <div className="flex items-center space-x-4">
                <button type="submit" className="text-black bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                    Update
                </button>
                <button type="button" className="text-red-600 inline-flex items-center hover:text-white border border-red-600 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900">
                    <svg className="mr-1 -ml-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd"></path></svg>
                    Delete
                </button>
            </div>
        </form>
    );
}
