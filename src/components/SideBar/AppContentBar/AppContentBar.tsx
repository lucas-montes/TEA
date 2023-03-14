import Modal from "../../Modals/Modal";

import BarContent from "./Components/BarContent";

import { kanban, notes, alias, schedule, prosCons } from "../../../constants/Apps"

import KanbanTicket from "../../../models/KanbanTicket";
import ProsCons from "../../../models/ProsCons";
import Note from "../../../models/Note";
import Alias from "../../../models/Alias";
import Schedule from "../../../models/Schedule";

import { useSelector } from "react-redux";


export default function AppContentBar() {

  const currentApp = useSelector((state) => state.items.stateData.currentApp)

  function gotModelAndAppName(app: string) {
    switch (app) {
      case kanban:
        return [KanbanTicket, "Kanban"];
      case notes:
        return [Note, "Notes"];
      case alias:
        return [Alias, "Alias"];
      case schedule:
        return [Schedule, "Schedule"];
      case prosCons:
        return [ProsCons, "Pros & Cons"];
      default:
        return [null, "Settings"];
    }
  }

  let [currentModel, appName] = gotModelAndAppName(currentApp);

  return (
    <div className="
    w-5/6 flex flex-col 
    justify-between 
    h-screen bg-gray-100 
    dark:bg-gray-800 
    border-r w-48
    overflow-auto">
      <div className="px-4 py-6">
        <h1 className="font-bold">
          <span className="text-2xl text-white flex items-center">
            {appName}
          </span>
        </h1>
        <nav aria-label="Main Nav" className="flex flex-col mt-6 space-y-1 overflow-auto">
          <Modal app={appName} model={currentModel} />
          <BarContent model={currentModel} currentApp={currentApp} />
        </nav>
      </div>
    </div>
  );
};
