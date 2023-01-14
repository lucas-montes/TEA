import Content from './components/Content/Content';
import SideBar from './components/SideBar/SideBar';
import ThemeContextWrapper from './context/ThemeContext/ThemeContextWrapper';
import AppContextWrapper from './context/AppContext/AppContextWrapper';
import type { FC } from 'react'


const App: FC = () => {
  return (
    <ThemeContextWrapper>
      <AppContextWrapper>
        <div className="flex-initial w-64">
          <SideBar />
        </div>
        <div className="flex-auto">
          <Content />
        </div>
      </AppContextWrapper>
    </ThemeContextWrapper>
  )
}

export default App;