import { FC, useState, useEffect, ReactNode } from 'react'
import AppManager from "../../utils/manageApp";
import AppContext from './AppContext'


type Props = {
    children: ReactNode
}

const AppContextWrapper: FC<Props> = ({ children }) => {
    const appManager = new AppManager()
    const persistedTheme: string = appManager.getLatestAppUsed()
    const [theme, setTheme] = useState(persistedTheme)

    const changeCurrentTheme = (newTheme: 'light' | 'dark') => {
        setTheme(newTheme)
        appManager.setCurrentApp(newTheme)
    }

    useEffect(() => {
        const bodyClass = window.document.body.classList;
        if (theme === 'light') bodyClass.remove('dark');
        else bodyClass.add('dark');
    }, [theme])

    return <AppContext.Provider value={{ currentTheme: theme, changeCurrentTheme }}>{children}</AppContext.Provider>
}

export default AppContextWrapper