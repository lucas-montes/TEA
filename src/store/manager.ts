import { createSlice } from '@reduxjs/toolkit'


type AppItemType = {
    id: number;
    title: String;
    createdAt?: string;
    content?: String;
    pros?: Array<string>;
    cons?: Array<string>;
}

const initialState = [
    {} as AppItemType
];


class ItemsManager {
    static new(state: any, action: any): void {
        state = action.payload;
    };
    static push(state: any, action: any): void {
        state.push(action.payload);
    };
    static edit(state: any, action: any): void {
        this.remove(state, action);
        this.push(state, action);
    };
    static find(state: any, action: any): any {
        return state.find((item: any) => item.id === action.payload.id);
    };
    static remove(state: any, action: any): void {
        const item = this.find(state, action);
        if (item) {
            state.splice(state.indexOf(item), 1);
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
        addItem: (state, action) => {
            ItemsManager.push(state, action);
        },
        editItem: (state, action) => {
            ItemsManager.edit(state, action);
        },
        deleteItem: (state, action) => {
            ItemsManager.remove(state, action);
        },
    },
});

export const { newState, addItem, editItem, deleteItem } = AppItems.actions;
export default AppItems.reducer;