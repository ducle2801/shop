import {createSlice} from "@reduxjs/toolkit";

const listBuySlice = createSlice({
  name: "listbuy",
  initialState: {
    list: JSON.parse(localStorage.getItem("listbuy")) || [],
  },
  reducers: {
    addtoListBuy(state, action) {
      state.list = action.payload;
      localStorage.setItem("listbuy", JSON.stringify(action.payload));
    },

    clearList(state) {
      state.list = [{}];
      localStorage.removeItem("listbuy");
    },
  },
});

const {actions, reducer} = listBuySlice;
export const {addtoListBuy, clearList} = actions;
export default reducer;
