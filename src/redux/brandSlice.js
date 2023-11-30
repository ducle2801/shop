import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import brandAPI from "../api/brandAPI";

export const brand = createAsyncThunk("brand/list", async () => {
  const data = await brandAPI.getList();

  localStorage.setItem("brand", JSON.stringify(data));

  return data;
});

const brandSlice = createSlice({
  name: "brand",
  initialState: {
    brandlist: JSON.parse(localStorage.getItem("brand")) || [{}],
  },
  reducers: {},
  extraReducers: {
    [brand.fulfilled]: (state, action) => {
      state.brandlist = action.payload;
    },
  },
});

const {reducer} = brandSlice;
export default reducer;
