import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import typeProductAPI from "../api/typeProductAPI";

export const typeProduct = createAsyncThunk("typeProduct/list", async () => {
  const data = await typeProductAPI.getList();

  localStorage.setItem("typeProduct", JSON.stringify(data));

  return data;
});

const typeProductSlice = createSlice({
  name: "typeProduct",
  initialState: {
    typeProductlist: JSON.parse(localStorage.getItem("typeProduct")) || [{}],
  },
  reducers: {},
  extraReducers: {
    [typeProduct.fulfilled]: (state, action) => {
      state.typeProductlist = action.payload;
    },
  },
});

const {reducer} = typeProductSlice;
export default reducer;
