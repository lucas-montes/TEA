import Modal from "../../Modals/Modal";
import AppContentBarAlias from "./Components/Alias";
import AppContentBarKanban from "./Components/Kanban";
import AppContentBarNotes from "./Components/Notes";
import AppContentBarProsCons from "./Components/ProsCons";
import { kanban, notes, alias, settings, schedule, prosCons } from "../../../constants/Apps"
import KanbanTicket from "../../../models/KanbanTicket";
import ProsCons from "../../../models/ProsCons";
import Note from "../../../models/Note";
import Alias from "../../../models/Alias";

export default function AppContentBar({ app }) {
  function getDisplayBarAndModel(app: string) {
    switch (app) {
      case kanban:
        return [<AppContentBarKanban model={KanbanTicket} />, KanbanTicket];
      case notes:
        return [<AppContentBarNotes model={Note} />, Note];
      case alias:
        return [<AppContentBarAlias model={Alias} />, Alias];
      case schedule:
        return [<div />, null];
      case prosCons:
        return [<AppContentBarProsCons model={ProsCons} />, ProsCons];
      default:
        return [null, null];
    }
  }

  let [contentBar, currentModel] = getDisplayBarAndModel(app);

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
          <Modal app={app} model={currentModel}></Modal>
          {contentBar}
        </nav>
      </div>
    </div>
  );
};
