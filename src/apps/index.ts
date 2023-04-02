import {
	MdOutlineSpaceDashboard,
	MdOutlineExplore,
	MdOutlineEventNote,
    MdAccountBalance,
} from 'react-icons/md'

import {MenuApp} from "@/models/Apps";
import Home from "@/pages/Home";
import Tasks from "@/pages/Tasks";
import { Notebook } from "@/pages/Notebook/Notebook";

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
    ),
]