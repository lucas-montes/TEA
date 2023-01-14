import { createContext } from 'react'

const defaultValue = {
    currentTheme: 'dark',
    changeCurrentTheme: (newTheme: 'light' | 'dark') => { },
}

const AppContext = createContext(defaultValue)

export default AppContext