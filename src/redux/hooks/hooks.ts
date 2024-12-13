import { useDispatch } from "react-redux";
import type { AppDispatch } from "../store";

// Tạo hook tùy chỉnh để sử dụng dispatch với kiểu AppDispatch
export const useAppDispatch: () => AppDispatch = useDispatch;