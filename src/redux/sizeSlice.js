import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import sizeAPI from "../api/sizeAPI";

export const size = createAsyncThunk("size/list", async () => {
  const data = await sizeAPI.getList();

  localStorage.setItem("size", JSON.stringify(data));

  return data;
});

const sizeSlice = createSlice({
  name: "size",
  initialState: {
    sizelist: JSON.parse(localStorage.getItem("size")) || [{}],
  },
  reducers: {},
  extraReducers: {
    [size.fulfilled]: (state, action) => {
      state.sizelist = action.payload;
    },
  },
});

const {reducer} = sizeSlice;
export default reducer;
