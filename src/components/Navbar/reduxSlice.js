import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import FirebaseAuth from "../../handlers/auth";

const { signIn, getCurrentUser } = FirebaseAuth;
const initialState = {
  currentUser: null,
  isUserLogged: false,
  isUserLoggedOut: false,
};

export const logInAsync = createAsyncThunk(
  "logIn/logInUser",
  async (_, { dispatch }) => {
    try {
      const user = await signIn();
      const { displayName, photoURL, uid, email } = user;
      const userData = {
        displayName,
        photoURL,
        uid,
        email,
      };
      dispatch(setCurrentUser(userData));
    } catch (e) {
      console.log(e);
    }
  }
);
export const getAuthenticatedAsync = createAsyncThunk(
  "authenticated/getauthenticated",
  async (_, { dispatch }) => {
    try {
      const user = await getCurrentUser();
      const { displayName, photoURL, uid, email } = user;
      const userData = {
        displayName,
        photoURL,
        uid,
        email,
      };
      window.localStorage.setItem("uid", uid);
      dispatch(setCurrentUser(userData));
    } catch {}
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCurrentUser: (state, action) => {
      state.currentUser = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(logInAsync.pending, (state) => {
        state.isUserLogged = false;
      })
      .addCase(logInAsync.fulfilled, (state) => {
        state.isUserLogged = true;
      })
      .addCase(logInAsync.rejected, (state) => {
        state.isUserLogged = false;
        console.log("user login rejected");
      });
  },
});

export const { setCurrentUser } = authSlice.actions;
export const authState = (state) => state.auth;
export default authSlice.reducer;
