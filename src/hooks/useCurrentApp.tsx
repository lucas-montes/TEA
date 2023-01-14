import { useEffect, useState } from 'react';
import AppManager from "../utils/manageApp";


export default function useCurrentApp(requestedApp: string) {
    const localStorage = new LocalStorage();
    const [currentApp, setcurrentApp] = useLocalStorage('currentApp', "kanban");

    useEffect(() => {
    }, [enabled, isEnabled]);

    return [enabled, setcurrentApp];
};