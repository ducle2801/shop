import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { removeFromCart } from "../../../redux/cartSlide";
import { removeAllCart } from "../../../redux/cartSlide";
import { addtoListBuy } from "../../../redux/listbuySlice";
import { setQuantity } from "../../../redux/cartSlide";
import { IconButton } from "@mui/material";
function Cart() {
  const dataCart = useSelector((state) => state?.cart?.cartItem);
  const thanh_vien = useSelector(
    (state) => state?.user?.current?.dataUser[0].thanh_vien
  );
  console.log(thanh_vien,"thanh_vuie");
  const [sumPrice, setSumPrice] = useState("");

  const dispatch = useDispatch();
  const navigation = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  useEffect(() => {
    let a = 0;
    if (dataCart.length !== 0) {
      for (let i = 0; i < dataCart.length; i++) {
        a =
          a +
          dataCart[i]?.so_luong_xuat *
            (dataCart[i]?.gia_ban -
              (dataCart[i]?.gia_ban * dataCart[i]?.giam_gia) / 100);
      }
      setSumPrice(a);
    }
  }, [dataCart]);

  const deleteCart = (id_sp, id_ms, id_kt) => {
    dispatch(removeFromCart({ id_sp: id_sp, id_ms: id_ms, id_kt: id_kt }));
    enqueueSnackbar("Đã xóa sản phẩm khỏi giỏ hàng", {
      variant: "error",
      autoHideDuration: 2000,
    });
  };
  const removeAll = () => {
    dispatch(removeAllCart());
    enqueueSnackbar("Đã xóa tất cả sản phẩm khỏi giỏ hàng", {
      variant: "error",
      autoHideDuration: 2000,
    });
  };
  const deleteNumber = (id, soluong, id_ms, id_kt) => {

    if (soluong > 0) {
      dispatch(
        setQuantity({ id_sp: id, so_luong_xuat: soluong, id_ms: id_ms,id_kt:id_kt })
      );
    } else {
      deleteCart(id, id_ms, id_kt);
    }
  };
  const plusNumber = (id, soluong, id_ms,id_kt) => {
    dispatch(setQuantity({ id_sp: id, so_luong_xuat: soluong, id_ms: id_ms ,id_kt:id_kt}));
  };
  const payCart = async () => {
    try {
      dispatch(addtoListBuy(dataCart));
      navigation("/shop/order/detail_pay_order");
    } catch (error) {
      enqueueSnackbar(error.message, {
        variant: "error",
        autoHideDuration: 2000,
      });
    }
  };

  const renderProduct =
    dataCart?.length > 0 ? (
      dataCart?.map(
        (
          {
            id_sp,
            ten_sp,
            id_ms,
            id_kt,
            ten_ms,
            ten_kt,
            so_luong_xuat,
            gia_ban,
            giam_gia,
            hinh_anh,
            soluong,
          },
          idx
        ) => (
          <div className="relative flex items-center mt-10" key={idx}>
            <div className="w-[125px]">
              <img
                className="border-2 border-slate-500 rounded-md"
                src={hinh_anh}
                alt=""
              />
            </div>
            <div className="px-5 w-[35%] text-[20px]">
              <p>{ten_sp}</p>
            </div>

            <div className="w-[15%]">
              {giam_gia ? (
                <>
                  <p className="text-slate-700 text-center line-through">
                  {new Intl.NumberFormat("it-IT", {
                      style: "currency",
                      currency: "VND",
                    }).format(gia_ban)}
                  </p>
                  <p className="px-5 text-[18px]">
                    {new Intl.NumberFormat("it-IT", {
                      style: "currency",
                      currency: "VND",
                    }).format(gia_ban - (gia_ban * giam_gia) / 100)}
                  </p>
                </>
              ) : (
                <p>
                  {new Intl.NumberFormat("it-IT", {
                    style: "currency",
                    currency: "VND",
                  }).format(gia_ban)}
                </p>
              )}
            </div>
            <div>
              <p className="px-2 w-[5%] text-[18px]">x{so_luong_xuat}</p>
            </div>
            <div className="flex relative gap-1 ml-3 w-[90px] ">
              <IconButton
                onClick={() => plusNumber(id_sp, so_luong_xuat + 1, id_ms,id_kt)}
                disabled={so_luong_xuat >= soluong ? true : false}
                sx={{ color: "red" }}
              >
                <AddIcon
                  className={`border-2 ${
                    so_luong_xuat >= soluong
                      ? "border-gray-300"
                      : "border-red-500"
                  } hover:bg-slate-400`}
                ></AddIcon>
              </IconButton>
              <IconButton
                sx={{ color: "red" }}
                onClick={() =>
                  deleteNumber(id_sp, so_luong_xuat - 1, id_ms, id_kt)
                }
              >
                <RemoveIcon className="border-2 border-red-500 hover:bg-slate-400"></RemoveIcon>
              </IconButton>
            </div>

            <div className="absolute left-[145px] top-[90px] text-slate-500 text-[16px] flex gap-5">
              <div>
                <p>Thương hiệu: {ten_ms}</p>
              </div>
              <div>
                <p>Loại sản phẩm: {ten_kt}</p>
              </div>
            </div>

            <div className="w-[20%]">
              <p className="px-5 text-[18px] font-bold">
                {!!giam_gia ? (
                  <>
                    {new Intl.NumberFormat("it-IT", {
                      style: "currency",
                      currency: "VND",
                    }).format(
                      so_luong_xuat * (gia_ban - (gia_ban * giam_gia) / 100)
                    )}
                  </>
                ) : (
                  <>
                    {new Intl.NumberFormat("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    }).format(so_luong_xuat * gia_ban)}
                  </>
                )}
              </p>
            </div>

            <div className="w-[10%] text-right">
              <button
                onClick={() => deleteCart(id_sp, id_ms, id_kt)}
                className="py-2 px-4 bg-blue-700 text-white font-bold rounded-xl"
              >
                Xóa
              </button>
            </div>
          </div>
        )
      )
    ) : (
      <></>
    );

  return (
    <div>
      <div className="w-[70%] mx-auto">
        <p className="mt-4 text-[25px] font-bold">GIỎ HÀNG</p>
        {dataCart.length > 0 ? (
          <>
            <div>
              <div className=" text-right">
                <button
                  onClick={removeAll}
                  className="py-2 px-4 bg-red-700 text-white font-bold rounded-xl"
                >
                  Xóa tất cả
                </button>
              </div>
              {renderProduct}
            </div>
            <hr className="mt-4 border border-slate-600 bg-slate-600" />
            <div className="float-right w-[30%] text-[18px] mt-4">
              <div className="flex w-full">
                <div className="w-[60%]">
                  <span>Tạm tính: </span>
                </div>
                <div>
                  {new Intl.NumberFormat("it-IT", {
                    style: "currency",
                    currency: "VND",
                  }).format(sumPrice)}
                </div>
              </div>
              <div className="flex w-full">
                <div className="w-[60%]">
                  <span>Thành viên: </span>
                </div>
                <div>
                  {thanh_vien === 0
                    ? "0%"
                    : thanh_vien === 1
                    ? "5%"
                    : thanh_vien === 2
                    ? "10%"
                    : thanh_vien === 3
                    ? "20%"
                    : ""}
                </div>
              </div>
              <div className="flex w-full">
                <div className="w-[60%]">
                  <span>Phí vận chuyển: </span>
                </div>
                <div>
                  <span>
                    {sumPrice > 1000000 || thanh_vien !== 0
                      ? "Miễn phí"
                      : "30.000 đ"}
                  </span>
                </div>
              </div>
              <div className="flex w-full">
                <div className="w-[60%]">
                  <span>Tổng: </span>
                </div>
                <div>
                  <span className="font-bold">
                    {new Intl.NumberFormat("it-IT", {
                      style: "currency",
                      currency: "VND",
                    }).format(
                      thanh_vien === 1
                        ? sumPrice - (sumPrice * 5) / 100
                        : thanh_vien === 2
                        ? sumPrice - (sumPrice * 10) / 100
                        : thanh_vien === 3
                        ? sumPrice - (sumPrice * 20) / 100
                        : thanh_vien === 0 && sumPrice > 1000000
                        ? sumPrice
                        : sumPrice + 30000
                    )}
                  </span>
                </div>
              </div>

              <div>
                <div>
                  <button
                    onClick={() => payCart()}
                    className="py-3 px-4 w-full mt-8 text-white bg-slate-600 rounded-lg"
                  >
                    Thanh toán
                  </button>
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            <p>Giỏ hàng trống</p>
          </>
        )}
      </div>
    </div>
  );
}

export default Cart;
