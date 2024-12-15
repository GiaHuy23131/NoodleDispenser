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
    user: null,
    loading: true,
    error: null as string | null,
};
// Hàm lấy danh sách user ID đã được follow
const getUserId = async ({ currentUserId }: any) => {
    const userQuery = query(
        collection(db, "User"),
        where("id", "==", currentUserId)
    );
    const userSnapshot = await getDocs(userQuery);
    //console.log('userSnapshot', userSnapshot);

    if (!userSnapshot.empty) {
        // Trả về id của tài liệu đầu tiên
        return userSnapshot.docs[0].data().id;
    }
    return null;
};
//Thêm người dùng khi quét qr
export const addUser = createAsyncThunk("data/addUser", async (newData: any) => {
    try {
        const userId = await getUserId({ currentUserId: newData.id })
        if (!userId) {
            console.log('userIdelse', userId);

            const updateData = { ...newData, cupNoodles: 3 }
            // Tạo tham chiếu tài liệu với ID đã có
            const userDocRef = doc(db, "User", updateData.id);

            // Thêm dữ liệu vào Firestore với ID đã chỉ định
            await setDoc(userDocRef, updateData);
            console.log("Document written with ID:", updateData.id);
        }

    } catch (error) {
        console.log('error Add user', error);
    }
});
// Thiết lập listener thời gian thực cho dữ liệu người dùng
export const listenToUserRealtime = (id: any) => (dispatch: any) => {
    const q = query(collection(db, "User"), where("id", "==", id));

    const unsubscribe = onSnapshot(
        q,
        (querySnapshot) => {
            if (!querySnapshot.empty) {
                const userData = {
                    id: querySnapshot.docs[0].id,
                    ...querySnapshot.docs[0].data(),
                };
                dispatch(setUser(userData));
            }
        },
        (error) => {
            console.error("Error in realtime listener:", error);
        }
    );

    return unsubscribe; // Trả về hàm unsubscribe để có thể ngừng listener khi không cần thiết
};
// update noodle
// Tạo async thunk để cập nhật dữ liệu Firestore
export const updateUser = createAsyncThunk(
    "data/upDateUser",
    async ({ id, cupNoodles }: { id: string, cupNoodles: number }) => {
        try {
            if (!id) {
                throw new Error("User ID is required.");
            }

            const userDocRef = doc(collection(db, "User"), id);
            await updateDoc(userDocRef, { cupNoodles });
            console.log("User updated!");

        } catch (error) {
            console.error("Error updating user:", error);
        }
    }
);
export const UserSlices = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
            state.error = null; // Reset lỗi khi có dữ liệu người dùng mới
            state.loading = false;
        },
        setLoading(state, action) {
            state.loading = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(addUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(addUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload ?? null; // Lưu user có `id` vào state
            })
            .addCase(addUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message ?? null;
            });
    },
});
export const { setUser, setLoading } = UserSlices.actions;
export default UserSlices.reducer;