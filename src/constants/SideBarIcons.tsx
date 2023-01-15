import { BsKanban, BsGearFill, BsClock } from 'react-icons/bs';
import { BiNote } from 'react-icons/bi';
import { TbMathFunction } from 'react-icons/tb';

import { kanban, notes, alias, settings, schedule } from "./Apps";
import ThemeManager from "../managers/manageTheme"
import MenuApp from "../models/Apps";



function switchTheme(props: any): void {
  const themeManager = new ThemeManager();
  themeManager.switchAndGetNewTheme();
}

const SideBarIcons = [
  new MenuApp(
    <BsKanban size="28" />,
    "",
    "sidebar-icon group",
    "sidebar-tooltip group-hover:scale-100",
    kanban,
  ),
  new MenuApp(
    <BiNote size="32" />,
    "",
    "sidebar-icon group",
    "sidebar-tooltip group-hover:scale-100",
    notes,
  ),
  new MenuApp(
    <TbMathFunction size="32" />,
    "",
    "sidebar-icon group",
    "sidebar-tooltip group-hover:scale-100",
    alias,
  ),
  new MenuApp(
    <BsClock size="32" />,
    "",
    "sidebar-icon group",
    "sidebar-tooltip group-hover:scale-100",
    schedule,
  ),
  new MenuApp(
    <BsGearFill size="22" />,
    "inset-x-0 bottom-0 absolute",
    "sidebar-icon group",
    "sidebar-tooltip group-hover:scale-100",
    settings,
    switchTheme,
  ),
];

export default SideBarIcons;