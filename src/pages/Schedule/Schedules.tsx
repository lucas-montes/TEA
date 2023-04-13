import React, {useState} from 'react';

import { SetterOrUpdater, useRecoilState } from "recoil";

import { Schedule } from "@/models/Schedule";
import { MainContainer } from '@/components/MainContainer'
import { Folder as FolderIcon } from "@/components/Icons";
import { Ellipsis, Flex } from "@/styles/layout";
import { Item } from "@/components/SidebarOption/style";
import {schedulesSelector} from "@/recoil/schedules/schedules.recoil";
import ScheduleForm from "@/pages/Schedule/ScheduleForm";
import Modal from "@/components/Modals/Modal";



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

type ScheduleProps = {
    schedules: Schedule[],
    setWorkingSchedule
}

function ScheduleContent({ schedules, setWorkingSchedule }: ScheduleProps) {
    function orderSchedules(schedules: Schedule[]): Schedule[] {
        return [...schedules].sort(function(a, b) {
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
    day: string,
     selectedDay: string,
    setSelectedDay: React.Dispatch<React.SetStateAction<string>>
}

function SchedulesSidebarItem({ day, selectedDay, setSelectedDay }: SSIProps) {

    return (
        <Item
            selected={selectedDay === day}
            onClick={() => setSelectedDay(day)}
        >
            <Flex alignItems="center" gap={10}>
                <FolderIcon className="icon" size={15} />
                <Ellipsis>{day}</Ellipsis>
            </Flex>
        </Item>
    );
}

type SSProps = {
     selectedDay: string;
    setSelectedDay: React.Dispatch<React.SetStateAction<string>>
}

function SchedulesSidebar({setSelectedDay, selectedDay}: SSProps) {
    const listDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
    return (
        <>
        { listDays.map((day, index) => <SchedulesSidebarItem selectedDay={selectedDay} setSelectedDay={setSelectedDay} day={day} key={index} />) }
        </>
    );
}
const Schedules: React.FC = () => {
    const [selectedDay, setSelectedDay] = React.useState("Monday");
    const [schedule, setSchedule] = useRecoilState(schedulesSelector);
    const [showModal, setShowModal] = useState(false);
    const [workingSchedule, setWorkingSchedule] = useState({} as Schedule);
    const [modalTitle, setModalTitle] = useState("Update schedule");
    const schedulesPerDay = schedule[selectedDay];

    return (
        <>
        <MainContainer
            title={"Schedules"}
            sidebar={<SchedulesSidebar selectedDay={selectedDay} setSelectedDay={setSelectedDay}/>}
            content={
                <ScheduleContent schedules={schedulesPerDay} setSchedule={setSchedule} setWorkingSchedule={setWorkingSchedule} />}
        />
        <Modal
                        title={modalTitle}
                        showModal={showModal}
                        setShowModal={setShowModal}
                        content={
                            <ScheduleForm
                                currentDay={selectedDay}
                                schedule={workingSchedule}
                                setSchedule={setSchedule}
                                setShowModal={setShowModal}
                            />
                        } />
        </>

    )
}

export default Schedules;
