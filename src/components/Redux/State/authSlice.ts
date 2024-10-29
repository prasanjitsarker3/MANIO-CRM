import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

type TAuthState = {
  accessToken: string | null;
};

const initialState: TAuthState = {
  accessToken: null,
};
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      const { accessToken } = action.payload;
      console.log(accessToken);
      state.accessToken = accessToken;
    },
    logOut: (state) => {
      state.accessToken = null;
    },
  },
});

export const { setUser, logOut } = authSlice.actions;
export default authSlice.reducer;

export const useCurrentToken = (state: RootState) => state.auth.accessToken;
