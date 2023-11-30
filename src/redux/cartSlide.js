import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItem: JSON.parse(localStorage.getItem("cart")) || [],
  },
  reducers: {
    addtoCart(state, action) {
      const newItem = action.payload;
      const index = state.cartItem.findIndex(
        (x) =>
          !!(
            x.id_sp === newItem.id_sp &&
            x.id_ms === newItem.id_ms &&
            x.id_kt === newItem.id_kt
          )
      );

      if (index >= 0) {
        if (
          (state.cartItem[index].so_luong_xuat >= state.cartItem[index].soluong)
        ) {
          alert("Quá số lượng")
          return;
        } else {
          state.cartItem[index].so_luong_xuat += newItem.so_luong_xuat;
          const a = JSON.parse(localStorage.getItem("cart"));
          a[index].so_luong_xuat += newItem.so_luong_xuat;
          localStorage.setItem("cart", JSON.stringify(a));
        }
      } else {
        state.cartItem.push(newItem);
        const a = JSON.parse(localStorage.getItem("cart")) || [];
        a.push(newItem);
        localStorage.setItem("cart", JSON.stringify(a));
       
      }
    },
    setQuantity(state, action) {
      const { id_sp, so_luong_xuat, id_ms,id_kt } = action.payload;
      console.log(id_sp, so_luong_xuat, id_ms,id_kt);
      const index = state.cartItem.findIndex(
        (x) => x.id_sp === id_sp && x.id_ms === id_ms && x.id_kt === id_kt
      );
      // console.log(index);
      if (index >= 0) {
        state.cartItem[index].so_luong_xuat = so_luong_xuat;
        const a = JSON.parse(localStorage.getItem("cart"));
        a[index].so_luong_xuat = so_luong_xuat;
        localStorage.setItem("cart", JSON.stringify(a));
      
      }
    },
    // deleteNumberCart(state, action) {
    //   const newItem = action.payload;
    //   const index = state.cartItem.findIndex(
    //     (x) =>
    //       !!(
    //         x.id_sp === newItem.id_sp &&
    //         x.id_ms === newItem.id_ms &&
    //         x.id_kt === newItem.id_kt
    //       )
    //   );
    //   if (index >= 0) {
    //     state.cartItem[index].so_luong_xuat -= newItem.so_luong_xuat;;
    //     const a = JSON.parse(localStorage.getItem("cart"));
    //     a[index].so_luong_xuat -= newItem.so_luong_xuat;;
    //     localStorage.setItem("cart", JSON.stringify(a));
    //   }
    // },
    removeFromCart(state, action) {
      const idRemove = action.payload;
  

      state.cartItem = state.cartItem.filter(
        (x) =>
          !(
            x.id_sp === idRemove.id_sp &&
            x.id_ms === idRemove.id_ms &&
            x.id_kt === idRemove.id_kt
          )
      );

      const a = JSON.parse(localStorage.getItem("cart"));
      localStorage.setItem(
        "cart",
        JSON.stringify(
          a.filter(
            (x) =>
              !(
                x.id_sp === idRemove.id_sp &&
                x.id_ms === idRemove.id_ms &&
                x.id_kt === idRemove.id_kt
              )
          )
        )
      );
    },

    removeAllCart(state) {
      state.cartItem = [];
 

      localStorage.removeItem("cart");
    },
  },
});

const { actions, reducer } = cartSlice;
export const { setQuantity, removeFromCart, addtoCart, removeAllCart } =
  actions;
export default reducer;
