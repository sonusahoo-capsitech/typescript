import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./Slice/UserSlice";
import studentSlice from "./Slice/StudentSlice.ts"

const store = configureStore({
  reducer: { 
    auth: authReducer,
    student : studentSlice,
  },
  devTools: true,
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;




