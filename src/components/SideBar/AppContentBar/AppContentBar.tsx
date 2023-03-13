import Modal from "../../Modals/Modal";

import BarContent from "./Components/BarContent";

import { kanban, notes, alias, settings, schedule, prosCons } from "../../../constants/Apps"

import KanbanTicket from "../../../models/KanbanTicket";
import ProsCons from "../../../models/ProsCons";
import Note from "../../../models/Note";
import Alias from "../../../models/Alias";
import Schedule from "../../../models/Schedule";

import { useDispatch, useSelector } from "react-redux";


export default function AppContentBar() {

  const app = useSelector((state) => state.items.stateData.currentApp)

  function getDisplayBarAndModel(app: string) {
    switch (app) {
      case kanban:
        return KanbanTicket;
      case notes:
        return Note;
      case alias:
        return Alias;
      case schedule:
        return Schedule;
      case prosCons:
        return ProsCons;
      default:
        return null;
    }
  }

  let currentModel = getDisplayBarAndModel(app);

  return (
    <div className="
    w-5/6 flex flex-col 
    justify-between 
    h-screen bg-gray-100 
    dark:bg-gray-800 
    border-r w-48
    overflow-auto">
      <div className="px-4 py-6 ">
        <h1 className=" font-bold ">

          <span className="text-2xl text-white flex items-center">
            {app}
          </span>
        </h1>

        <nav aria-label="Main Nav" className="flex flex-col mt-6 space-y-1 overflow-auto">
          <Modal app={app} model={currentModel} />
          <BarContent model={currentModel} />
        </nav>
      </div>
    </div>
  );
};
