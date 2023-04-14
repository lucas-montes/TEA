import React from 'react';

import { Schedule } from "@/models/Schedule";


type ScheduleItemProps = {
    item: Schedule
    setWorkingSchedule: React.Dispatch<React.SetStateAction<Schedule>>,
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>,
    setModalTitle: React.Dispatch<React.SetStateAction<string>>
}
function ScheduleItem({ item, setShowModal, setWorkingSchedule, setModalTitle }: ScheduleItemProps) {
    function handleOncClick(): void {
        setModalTitle("Update new schedule")
        setWorkingSchedule(item);
        setShowModal(true);
    }
    return (
        <tr className={`${item.color} border-b cursor-pointer`} onClick={handleOncClick}>
            <th scope="row" className="px-6 py-4 font-medium text-blue-50 whitespace-nowrap dark:text-blue-100">
                {item.startTime} - {item.endTime}
            </th>
            <td className="px-6 py-4">
                {item.title}
            </td>
        </tr>
    )
}

type ScheduleProps = {
    schedules: Schedule[],
    setWorkingSchedule: React.Dispatch<React.SetStateAction<Schedule>>,
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>,
    setModalTitle: React.Dispatch<React.SetStateAction<string>>
}

export function ScheduleContent({ schedules, setWorkingSchedule, setShowModal, setModalTitle }: ScheduleProps) {
    function orderSchedules(schedules: Schedule[]): Schedule[] {
        return [...schedules].sort(function (a, b) {
            return a.startTime - b.startTime;
        })
    }
    function handleOncClick(): void {
        setModalTitle("Create new schedule")
        setWorkingSchedule({});
        setShowModal(true);
    }
    return (
        <div className='content w-full'>
            <div className="w-11/12 m-4 mr-20 shadow-md rounded-lg">
                <button
                    className='
                py-2.5 px-5 mr-2 mb-4 w-full text-sm 
                font-medium text-gray-900 
                focus:outline-none bg-white 
                rounded-lg border border-gray-200 
                hover:bg-gray-100 hover:text-blue-700 
                focus:z-10 focus:ring-4 focus:ring-gray-200 
                dark:focus:ring-gray-700 dark:bg-gray-800 
                dark:text-gray-400 dark:border-gray-600 
                dark:hover:text-white 
                dark:hover:bg-gray-700'
                    onClick={handleOncClick} >New </button>
                <table className="w-full text-sm text-left text-blue-100 dark:text-blue-100">
                    <tbody>
                        {orderSchedules(schedules).map((item, index) => <ScheduleItem
                            setShowModal={setShowModal}
                            setModalTitle={setModalTitle}
                            setWorkingSchedule={setWorkingSchedule}
                            item={item}
                            key={index} />)}
                    </tbody>
                </table>
            </div>
        </div>
    )
}