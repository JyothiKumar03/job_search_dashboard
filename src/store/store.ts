import { configureStore } from "@reduxjs/toolkit";
import jobReducer  from './jobDataSlice'

const store = configureStore({
    reducer : {
        jobData : jobReducer,
    }
})

export default store;