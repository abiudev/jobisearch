import { configureStore } from "@reduxjs/toolkit";
import { jobReducer } from "./slices/jobSlice";
import { authReducer } from "./slices/authSlice";
import { appliedJobsReducer } from "./slices/appliedJobsSlice";

export const store = configureStore({
  reducer: { 
    jobs: jobReducer, 
    auth: authReducer,
    appliedJobs: appliedJobsReducer,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
