import Content from './components/Content/Content';
import SideBar from './components/SideBar/SideBar';

const App = () => (
  <>
    <div className="flex-initial w-64">
      <SideBar />
    </div>
    <div className="flex-auto">
      <Content />
    </div>
  </>
);

export default App;