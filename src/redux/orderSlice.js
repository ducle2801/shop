import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import detailExportInvoiceAPI from "../api/detailExportInvoiceAPI";

export const orders = createAsyncThunk("orders/list", async (payload) => {
  
  const data = await detailExportInvoiceAPI.getDetailExportInvoice()

  localStorage.setItem("orders", JSON.stringify(data));

  return data;
});

const ordersSlice = createSlice({
  name: "orders",
  initialState: {
    listOrder: JSON.parse(localStorage.getItem("orders")) || {},
  },
  reducers: {},
  extraReducers: {
    [orders.fulfilled]: (state, action) => {
      state.current = action.payload;
    },
  },
});

const {reducer} = ordersSlice;
export default reducer;
