import { BsPlus, BsFillLightningFill, BsGearFill } from 'react-icons/bs';
import { FaFire, FaPoo } from 'react-icons/fa';
import MenuApp from "../models/Apps"

const SideBarIcons = [
  new MenuApp(
    <FaFire size="28" />,
    "",
    "sidebar-icon group",
    "sidebar-tooltip group-hover:scale-100",
    "Fire",
  ),
  new MenuApp(
    <BsPlus size="32" />,
    "",
    "sidebar-icon group",
    "sidebar-tooltip group-hover:scale-100",
    "Plus ultra",
  ),
  new MenuApp(
    <BsFillLightningFill size="20" />,
    "",
    "sidebar-icon group",
    "sidebar-tooltip group-hover:scale-100",
    "Light",
  ),
  new MenuApp(
    <FaPoo size="20" />,
    "",
    "sidebar-icon group",
    "sidebar-tooltip group-hover:scale-100",
    "Fire",
  ),
  new MenuApp(
    <BsGearFill size="22" />,
    "",
    "sidebar-icon group",
    "sidebar-tooltip group-hover:scale-100",
    "Settings",
  ),
]

export default SideBarIcons;