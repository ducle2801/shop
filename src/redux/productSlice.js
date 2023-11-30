import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import productAPI from "../api/productAPI";

export const product = createAsyncThunk("product/list", async () => {
  const data = await productAPI.getProductList();
  const dataSale = await productAPI.getDiscountProductList();
  localStorage.setItem("productsale", JSON.stringify(dataSale));
  localStorage.setItem("productlist", JSON.stringify(data));
  return {data,dataSale};
});

const productSlice = createSlice({
  name: "product",
  initialState: {
    productlist: JSON.parse(localStorage.getItem("productlist")) || [{}],
    productlistsale: JSON.parse(localStorage.getItem("productsale")) || [{}],
  },
  reducers: {
    addListProduct(state, action) {
      state.productlist = action.payload;
      localStorage.setItem("productlist", JSON.stringify(action.payload));
    },
    addListProductSale(state, action) {
      state.productlistsale = action.payload;
      localStorage.setItem("productsale", JSON.stringify(action.payload));
    },
  },
  extraReducers: {
    [product.fulfilled]: (state, action) => {
      state.productlist = action.payload.data;
      state.productlistsale = action.payload.dataSale;

    },
  },
});

const { reducer, actions } = productSlice;
export const { addListProduct, addListProductSale } = actions;
export default reducer;
