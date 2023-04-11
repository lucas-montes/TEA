import React from 'react';

import { Schedule } from "@/models/Schedule";
import { MainContainer } from '@/components/MainContainer'


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

type ScheduleProps = {
    schedules: Schedule[]
}

type ScheduleItemProps = {
    item: Schedule
}
function ScheduleItem({ item }: ScheduleItemProps) {
    return (
        <tr className="bg-blue-500 border-b border-blue-400">
            <th scope="row" className="px-6 py-4 font-medium text-blue-50 whitespace-nowrap dark:text-blue-100">
                Apple MacBook Pro 17"
            </th>
            <td className="px-6 py-4">
                Silver
            </td>
            <td className="px-6 py-4">
                Laptop
            </td>
            <td className="px-6 py-4">
                $2999
            </td>
            <td className="px-6 py-4">
                <a href="#" className="font-medium text-white hover:underline">Edit</a>
            </td>
        </tr>
    )
}


function ScheduleContent({ schedules }: ScheduleProps) {
    function orderSchedules(schedules: Schedule[]): Schedule[] {
        return schedules.sort(function(a, b) {
            return a.startTime - b.startTime;
        })
    }
    console.log(orderSchedules(schedules))
    return (
        <div className='content w-full'>
            <div className="w-11/12 m-4 mr-20 overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left text-blue-100 dark:text-blue-100">
                    <tbody>
                        <tr className="bg-blue-500 border-b border-blue-400">
                            <th scope="row" className="px-6 py-4 font-medium text-blue-50 whitespace-nowrap dark:text-blue-100">
                                Magic Mouse 2
                            </th>
                            <td className="px-6 py-4">
                                Black
                            </td>
                            <td className="px-6 py-4">
                                Accessories
                            </td>
                            <td className="px-6 py-4">
                                $99
                            </td>
                            <td className="px-6 py-4">
                                <a href="#" className="font-medium text-white hover:underline">Edit</a>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}


const Schedules: React.FC = () => {

    return (
        <MainContainer
            title={"Schedules"}
            sidebar={<>hey</>}
            content={
                <ScheduleContent schedules={testSchedules} />}
        />
    )
}

export default Schedules;
