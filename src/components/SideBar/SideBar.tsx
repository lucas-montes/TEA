import AppsBar from './AppsBar/AppsBar';
import AppContentBar from './AppContentBar/AppContentBar';


export default function SideBar() {
  return (
    <div className="h-screen flex">
      <AppsBar  />
      <AppContentBar />
    </div>
  );

};
