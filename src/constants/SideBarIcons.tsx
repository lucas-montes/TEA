import { BsKanban, BsGearFill } from 'react-icons/bs';
import { BiNote } from 'react-icons/bi';
import { TbMathFunction } from 'react-icons/tb';
import MenuApp from "../models/Apps";

const SideBarIcons = [
  new MenuApp(
    <BsKanban size="28" />,
    "",
    "sidebar-icon group",
    "sidebar-tooltip group-hover:scale-100",
    "Kanban",
  ),
  new MenuApp(
    <BiNote size="32" />,
    "",
    "sidebar-icon group",
    "sidebar-tooltip group-hover:scale-100",
    "Notes",
  ),
  new MenuApp(
    <TbMathFunction size="32" />,
    "",
    "sidebar-icon group",
    "sidebar-tooltip group-hover:scale-100",
    "Alias",
  ),
  new MenuApp(
    <BsGearFill size="22" />,
    "inset-x-0 bottom-0 absolute",
    "sidebar-icon group",
    "sidebar-tooltip group-hover:scale-100",
    "Settings",
  ),
];

export default SideBarIcons;