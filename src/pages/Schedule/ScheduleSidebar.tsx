import React from 'react';

import { Folder as FolderIcon } from "@/components/Icons";
import { Ellipsis, Flex } from "@/styles/layout";
import { Item } from "@/components/SidebarOption/style";


type SSIProps = {
    day: string,
    selectedDay: string,
    setSelectedDay: React.Dispatch<React.SetStateAction<string>>,
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

export function SchedulesSidebar({ setSelectedDay, selectedDay }: SSProps) {
    const listDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
    return (
        <>
            {listDays.map((day, index) => <SchedulesSidebarItem
                selectedDay={selectedDay}
                setSelectedDay={setSelectedDay}
                day={day}
                key={index}
            />)}
        </>
    );
}
