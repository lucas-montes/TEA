import { createSlice } from '@reduxjs/toolkit'

import { kanban, notes, alias, settings, schedule, prosCons } from "../constants/Apps";


const initialState = {
    stateData: {
        currentApp: kanban,
itemsPerApp:{
    "kanban"
:
    [],
        "notes"
:
    [],
        "alias"
:
    [],
        "schedule"
:
    [],
        "prosCons"
:
    [],
}
    },
};


class ItemsManager {
    static getCurrentApp(state: any, action: any): void {
        return state.stateData.currentApp;
    };
    static changeCurrentApp(state: any, action: any): void {
        state.stateData.currentApp = action.payload;
    };

    static fillAppItems(state: any, action: any): void {
        state.stateData.itemsPerApp[state.stateData.currentApp] = action.payload;
    };

    static push(state: any, action: any): void {
        state.stateData.itemsPerApp[state.stateData.currentApp].push(action.payload);
    };
    static edit(state: any, action: any): void {
        this.remove(state, action);
        this.push(state, action);
    };
    static find(state: any, action: any): any {
        // .find(({ id }) => id === id);
        console.log(state.stateData)
        return state.stateData.itemsPerApp[state.stateData.currentApp].find((item: any) => item.id === action.payload.Id);
    };
    static get(state: any, action: any): any {
        return this.find(state, action);
    };
    static getAll(state: any): any {
        return state.stateData.itemsPerApp[state.stateData.currentApp];
    };
    static remove(state: any, action: any): void {
        const item = this.find(state, action);
        if (item) {
            state.stateData.itemsPerApp[state.stateData.currentApp].splice(state.indexOf(item), 1);
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

        fillAppItems: (state, action) => {
            // console.log(action)
            ItemsManager.fillAppItems(state, action);
        },
        addItem: (state, action) => {
            ItemsManager.push(state, action);
        },
        editItem: (state, action) => {
            ItemsManager.edit(state, action);
        },
        deleteItem: (state, action) => {
            ItemsManager.remove(state, action);
        },
        getItem: (state, action) => {
            return ItemsManager.get(state, action);
        },
        getAll: (state, action) => {
            return ItemsManager.getAll(state);
        },
    },
});

export const { addItem, editItem, deleteItem, getItem, changeCurrentApp, getCurrentApp, fillAppItems } = AppItems.actions;
export default AppItems.reducer;