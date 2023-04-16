import React from 'react';

import { useRecoilState } from "recoil";

import { Folder as FolderIcon } from "@/components/Icons";
import { Ellipsis, Flex } from "@/styles/layout";
import { Item } from "@/components/SidebarOption/style";
import { selectScheduleSelector } from "@/recoil/schedules/schedules.recoil";

type SSIProps = {
    day: string,
}

function SchedulesSidebarItem({ day }: SSIProps) {
    const [selectedDay, setSelectedDay] = useRecoilState(selectScheduleSelector);
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

export function SchedulesSidebar() {
    const listDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
    return (
        <>
            {listDays.map((day, index) => <SchedulesSidebarItem
                day={day}
                key={index}
            />)}
        </>
    );
}
