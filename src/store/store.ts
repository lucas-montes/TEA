import { configureStore } from '@reduxjs/toolkit'

export function todos(state = [], action) {
    switch (action.type) {
        case 'ADD_TODO':
            return state.concat([action.text])
        default:
            return state
    }
}

export default configureStore({
    reducer: todos,
})