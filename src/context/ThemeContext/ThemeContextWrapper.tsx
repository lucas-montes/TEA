import { FC, useState, useEffect, ReactNode } from 'react'
import ThemeManager from "../../managers/manageTheme";
import ThemeContext from './ThemeContext'


type Props = {
    children: ReactNode
}

const ThemeContextWrapper: FC<Props> = ({ children }) => {
    const themeManager = new ThemeManager()
    const persistedTheme: string = themeManager.getLatestTheme()
    const [theme, setTheme] = useState(persistedTheme)

    const changeCurrentTheme = (newTheme: 'light' | 'dark') => {
        setTheme(newTheme)
        themeManager.changeTheme(newTheme)
    }

    useEffect(() => {
        const bodyClass = window.document.body.classList;
        if (theme === 'light') bodyClass.remove('dark');
        else bodyClass.add('dark');
    }, [theme])

    return <ThemeContext.Provider value={{ currentTheme: theme, changeCurrentTheme }}>{children}</ThemeContext.Provider>
}

export default ThemeContextWrapper