import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import jobReducer from './jobDataSlice';

const store = configureStore({
  reducer: {
    jobData: jobReducer,
    // Add other reducers if needed
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = any> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export default store;
