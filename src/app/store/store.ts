import { configureStore } from "@reduxjs/toolkit";
import userTableReducer from "../../widgets/user-table/model/slice";

export const store = configureStore({
  reducer: {
    userTable: userTableReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
