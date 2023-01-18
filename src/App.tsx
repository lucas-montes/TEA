import Content from './components/Content/Content';
import SideBar from './components/SideBar/SideBar';
import handleInitialTheme from "./context/ThemeContext/ThemeContext";
import handleInitialApp from "./context/AppContext/AppContext";


const App = () => {
  handleInitialTheme();
  const [app, setApp]: [string, (app: string) => void] = handleInitialApp();
  return (
    <>
      <div className="flex-initial w-64">
        <SideBar app={app} setApp={setApp} />
      </div>
      <div className="flex-auto">
        <Content app={app} />
      </div>
    </>
  )
}

export default App;