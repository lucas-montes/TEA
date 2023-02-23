import Modal from "../../Modals/Modal";
import AppContentBarAlias from "./Components/AppContentBarAlias";
import AppContentBarKanban from "./Components/Kanban";
import AppContentBarNotes from "./Components/Notes";
import { kanban, notes, alias, settings, schedule, prosCons } from "../../../constants/Apps"

export default function AppContentBar({ app }) {
  function displayBarContent(app: string) {
    switch (app) {
      case kanban:
        return <AppContentBarKanban />;
      case notes:
        return <AppContentBarNotes />;
      case alias:
        return <AppContentBarAlias />;
      case schedule:
        return <div />;
      case prosCons:
        return <div />;
      default:
        return [];
    }
  }


  return (
    <div className="
    w-3/4 flex flex-col 
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
          <Modal app={app}></Modal>
          {displayBarContent(app)}
        </nav>
      </div>
    </div>
  );
};
