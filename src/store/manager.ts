import { createSlice } from '@reduxjs/toolkit'


type AppItemType = {
    id: number;
    title: String;
    createdAt?: string;
    content?: String;
    pros?: Array<string>;
    cons?: Array<string>;
    tasks?: Array<any>;
}

const initialState = {
    currentApp: "",
    items: [],
};


class ItemsManager {
    static new(state: any, action: any): void {
        state = action.payload;
    };
    static addCurrentApp(state: any, action: any): void {
        state.currentApp = action.payload;
    };
    static push(state: any, action: any): void {
        state.items.push(action.payload);
    };
    static edit(state: any, action: any): void {
        this.remove(state, action);
        this.push(state, action);
    };
    static find(state: any, action: any): any {
        // .find(({ id }) => id === id);
        return state.items.find((item: any) => item.id === action.payload.id);
    };
    static get(state: any, action: any): any {
        return this.find(state, action);
    };
    static getAll(state: any): any {
        return state.items;
    };
    static remove(state: any, action: any): void {
        const item = this.find(state, action);
        if (item) {
            state.items.splice(state.indexOf(item), 1);
        }
    };
}


const AppItems = createSlice({
    name: "AppItems",
    initialState,
    reducers: {
        newState: (state, action) => {
            ItemsManager.new(state, action);
        },
        addCurrentApp: (state, action) => {
            ItemsManager.addCurrentApp(state, action);
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

export const { newState, addItem, editItem, deleteItem, getItem, addCurrentApp } = AppItems.actions;
export default AppItems.reducer;