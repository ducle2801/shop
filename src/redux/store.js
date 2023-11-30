import {configureStore} from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import employeeReducer from "./employeeSlice";
import productReducer from "./productSlice";
import colorReducer from "./colorSlice";
import brandReducer from "./brandSlice";
import sizeReducer from "./sizeSlice";
import typeProductReducer from "./typeProductSlice";
import cartReducer from "./cartSlide";
import addressReducer from "./addressSlice";
import listbuy from "./listbuySlice";

const rootReducer = {
  user: userReducer,
  employee: employeeReducer,
  product: productReducer,
  color: colorReducer,
  brand: brandReducer,
  size: sizeReducer,
  typeProduct: typeProductReducer,
  cart: cartReducer,
  address: addressReducer,
  listbuy: listbuy,
};
const store = configureStore({
  reducer: rootReducer,
});

export default store;
