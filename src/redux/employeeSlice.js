import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import employeeAPI from "../api/employeeAPI";

export const login = createAsyncThunk("employee/login", async (payload) => {
  const data = await employeeAPI.login(payload);
  if (data[0].id_cv === "CV04") {
    localStorage.setItem("employeeDeliver", JSON.stringify(data));
  } else {
    localStorage.setItem("employee", JSON.stringify(data));
  }

  return data;
});

const employeeSlice = createSlice({
  name: "employee",
  initialState: {
    current: JSON.parse(localStorage.getItem("employee")) || {},
    currentDeliver: JSON.parse(localStorage.getItem("employeeDeliver")) || {},
  },
  reducers: {
    logout(state) {
      state.current = {};
      localStorage.removeItem("employee");
    },
    logoutDeliver(state) {
      state.currentDeliver = {};
      localStorage.removeItem("employeeDeliver");
    },
  },
  extraReducers: {
    [login.fulfilled]: (state, action) => {
      state.current = action.payload;
      state.currentDeliver = action.payload;
    },
  },
});

const { actions, reducer } = employeeSlice;
export const { logout, logoutDeliver } = actions;
export default reducer;
