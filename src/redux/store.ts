import { configureStore } from "@reduxjs/toolkit";
import UserSlices from "./slices/UserSlices";
import NoodleDispenserSlices  from "./slices/NoodleDispenserSlices";
export const store = configureStore({
    reducer:{
        user: UserSlices,
        noodleDispenser: NoodleDispenserSlices,
    }
});
// Lấy kiểu của store và dispatch
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;