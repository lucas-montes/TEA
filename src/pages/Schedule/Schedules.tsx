import React, { useState } from 'react';

import { useRecoilState } from "recoil";

import { Schedule } from "@/models/Schedule";
import { MainContainer } from '@/components/MainContainer'
import { schedulesSelector } from "@/recoil/schedules/schedules.recoil";
import ScheduleForm from "@/pages/Schedule/ScheduleForm";
import Modal from "@/components/Modals/Modal";
import { SchedulesSidebar } from "@/pages/Schedule/ScheduleSidebar";
import { ScheduleContent } from "@/pages/Schedule/ScheduleContent";


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
                sidebar={<SchedulesSidebar selectedDay={selectedDay} setSelectedDay={setSelectedDay} />}
                content={
                    <ScheduleContent
                        schedules={schedulesPerDay}
                        setShowModal={setShowModal}
                        setModalTitle={setModalTitle}
                        setWorkingSchedule={setWorkingSchedule} />}
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
