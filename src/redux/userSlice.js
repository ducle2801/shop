import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import userAPI from "../api/userAPI";

export const login = createAsyncThunk("user/login", async (payload) => {
  const data = await userAPI.login(payload);

  localStorage.setItem("user", JSON.stringify(data));

  return data;
});

const userSlice = createSlice({
  name: "user",
  initialState: {
    current: JSON.parse(localStorage.getItem("user")) || [],
  },
  reducers: {
    logout(state) {
      state.current = [{}];
      localStorage.removeItem("user");
    },
  },
  extraReducers: {
    [login.fulfilled]: (state, action) => {
      state.current = action.payload;
    },
  },
});

const {actions, reducer} = userSlice;
export const {logout} = actions;
export default reducer;
