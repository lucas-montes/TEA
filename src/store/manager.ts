import { createSlice } from '@reduxjs/toolkit'

import { kanban, notes, alias, settings, schedule, prosCons } from "../constants/Apps";


const initialState = {
    currentApp: kanban,
    itemsPerApp: {
        kanban: [],
        notes: [],
        alias: [],
        schedule: [],
        prosCons: [],
    },
};


class ItemsManager {
    static getCurrentApp(state: any, action: any): void {
        return state.currentApp;
    };
    static changeCurrentApp(state: any, action: any): void {
        state.currentApp = action.payload;
    };

    static push(state: any, action: any): void {
        state.itemsPerApp[state.currentApp].push(action.payload);
    };
    static edit(state: any, action: any): void {
        this.remove(state, action);
        this.push(state, action);
    };
    static find(state: any, action: any): any {
        // .find(({ id }) => id === id);
        return state.itemsPerApp[state.currentApp].find((item: any) => item.id === action.payload.id);
    };
    static get(state: any, action: any): any {
        return this.find(state, action);
    };
    static getAll(state: any): any {
        return state.itemsPerApp[state.currentApp];
    };
    static remove(state: any, action: any): void {
        const item = this.find(state, action);
        if (item) {
            state.itemsPerApp[state.currentApp].splice(state.indexOf(item), 1);
        }
    };
}


const AppItems = createSlice({
    name: "AppItems",
    initialState,
    reducers: {
        changeCurrentApp: (state, action) => {
            ItemsManager.changeCurrentApp(state, action);
        },
        getCurrentApp: (state, action) => {
            ItemsManager.getCurrentApp(state, action);
        },

        addItem: (state, action) => {
            console.log("here")
            console.log(state)
            console.log(action)
            ItemsManager.push(state, action);
        },
        editItem: (state, action) => {
            ItemsManager.edit(state, action);
        },
        deleteItem: (state, action) => {
            ItemsManager.remove(state, action);
        },
        getItem: (state, action) => {
            ItemsManager.get(state, action);
        },
        getAll: (state, action) => {
            return ItemsManager.getAll(state);
        },
    },
});

export const { addItem, editItem, deleteItem, getItem, changeCurrentApp, getCurrentApp } = AppItems.actions;
export default AppItems.reducer;