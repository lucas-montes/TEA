import React from 'react';
import ContentContainer from './components/ContentContainer/ContentContainer';
import SideBar from './components/SideBar/SideBar';

const App = () => (
  <>
    <div className="w-64">
      <SideBar />
    </div>
    {/* <div className="w-auto">
      <ContentContainer />
    </div> */}
  </>
);

export default App;