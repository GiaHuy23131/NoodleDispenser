import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { db } from "../../firebase/FireBaseConfig";
import {
    collection,
    addDoc,
    doc,
    setDoc,
    getDoc,
    getDocs,
    query,
    where,
    updateDoc,
    onSnapshot,
    orderBy,
} from "firebase/firestore";
const initialState = {
    noodleDispenser: null,
    loading: false,
    error: null as string | null,
};
// Thiết lập listener thời gian thực cho dữ liệu người dùng
export const listenToNoodleDispenserRealtime = () => (dispatch: any) => {
    const q = query(collection(db, "NoodleDispenser"),where("id", "==", "NoodleDispenser"));

    const unsubscribe = onSnapshot(
        q,
        (querySnapshot) => {
            if (!querySnapshot.empty) {
                const noodleDispensers = {
                    id: querySnapshot.docs[0].id,
                    ...querySnapshot.docs[0].data(),
                };
                console.log('noodleDispensers',noodleDispensers);
                dispatch(setNoodleDispenser(noodleDispensers));
            }
        },
        (error) => {
            console.error("Error in realtime listener:", error);
        }
    );

    return unsubscribe; // Trả về hàm unsubscribe để có thể ngừng listener khi không cần thiết
};
export const updateNoodleDispenser = createAsyncThunk(
    "data/upDateUser",
    async ({ id, noodleQuatity }: { id: string, noodleQuatity: number }) => {
        try {
            if (!id) {
                throw new Error("User ID is required.");
            }

            const userDocRef = doc(collection(db, "NoodleDispenser"), id);
            await updateDoc(userDocRef, { noodleQuatity });
            console.log("User updated!");

        } catch (error) {
            console.error("Error updating user:", error);
        }
    }
);
export const NoodleDispenserSlices = createSlice({
    name: "noodleDispenser",
    initialState,
    reducers: {
        setNoodleDispenser: (state, action) => {
            state.noodleDispenser = action.payload;
            state.error = null; // Reset lỗi khi có dữ liệu người dùng mới
        },
    },
    extraReducers: (builder) => {
        builder
            
    },
});
export const { setNoodleDispenser } = NoodleDispenserSlices.actions;
export default NoodleDispenserSlices.reducer;