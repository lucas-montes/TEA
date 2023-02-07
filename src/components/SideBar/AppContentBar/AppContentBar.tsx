import Modal from "../../Modals/Modal";
import AppContentBarAlias from "./Components/AppContentBarAlias";
import AppContentBarKanban from "./Components/AppContentBarKanban";
import AppContentBarNotes from "./Components/AppContentBarNotes";
import { kanban, notes, alias, settings, schedule } from "../../../constants/Apps"

export default function AppContentBar({ app }) {
  function displayBarContent(app: string) {
    switch (app) {
      case kanban:
        return <AppContentBarKanban />;
      case notes:
        return <AppContentBarNotes />;
      case alias:
        return <AppContentBarAlias />;
      default:
        return [];
    }
  }


  return (
    <div className="w-3/4 flex flex-col justify-between h-screen bg-gray-100 dark:bg-gray-800 border-r w-48">
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
