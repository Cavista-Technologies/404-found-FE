import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/auth.slice";
import roleReducer from "./slices/role.slice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    role: roleReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;