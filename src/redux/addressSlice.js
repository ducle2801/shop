import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import addressAPI from "../api/addressAPI";

export const address = createAsyncThunk("address/list", async (iddc) => {
  const data = await addressAPI.getIdAddress(iddc);

  localStorage.setItem("address", JSON.stringify(data));

  return data;
});

const addressSlice = createSlice({
  name: "address",
  initialState: {
    addresslist: JSON.parse(localStorage.getItem("address")) || [{}],
  },
  reducers: {
    removeOneAddress(state) {
      state.addresslist = {};
      localStorage.removeItem("address");
    },
    removeAllAddress(state) {
      state.addresslist = [];
    }
  },
  extraReducers: {
    [address.fulfilled]: (state, action) => {
      state.addresslist = action.payload;
    },
  },
});

const {actions, reducer} = addressSlice;
export const {removeOneAddress, removeAllAddress} = actions;
export default reducer;
