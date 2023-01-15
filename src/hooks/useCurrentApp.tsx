import { useEffect, useState } from 'react';
import AppManager from "../managers/manageApp";


export default function useCurrentApp(requestedApp: string) {
    const appManager = new AppManager();
    const [currentApp, setcurrentApp] = useLocalStorage('currentApp', "kanban");

    useEffect(() => {
    }, [enabled, isEnabled]);

    return [enabled, setcurrentApp];
};