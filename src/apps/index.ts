import {
    MdOutlineSpaceDashboard,
    MdOutlineExplore,
    MdOutlineEventNote,
    MdAccountBalance,
    MdPunchClock
} from 'react-icons/md'

import { MenuApp } from "@/models/Apps";
import Home from "@/pages/Home";
import Tasks from "@/pages/Tasks";
import { Notebook } from "@/pages/Notebook/Notebook";
import Schedules from "@/pages/Schedule/Schedules";
import ProsConsContent from '@/pages/ProsCons/ProsCons';

export const Apps = [
    new MenuApp(
        MdOutlineSpaceDashboard,
        "Home",
        Home,
        "/"
    ),
    new MenuApp(
        MdOutlineExplore,
        "Tasks",
        Tasks,
    ),
    new MenuApp(
        MdOutlineEventNote,
        "Notebooks",
        Notebook,
        "/notebook"
    ),
    new MenuApp(
        MdAccountBalance,
        "ProsCons",
        ProsConsContent,
    ),
    new MenuApp(
        MdPunchClock,
        "Schedules",
        Schedules,
    ),
]
