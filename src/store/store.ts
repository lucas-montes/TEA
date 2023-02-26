import { configureStore } from '@reduxjs/toolkit'
import AppItems from "./manager";

export default configureStore({
    reducer: { items: AppItems },
})