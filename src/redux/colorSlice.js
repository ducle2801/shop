import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import colorAPI from "../api/colorAPI";

export const color = createAsyncThunk("color/list", async () => {
  const data = await colorAPI.getListColor();

  localStorage.setItem("color", JSON.stringify(data));

  return data;
});

const colorSlice = createSlice({
  name: "color",
  initialState: {
    colorlist: JSON.parse(localStorage.getItem("color")) || [{}],
  },
  reducers: {},
  extraReducers: {
    [color.fulfilled]: (state, action) => {
      state.colorlist = action.payload;
    },
  },
});

const {reducer} = colorSlice;
export default reducer;
