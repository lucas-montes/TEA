import React from 'react';

import { Schedule } from "@/models/Schedule";
import { MainContainer } from '@/components/MainContainer'

import { Folder as FolderIcon } from "@/components/Icons";

import { Ellipsis, Flex } from "@/styles/layout";

import { Item } from "@/components/SidebarOption/style";

const testSchedules = [

    {
        startTime: 22,
        endTime: 6,
        title: "sleep",
        content: "you have to do this",
        id: 1,
        color: "bg-blue-500 border-blue-400"
    },
    {
        startTime: 6,
        endTime: 13,
        title: "work",
        content: "you have to do this",
        id: 2,
        color: "bg-red-500 border-red-400"
    }, {
        startTime: 13,
        endTime: 15,
        title: "sport",
        content: "you have to do this",
        id: 3,
        color: "bg-green-500 border-green-400"
    }, {
        startTime: 15,
        endTime: 18,
        title: "coding",
        content: "you have to do this",
        id: 4,
        color: "bg-yellow-500 border-yellow-400"
    }, {
        startTime: 18,
        endTime: 20,
        title: "study",
        content: "you have to do this",
        id: 5,
        color: "bg-red-500 border-red-400"
    },
    {
        startTime: 20,
        endTime: 22,
        title: "read",
        content: "you have to do this",
        id: 6,
        color: "bg-purple-800 border-purple-800"
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
        <tr className={`${item.color} border-b`}>
            <th scope="row" className="px-6 py-4 font-medium text-blue-50 whitespace-nowrap dark:text-blue-100">
                {item.startTime} - {item.endTime}
            </th>
            <td className="px-6 py-4">
                {item.title}
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
    return (
        <div className='content w-full'>
            <div className="w-11/12 m-4 mr-20 overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left text-blue-100 dark:text-blue-100">
                    <tbody>
                        {orderSchedules(schedules).map((item, index) => <ScheduleItem item={item} key={index} />)}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

type SSIProps = {
    day: string
}

function SchedulesSidebarItem({ day }: SSIProps) {

    return (
        <Item
        >
            <Flex alignItems="center" gap={10}>
                <FolderIcon className="icon" size={15} />
                <Ellipsis>{day}</Ellipsis>
            </Flex>
        </Item>
    );
}


function SchedulesSidebar() {
    const listDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
    return (
        { listDays.map((day, index) => <SchedulesSidebarItem day={day} key={index} />) }
    );
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
