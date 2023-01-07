import React from 'react';
import ContentContainer from './components/ContentContainer/ContentContainer';
import SideBar from './components/SideBar/SideBar';

const App = () => (
  <>
    <div className="flex-initial w-64">
      <SideBar />
    </div>
    <div className="flex-auto">
      <ContentContainer />
    </div>
  </>
);

export default App;