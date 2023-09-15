import { configureStore } from "@reduxjs/toolkit";
import uploadReducer from "../components/Upload/reduxSlice";
import authReducer from "../components/Navbar/reduxSlice";
export const store = configureStore({
  reducer: {
    upload: uploadReducer,
    auth: authReducer,
  },
});
