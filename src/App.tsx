import SideBar from './components/SideBar/SideBar';
import handleInitialTheme from "./context/ThemeContext/ThemeContext";
import handleInitialApp from "./context/AppContext/AppContext";
import {
  Routes,
  Route,
} from "react-router-dom";

import Content from "./components/Content/Content";
import KanbanContent from "./components/Content/Kanban/Kanban";
import ProsConsContent from "./components/Content/ProsCons/ProsCons";
import NoteContent from "./components/Content/Notes/Note";

const App = () => {
  handleInitialTheme();
  const [app, setApp]: [string, (app: string) => void] = handleInitialApp();
  return (
    <>
      <div className="flex-initial w-64">
        <SideBar app={app} setApp={setApp} />
      </div>
      <div className="flex-auto">
        <div className="h-screen bg-gray-100 dark:bg-gray-800 mx-auto pt-4 px-7 overflow-auto">
          <Routes>
            {/* <Route path="/" element={<Content />} /> */}
            <Route path="/note/:Id" element={<NoteContent />} />
            <Route path="/kanbanticket/:Id" element={<KanbanContent />} />
            <Route path="/proscons/:Id" element={<ProsConsContent />} />
          </Routes>
        </div>
      </div>
    </>
  )
}

export default App;